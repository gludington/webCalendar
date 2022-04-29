import * as React from "react";

import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material"
import FullDescPopover from "./FullDescPopover";
import CalendarAddPopover from "./CalendarAddPopover";
import { toLocalString } from "../utils/formatting";
import { checkTier } from "../utils/tier";
import { ReleaseDate } from "../utils/releasedate";

const Game = ({ data, close }) => {
  
  const {
    module,
    name,
    datetime,
    length,
    number_of_players,
    max_players,
    number_of_waitlisted,
    dm_name,
    level_min,
    level_max,
    datetime_release,
    datetime_open_release,
  } = data;

  return (
    <Card raised="true" sx={{ maxWidth: 450 }}>
      <CardContent sx={{ pt: 0.75, pb: 0.2, "&:last-child": { pb: 0 } }}>
        <Stack
          container
          direction="row"
          justifyContent="space-between"
        >
        <Typography variant="cardmain" color="text.primary" marginRight={3}>
              {toLocalString(datetime)}
        </Typography>
          <IconButton onClick={close}>
          <CloseIcon />
        </IconButton>
        </Stack>
        <Stack
          container
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="subtitle" color="text.primary" sx={{ mr: 1 }}>
            {module}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
              {length}
        </Typography>
          <Typography variant="subtitle2" color="text.primary" display="block">
            {checkTier(level_min, level_max)}
          </Typography>
        </Stack>
        <Divider
          variant="middle"
          sx={{
            my: 0.6,
          }}
        />
        <Typography variant="cardmain" color="text.primary">
          {name}
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ mt: 0.2 }}
        >
          <FullDescPopover game={data} /> <CalendarAddPopover game={data} />
        </Grid>
        <Divider variant="middle" sx={{ mb: 1 }} />
        <Typography variant="subtitle2" color="text.primary" display="block">
          DM: {dm_name}
        </Typography>
        {/* <Typography
          variant="subtitle2"
          color="text.secondary"
          display="block"
          sx={{ pt: 0.5 }}
        >
          Content Warnings:
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" display="block">
          {warnings}
        </Typography> */}
      </CardContent>
      {/* </CardActionArea> */}
      <CardActions sx={{ py: 0 }}>
        <Grid container direction="row" justifyContent="space-between">
          <Box p={1} textAlign="center" sx={{ flexGrow: 1 }}>
            <Typography variant="body1" color="text.primary">
              Players
            </Typography>
            <Typography variant="h6" color="text.primary">
              {number_of_players} / {max_players}
            </Typography>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box p={1} textAlign="center" sx={{ flexGrow: 1 }}>
            <Typography variant="body1" color="text.primary">
              Waitlist
            </Typography>
            <Typography variant="h6" color="text.primary">
              {number_of_waitlisted}
            </Typography>
          </Box>
        </Grid>
      </CardActions>
      <CardActions sx={{ pt: 0.2 }}>
        <Typography variant="suffix" color="text.secondary">
          {ReleaseDate(datetime_release, datetime_open_release)}
        </Typography>
      </CardActions>
    </Card>
  );
};
export default Game;
