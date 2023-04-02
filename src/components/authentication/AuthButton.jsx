import React, { useState } from "react";

import { Avatar, Menu, MenuItem } from "@mui/material";

import stringAvatar from "../../utils/stringAvatar";
import { doLogout } from "../../api/auth";
import { useQueryClient } from "react-query";
import { useUserContext } from "../../App"
export default function AuthButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: user, isLoading } = useUserContext();
  console.info(user);
  const queryClient = useQueryClient();
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const discordAuth = () => {
    const url =
      "https://unseen-servant.digitaldemiplane.com/discord_auth/login/";

    window.open(url, "_blank", "noreferrer");
    closeMenu();
  };
  const discordLogout = () => {
    doLogout().then(() => {
      closeMenu();
      queryClient.invalidateQueries(["userdetails"]);
    });
  };

  return (
    <React.Fragment>
      <Avatar onClick={openMenu}{...stringAvatar(isLoading ? "..." : user?.user_data?.username || "")} />
      <Menu
        id="auth-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {user?.user_data ?  <MenuItem onClick={discordLogout}>Logout</MenuItem>: <MenuItem onClick={discordAuth}>Login via discord</MenuItem>}
      </Menu>
    </React.Fragment>
  );
}
