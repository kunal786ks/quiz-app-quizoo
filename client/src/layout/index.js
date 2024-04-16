import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AppBar from "../component/AppBar";
const LayoutComponent = () => {
  return (
    <Box h="100vh">
      <AppBar />
      <Box pt="8vh">
        <main>
          <Outlet />
        </main>
      </Box>

      {/* <p>this is footer</p> */}
    </Box>
  );
};

export default LayoutComponent;
