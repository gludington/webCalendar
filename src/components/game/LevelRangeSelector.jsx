import React from "react";
import { useFormikContext } from "formik";

import { Box, TextField } from "@mui/material";

export default function LevelRangeSelector(props) {
  const { values, setValues } = useFormikContext();

  const handleChange = () => {};

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <TextField
        sx={{ width: "6em" }}
        name="level_min"
        value={values.level_min || 1}
        onChange={handleChange}
        label="Min Level"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="level_max"
        sx={{ width: "6em" }}
        value={values.level_max || 4}
        onChange={handleChange}
        label="Max Level"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
}
