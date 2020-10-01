import React from "react";
import Spinner from "react-loader-spinner";
import { useTheme } from "@material-ui/core/styles";

type LoaderProps = {
  size?: number;
};
const Loader = ({ size }: LoaderProps) => {
  const theme = useTheme();
  const realSize = size || 150;
  return (
    <div style={{ margin: "auto", width: realSize }}>
      <Spinner
        type="TailSpin"
        color={theme.palette.secondary.main}
        height={realSize}
        width={realSize}
      />
    </div>
  );
};

export default Loader;
