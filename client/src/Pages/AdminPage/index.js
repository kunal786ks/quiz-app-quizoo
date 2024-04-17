import { Box } from "@chakra-ui/react";
import React from "react";
import AdminMenu from "../../component/AdminMenu";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <Box display="flex" h="92vh">
      <Box bg="rgb(215, 211, 247)" width="20%">
        <AdminMenu />
      </Box>
      <Box width="80%">
        <main>
          <Outlet />
        </main>
      </Box>
    </Box>
  );
};

export default AdminPage;
