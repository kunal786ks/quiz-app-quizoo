import React from "react";
import { Box, Text } from "@chakra-ui/react";
import './index.css'
import SignUpForm from "../../component/forms/signup_form";
const SignUp = () => {
  return (
    <Box h="100vh"  display="flex">
        <Box h="100vh" w="60%" padding="30px">
            <Box  h="100%" paddingTop="18px" paddingLeft="20px" paddingBottom="20px"> 
                    <Box h="100%" display="flex" flexDir="column" gap="70px">
                            <Text color="rgb(0, 8, 55)" fontWeight="bold" fontSize="30px">📝 Quizoo</Text>
                            <Box h="100%" padding="40px">
                                <SignUpForm/>
                            </Box>
                    </Box>
            </Box>
        </Box>  
      <Box h="100vh" w="40%" display="flex" alignItems="center" padding="30px">
           <Box className="signup-image-container"  >
           </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
