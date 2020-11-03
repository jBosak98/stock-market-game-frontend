import React from "react";
import { Grid } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import ResolutionSelect from "../atoms/ResolutionSelect";
import type { ChartResolutionType } from '../../lib/types';


type ChartSettingsProps = {
  showTransactions: boolean;
  setShowTransactions: (prev:boolean) => any;
  resolution: ChartResolutionType;
  setResolution: (res:ChartResolutionType) => any;
  disableShowTransactions:boolean;
};
const ChartSettings = (props:ChartSettingsProps) => {
  const {
    showTransactions, 
    setShowTransactions, 
    resolution, 
    setResolution,
    disableShowTransactions
  } = props;
  return (
    <Grid direction="row" alignItems="flex-start">
      <FormControlLabel
        control={
          <Checkbox
            disabled={disableShowTransactions}
            color="primary"
            checked={showTransactions}
            onChange={() => setShowTransactions(!showTransactions)}
            name="checkedA"
          />
        }
        label="Show purchases and disposals"
      />
      <ResolutionSelect setResolution={setResolution} resolution={resolution} />
    </Grid>
  );
};

export default ChartSettings;
