import React, {useState} from "react";
import { Grid, Typography } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
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
  const user = useUser((store) => store.user);
  const ownedShares =
    user?.assets.shares.find((share) => share.company.ticker === ticker)
      ?.amount || 0;
  const chartData = data
  ?.getCandles?.map(({openPrice, highPrice, lowPrice, closePrice, volume, time})=>({
    open:openPrice,
    high:highPrice,
    low:lowPrice,
    close:closePrice,
    volume,
    split:"",
    dividend:"",
    absoluteChange:"",
    percentChange:"",
    date:new Date(time)
  })) || [];
  return (<ScrollDisableWrapper>
    <SimplePaper
      topbar={<Topbar ticker={ticker} ownedShares={ownedShares}/>}
    >
     {fetching && <Loader/> || <Grid container direction="column">
       <CandlesChart  type={'svg'} data={chartData}/>
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


export default CompanyDetailsHeader;

