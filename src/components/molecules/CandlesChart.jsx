import React, { useRef, useEffect } from "react";
import { ChartCanvas, Chart } from "react-stockcharts";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { utcDay } from "d3-time";
import { scaleTime } from "d3-scale";
import { format } from "d3-format";

import {
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import { fitWidth } from "react-stockcharts/lib/helper";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { timeFormat } from "d3-time-format";
import { useTheme } from "@material-ui/core/styles";

const CandlesChart = ({ type, data, width, ratio }) => {
  const theme = useTheme();
  const xAccessor = (d) => d.date;
  const elementsWidth = data.length < 20 ? data.length / 2 : 20;
  const xExtents = [xAccessor(last(data)), xAccessor(data[elementsWidth])];
  return (
    <ChartCanvas
      height={400}
      clamp={true}
      ratio={1}
      width={width}
      margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
      type={type}
      seriesName="MSFT"
      data={data}
      xAccessor={xAccessor}
      xScale={scaleTime()}
      xExtents={xExtents}
    >
      <Chart id={1} yExtents={(d) => [d.high, d.low]}>
        <XAxis
          axisAt="bottom"
          orient="bottom"
          ticks={6}
          stroke={theme.palette.grey["100"]}
          tickStroke={theme.palette.grey["50"]}
        />

        <YAxis
          axisAt="left"
          orient="left"
          ticks={5}
          stroke={theme.palette.grey["100"]}
          tickStroke={theme.palette.grey["50"]}
        />
        <MouseCoordinateY
          at="left"
          orient="left"
          displayFormat={format(".4s")}
        />
        <MouseCoordinateX
          at="bottom"
          orient="bottom"
          displayFormat={timeFormat("%Y-%m-%d")}
        />
        <CandlestickSeries
          wickStroke={theme.palette.grey["50"]}
          width={timeIntervalBarWidth(utcDay)}
        />
        <EdgeIndicator
          itemType="last"
          orient="right"
          edgeAt="right"
          yAccessor={(d) => d.close}
          fill={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
        />
        <OHLCTooltip
          origin={[10, 0]}
          labelFill={theme.palette.primary.main}
          textFill={theme.palette.text.primary}
        />
      </Chart>
      <CrossHairCursor stroke={theme.palette.grey["50"]} />
    </ChartCanvas>
  );
};

export default fitWidth(CandlesChart);
