import React, { useRef, useEffect } from "react";
import { ChartCanvas, Chart } from "react-stockcharts";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CandlestickSeries,
  LineSeries,
  TriangleMarker,
  ScatterSeries,
  CircleMarker,
} from "react-stockcharts/lib/series";
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
import { SingleValueTooltip } from "react-stockcharts/lib/tooltip";

const CandlesChart = ({
  type,
  data,
  width,
  ratio,
  candleSeries,
  lineSeries,
  dateFormat,
}) => {
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
      <Chart id={2} yExtents={(d) => [d.high, d.low]}>
        <MouseCoordinateY
          at="left"
          orient="left"
          displayFormat={format(".4s")}
        />
        <ScatterSeries
          yAccessor={(d) => (d.purchases ? d.close : null)}
          marker={TriangleMarker}
          markerProps={{
            width: 20,
            stroke: "#2ca02c",
            fill: theme.palette.primary.main,
          }}
        />
        <ScatterSeries
          yAccessor={(d) => (d.disposals ? d.close : null)}
          marker={CircleMarker}
          markerProps={{
            width: 20,
            stroke: "#2ca02c",
            fill: theme.palette.primary.main,
          }}
        />
        <SingleValueTooltip
          origin={[100, 20]}
          yLabel={"Purchases"}
          yDisplayFormat={({ purchases }) => purchases}
          displayValuesFor={(props, { currentItem }) => currentItem}
        />
        <SingleValueTooltip
          origin={[10, 20]}
          yLabel={"Disposals"}
          yDisplayFormat={({ disposals }) => disposals}
          displayValuesFor={(props, { currentItem }) => currentItem}
        />
      </Chart>
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

        <MouseCoordinateX
          at="bottom"
          orient="bottom"
          displayFormat={timeFormat(dateFormat)}
        />
        {candleSeries && (
          <CandlestickSeries
            wickStroke={theme.palette.grey["50"]}
            width={timeIntervalBarWidth(utcDay)}
          />
        )}
        {lineSeries && <LineSeries yAccessor={(d) => d.close} />}
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
