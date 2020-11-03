import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

import mapData from "../../lib/mapData";
import ConditionalWrapper from "./ConditionalWrapper";

type KeyValueComponentProps = {
  classname?: string;
  data: any[];
  tooltip?: string;
};

const PortfolioTopBarKeyValue = (props: KeyValueComponentProps) => {
  const { classname, data, tooltip = "" } = props;
  return (
    <ConditionalWrapper
      condition={!!tooltip.length}
      wrapper={(children: React.ReactNode) => (
        <Tooltip arrow={true} title={<Typography>{tooltip}</Typography>}>
          {children as React.ReactElement<any, any>}
        </Tooltip>
      )}
    >
      <Grid className={classname} xs={12} item direction="row">
        <Grid item direction={"column"} xs={6}>
          <Typography align="right" color="textSecondary">
            {mapData(data)[0][0]}
          </Typography>
        </Grid>
        <Grid item direction={"column"} xs={6}>
          <Typography align="right" color="textSecondary">
            {mapData(data)[0][1]}
          </Typography>
        </Grid>
      </Grid>
    </ConditionalWrapper>
  );
};

export default PortfolioTopBarKeyValue;
