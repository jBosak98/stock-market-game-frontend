import React, {useState} from "react";
import { Grid, Button, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useQuery } from "urql";
import { TypeChooser } from "react-stockcharts/lib/helper";
import moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



import SimplePaper from "../atoms/SimplePaper";
import useUser from "../../hooks/useUser";
import mapData from "../../lib/mapData";
import getCandlesQuery from '../../lib/getCandlesQuery';
import type {Candles} from '../../lib/getCandlesQuery';
import CandlesChart from '../molecules/CandlesChart';

const useStyles = makeStyles(() => ({
  transactionButton: {
    marginRight: "auto",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));
type CompanyDetailsHeaderProps = {
  ticker: string;
};
type ChartResolutionType = "1" | "5" | "15" | "30" | "D" | "W" | "M";

const CompanyDetailsHeader = ({ ticker }: CompanyDetailsHeaderProps) => {
  const [resolution, setResolution] = useState<ChartResolutionType>("D");
  const [{ data, fetching, error }] = useQuery<{getCandles:Candles}>({
    query: getCandlesQuery,
    variables:{
      ticker,
      from:"",//moment().subtract(3,'years').toDate().toJSON(),
      to:"",//moment().toDate().toJSON(),
      resolution
    }
  });

  const user = useUser((store) => store.user);
  const ownedShares =
    user?.assets.shares.find((share) => share.company.ticker === ticker)
      ?.amount || 0;
  const styles = useStyles();
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
  console.log(chartData);
  return (
    <SimplePaper
      topbar={
        <>
          <Typography variant="h4" color="textSecondary">
            {ticker}
          </Typography>
          <Typography color="textSecondary">
            {mapData(["ownedShares", ownedShares])}
          </Typography>
        </>
      }
    >
      <Grid container direction="column">
{chartData.length && <TypeChooser>
          {(type:any) => <CandlesChart  type={type} data={chartData}/>}
        </TypeChooser>}
        <InputLabel >Resolution</InputLabel>
        <Select
          value={resolution}
          onChange={(event)=>setResolution(event.target.value as ChartResolutionType)}
        >
          <MenuItem value={"1"}>One minute</MenuItem>
          <MenuItem value={"5"}>Five minutes</MenuItem>
          <MenuItem value={"15"}>Fifteen minutes</MenuItem>
          <MenuItem value={"30"}>Thirty minutes</MenuItem>
          <MenuItem value={"D"}>One Day</MenuItem>
          <MenuItem value={"W"}>One Week</MenuItem>
          <MenuItem value={"M"}>One Month</MenuItem>
        </Select>
        <Link className={styles.link} to={`/company/${ticker}/transaction`}>
          <Button
            className={styles.transactionButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            MAKE A TRANSACTION
          </Button>
        </Link>
      </Grid>
    </SimplePaper>
  );
};
export default CompanyDetailsHeader;

