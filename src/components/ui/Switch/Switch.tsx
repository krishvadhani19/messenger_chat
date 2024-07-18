import MUISwitch from "@mui/material/Switch";
import React, { memo, useCallback } from "react";

type SwitchPropsType = {
  label?: string;
};

const Switch = ({ label = "" }: SwitchPropsType) => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    },
    []
  );

  return (
    <div className="flex-center">
      <div>{label}</div>
      <MUISwitch checked={checked} onChange={handleChange} />
    </div>
  );
};

export default memo(Switch);
