import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Container, Typography, Divider, Box } from "@mui/material";
import { TextField, Button } from "@mui/material";

/**
 * same as games..should extract to common lib so every form can use this
 * Convience method just so we dont have to type this on every required validation.
 * @param {*} field they field, either an object with a label or a string label
 * @returns a string error message
 */
const req = (field) => {
  const label = typeof field === "string" ? label : field.label;
  return `${label} is required`;
};

export default function DMProfile() {
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      dmName: Yup.string().label("DM Alias").required(req),
      dmDescription: Yup.string().label("DM Description").required(req),
    }),
    initialValues: {
      dmName: "",
      setDMDescription: "",
      dmRuleText: "",
      dmMusterText: "",
      description: "",
    },
    onSubmit: (values) => {
      //the form is already collected as an object
      //we only get here if validation rules above have already passed
      //here you call your react-query/axios function
      console.info("about to submit values", values);
    },
  });
  const [profileExists, setProfileExists] = useState(false);
  const { values, errors, handleChange, handleSubmit } = formik;

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <Typography variant="h3">DM Profile Settings</Typography>
        <Divider />

        <TextField
          name="dmName"
          value={values.dmName}
          onChange={handleChange}
          placeholder="DM Delvemeister"
          label="DM Alias"
          error={!!errors.dmName}
          helperText={errors.dmName}
        />
        <TextField
          name="dmDescription"
          value={values.dmDescription}
          onChange={handleChange}
          placeholder="A brief description of yourself as a DM"
          label="Description"
          error={!!errors.dmDescription}
          helperText={errors.dmDescription}
          multiline
          rows={3}
        />
        <TextField
          name="dmRuleText"
          value={values.dmRuleText}
          onChange={handleChange}
          placeholder="Any rules you may wish to set for your games, you could for example demand all PC information is provided at least 24 hours before the game"
          label="Table Rules"
          error={!!errors.dmRuleText}
          helperText={errors.dmRuleText}
          multiline
          rows={4}
        />
        <TextField
          name="dmMusterText"
          value={values.dmMusterText}
          onChange={handleChange}
          placeholder="Specify the text that Unseen Servant will post at the top of your mustering channels"
          label="Mustering text"
          error={!!errors.dmMusterText}
          helperText={errors.dmMusterText}
          multiline
          rows={4}
        />

        <Button variant="outlined" onClick={handleSubmit} sx={{ width: "60%", margin: "auto" }}>
          {profileExists ? "Update" : "Create"}{" "}
          {/* not sure what this is, but id key if off if the profile has an id already, as im assume you are fetching that */}
        </Button>
      </Box>
    </Container>
  );
}
