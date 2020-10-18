import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

import type { ChartResolutionType } from '../../lib/types';


type ResolutionSelectProps = {
  setResolution: (res: ChartResolutionType) => any;
  resolution: ChartResolutionType;
};
const ResolutionSelect = ({
  setResolution,
  resolution,
}: ResolutionSelectProps) => {
  return (
    <FormControl>
      <Select
        value={resolution}
        onChange={(event) =>
          setResolution(event.target.value as ChartResolutionType)
        }
      >
        {/* <MenuItem value={"1"}>One minute</MenuItem>
   <MenuItem value={"5"}>Five minutes</MenuItem>
   <MenuItem value={"15"}>Fifteen minutes</MenuItem> */}
        {/* <MenuItem value={"30"}>Thirty minutes</MenuItem> */}
        <MenuItem value={"D"}>One Day</MenuItem>
        <MenuItem value={"W"}>One Week</MenuItem>
        <MenuItem value={"M"}>One Month</MenuItem>
      </Select>
      <FormHelperText>Resolution</FormHelperText>
    </FormControl>
  );
};

export default ResolutionSelect;
