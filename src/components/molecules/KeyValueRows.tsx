import React from "react";
import KeyValueRow from "../atoms/KeyValueRow";

import mapData from "../../lib/mapData";

type KeyValueRowsProps = {
  data: Object;
};

const KeyValueRows = ({ data }: KeyValueRowsProps) => (
  <>
    {Object.entries(data)
      .flatMap(mapData)
      .map(([key, value]) => (
        <KeyValueRow dataKey={key} key={key} value={value} />
      ))}
  </>
);

export default KeyValueRows;
