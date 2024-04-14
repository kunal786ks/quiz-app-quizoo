import { Box } from "@chakra-ui/react";
import React from "react";
import ProfileMenu from "../../component/ProfileMenu";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <Box display="flex"h="92vh">
      <Box bg="rgb(215, 211, 247)" width="20%">
        <ProfileMenu/>
      </Box>
      <Box  width="80%">
        <main>
          <Outlet/>
        </main>
      </Box>
    </Box>
  );
};

export default ProfilePage;
