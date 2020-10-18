import React from "react";
import { ChartCanvas, Chart } from "react-stockcharts";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { utcDay } from "d3-time";
import { scaleTime } from "d3-scale";
import { fitWidth } from "react-stockcharts/lib/helper";

const CandlesChart = ({ type, data, width, ratio }) => {
  const inspect = (data) => console.log(data) || data;
  const xAccessor = (d) => d.date;
  const xExtents = [
    xAccessor(last(data)),
    xAccessor(data[inspect(data.length - 10)]),
  ];
  return (
    <ChartCanvas
      height={400}
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
        <XAxis axisAt="bottom" orient="bottom" ticks={6} />
        <YAxis axisAt="left" orient="left" ticks={5} />
        <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
      </Chart>
    </ChartCanvas>
  );
};

export default fitWidth(CandlesChart);
