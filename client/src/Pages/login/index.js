import { Box, Text } from "@chakra-ui/react";
import React from "react";
import LoginForm from "../../component/forms/login_form";

const LoginPage = () => {
  return (
    <Box h="100vh" display="flex">
      <Box
        h="100vh"
        w="40%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        
        bg="linear-gradient(to bottom, rgb(182, 176, 239), rgb(215, 211, 247))"
        flexDir="column"
      >
        <Text fontSize="50px" color="white" fontWeight="bold">Welcome back!</Text>
        <Text color="white" fontSize="20px">Login to your account using your credentials</Text>
      </Box>
      <Box h="100vh" w="60%" padding="30px">
        <Box h="100%" paddingTop="18px" paddingLeft="20px" paddingBottom="20px">
          <Box h="100%" display="flex" flexDir="column" gap="70px">
            <Text color="rgb(0, 8, 55)" fontWeight="bold" fontSize="30px">
              📝 Quizoo
            </Text>
            <Box h="100%" padding="40px">
                <LoginForm/>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
