import React from "react";

import mapData from "../../lib/mapData";
import SimpleTitledPaper from "../molecules/SimpleTitledPaper";
import KeyValueRow from "../atoms/KeyValueRow";

type DataPaperProps = {
  data: {};
  title?: string;
};

const DataPaper = ({ data, title }: DataPaperProps) => {
  return (
    <SimpleTitledPaper title={title}>
      {Object.entries(data)
        .flatMap(mapData)
        .map(([key, value]) => (
          <KeyValueRow key={key} value={value} />
        ))}
    </SimpleTitledPaper>
  );
};

export default DataPaper;
