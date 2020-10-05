import React from "react";

import SimpleTitledPaper from "../molecules/SimpleTitledPaper";
import KeyValueRows from "../molecules/KeyValueRows";

type DataPaperProps = {
  data: {};
  title?: string;
};

const DataPaper = ({ data, title }: DataPaperProps) => (
  <SimpleTitledPaper title={title}>
    <KeyValueRows data={data} />
  </SimpleTitledPaper>
);

export default DataPaper;
