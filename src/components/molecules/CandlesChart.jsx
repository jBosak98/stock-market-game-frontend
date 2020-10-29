import React, { useRef, useEffect } from "react";
import { ChartCanvas, Chart } from "react-stockcharts";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CandlestickSeries,
  LineSeries,
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
import { HoverTooltip } from "react-stockcharts/lib/tooltip";
import { timeFormat } from "d3-time-format";
import { useTheme } from "@material-ui/core/styles";
import { ema } from "react-stockcharts/lib/indicator";

const CandlesChart = ({
  type,
  data,
  width,
  ratio,
  candleSeries,
  lineSeries,
  dateFormat,
  showTransactions,
}) => {
  const theme = useTheme();
  const xAccessor = (d) => d.date;
  const elementsWidth = data.length < 20 ? data.length / 2 : 20;
  const ema50 = ema()
    .id(2)
    .options({ windowSize: 50 })
    .merge((d, c) => {
      d.ema50 = c;
    })
    .accessor((d) => d.ema50);
  const numberFormat = format(".2f");

  const tooltipContent = (ys) => {
    return ({ currentItem, xAccessor }) => {
      const { disposals, purchases, open, high, low, close } = currentItem;
      return {
        x: timeFormat(dateFormat)(xAccessor(currentItem)),
        y: [
          {
            label: "open",
            value: open && numberFormat(open),
          },
          {
            label: "high",
            value: high && numberFormat(high),
          },
          {
            label: "low",
            value: low && numberFormat(low),
          },
          {
            label: "close",
            value: close && numberFormat(close),
          },
          {
            label: "disposals",
            value: disposals,
          },
          {
            label: "purchases",
            value: purchases,
          },
        ]
          .concat(
            ys.map((each) => ({
              label: each.label,
              value: each.value(currentItem),
              stroke: each.stroke,
            }))
          )
          .filter((line) => line.value),
      };
    };
  };

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
        {showTransactions && (
          <>
            <ScatterSeries
              yAccessor={(d) => (d.purchases ? d.close : null)}
              marker={CircleMarker}
              markerProps={{
                r: 10,
                stroke: "#2ca02c",
                fill: theme.palette.primary.main,
                opacity: 0.5,
              }}
            />
            <ScatterSeries
              yAccessor={(d) => (d.purchases ? d.close : null)}
              marker={CircleMarker}
              markerProps={{
                r: 10,
                stroke: "#2ca02c",
                fill: theme.palette.primary.main,
                opacity: 0.5,
              }}
            />
          </>
        )}
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

        <HoverTooltip
          yAccessor={ema50.accessor()}
          tooltipContent={tooltipContent([])}
          fontSize={15}
        />
        {/* <OHLCTooltip
          origin={[10, 0]}
          labelFill={theme.palette.primary.main}
          textFill={theme.palette.text.primary}
        /> */}
      </Chart>
      <CrossHairCursor stroke={theme.palette.grey["50"]} />
    </ChartCanvas>
  );
};

export default fitWidth(CandlesChart);
