import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import ContentContainer from "../atoms/ContentContainer";

import SimplePaper from "../atoms/SimplePaper";

const useStyles = makeStyles(() => ({}));

function StockSection() {
  const styles = useStyles();

  return (
    <ContentContainer>
      <SimplePaper
        topbar={
          <Typography variant="h4" color="textPrimary">
            Stock
          </Typography>
        }
      >
        <Typography component="h1" variant="h5" color="textPrimary">
          StockSection
        </Typography>
      </SimplePaper>
    </ContentContainer>
  );
}

export default StockSection;
