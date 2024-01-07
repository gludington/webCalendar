import { useState } from "react";
import { useFormik, Field, Formik } from "formik";
 import * as Yup from "yup";
import { Box, TextField, Button } from "@mui/material";

import RealmSelector from "../../components/game/RealmSelector";
import VariantSelector from "../../components/game/VariantSelector";

export default function GameCreationPage() {
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object().shape({   
      name: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
      code: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required')
      
    }),
    initialValues: {
      name: "",
      code: "",
      realm: "faerun",
      variant: "resAL",
      description: "",
      maxPlayers: 6,
      tier: 1,
      minLevel: 1,
      maxLevel: 4,
      warnings: "",
      streaming: false,
      dateTime: null,
      dateTimePatreonRelease: null,
      length: "4 hours",
      ready: true

    },
    onSubmit: (values) => {
      console.info("This is only called if validation passes");
      //save(values)
    }
  });
  const [description, setDescription] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(6);
  const [tier, setTier] = useState(1);
  const [minLevel, setMinLevel] = useState(1);
  const [maxLevel, setMaxLevel] = useState(4);
  const [warnings, setWarnings] = useState("");
  const [streaming, setStreamning] = useState(false);
  const [dateTime, setDateTime] = useState(null);
  const [dateTimePatreonRelease, setDateTimePatreonRelease] = useState(null);
  const [dateTimeOpenRelease, setDateTimeOpenRelease] = useState(null);
  const [length, setLength] = useState("4 Hours");
  const [ready, setReady] = useState(true);

  return (
    <Formik {...formik} >
      <form onSubmit={formik.handleSubmit}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <TextField id="name" value={formik.values.name} onChange={formik.handleChange} label="Game Name" error={formik.errors.name} helperText={formik.errors.name} />
      <TextField id="code" value={formik.values.code} onChange={formik.handleChange} label="Module Code" error={formik.errors.code} helperText={formik.errors.code} />
      <RealmSelector />
      <VariantSelector />
      <Button type="submit" variant="outlined">
        Create Game
      </Button>
        </Box>
        </form>
      </Formik>
  );
}
