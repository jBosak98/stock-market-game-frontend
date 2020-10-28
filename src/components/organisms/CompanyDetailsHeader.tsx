import React, {useState} from "react";
import { Grid, Typography } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
} from '@material-ui/pickers';
import { useQuery } from "urql";
import moment from 'moment';


import SimplePaper from "../atoms/SimplePaper";
import useUser from "../../hooks/useUser";
import mapData from "../../lib/mapData";
import getCandlesQuery from '../../lib/getCandlesQuery';
import type {Candles} from '../../lib/getCandlesQuery';
import CandlesChart from '../molecules/CandlesChart';
import Loader from "../atoms/Loader";
import type { ChartResolutionType } from '../../lib/types';
import ResolutionSelect from '../atoms/ResolutionSelect';
import TransactionButtonLink from '../atoms/TransactionButtonLink';
import ScrollDisableWrapper from '../atoms/ScrollDisableWrapper';
import getTransactionsQuery, {
  Transactions,
} from "../../lib/getTransactionsQuery";

type CompanyDetailsHeaderProps = {
  ticker: string;
};

const CompanyDetailsHeader = ({ ticker }: CompanyDetailsHeaderProps) => {
  const [resolution, setResolution] = useState<ChartResolutionType>("D");
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const from =  moment().startOf('minute').subtract(1,'year').toDate().toJSON();
  const to = moment().startOf('minute').toDate().toJSON();
  const [{ data, fetching, error }] = useQuery<{getCandles:Candles}>({
    query: getCandlesQuery,
    variables:{
      ticker,
      from,
      to,
      resolution
    }
  });

  const [{ data:transactionsData }] = useQuery<Transactions>({
    query: getTransactionsQuery,
  });
  const user = useUser((store) => store.user);
  const ownedShares =
    user?.assets.shares.find((share) => share.company.ticker === ticker)
      ?.amount || 0;
  const chartData = data &&  mapChartData(data, transactionsData) || [];
  const isResolutionInMinutes = resolution === "1" || resolution === "5" || resolution === "15" || resolution === "30"
  const dateFormat = isResolutionInMinutes ? "%m-%d %H:%M" : "%Y-%m-%d";
  return (<ScrollDisableWrapper>
    <SimplePaper
      topbar={<Topbar ticker={ticker} ownedShares={ownedShares}/>}
    >
     {fetching && <Loader/> || <Grid container direction="column">
       <CandlesChart lineSeries={isResolutionInMinutes} candleSeries={!isResolutionInMinutes}  type={'svg'} data={chartData} dateFormat={dateFormat}/>
       <Grid container justify="space-between" direction="row">
        <TransactionButtonLink ticker={ticker}/>
        <Grid direction="row" alignItems="flex-start">
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> //TODO: implement refetch based on date
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            format="dd/MM/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider> */}
        <ResolutionSelect setResolution={setResolution} resolution={resolution} />
        </Grid>
      </Grid>
      </Grid>}
    </SimplePaper>
    </ScrollDisableWrapper>
  );
};

const Topbar = ({ticker, ownedShares}:{ticker:string, ownedShares:number}) => 
<>
  <Typography variant="h4" color="textSecondary">
    {ticker}
  </Typography>
  <Typography color="textSecondary">
    {mapData(["ownedShares", ownedShares])}
  </Typography>
</>


const mapChartData = (data:{getCandles:Candles}, transactionsData:Transactions | undefined) => 
  data
  ?.getCandles
  ?.map(({ openPrice, highPrice, lowPrice, closePrice, volume, time }, index)=> {
    const transactions = transactionsData?.getTransactions.filter((t)=> {
    const nextPointDate = data?.getCandles[index+1]?.time ? new Date(data?.getCandles[index+1]?.time) : new Date()
    return new Date(t.createdAt) > new Date(time)  && new Date(t.createdAt) < nextPointDate;
  }) || [];
   const disposals = transactions.filter(({type})=>type === 'DISPOSAL').reduce((quantity, transactions)=>quantity + transactions.quantity,0);
   const purchases = transactions.filter(({type})=>type === 'PURCHASE').reduce((quantity, transactions)=>quantity + transactions.quantity,0);
  return {
  open:openPrice,
  high:highPrice,
  low:lowPrice,
  close:closePrice,
  volume,
  split:"",
  dividend:"",
  absoluteChange:"",
  percentChange:"",
  date:new Date(time),
  purchases,
  disposals,
  transactions
}}) || [];

export default CompanyDetailsHeader;

