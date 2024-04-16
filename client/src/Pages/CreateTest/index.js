import { Box, Text } from "@chakra-ui/react";
import React from "react";
import MakeTestForm from "../../component/forms/make_test_form";

const CreateTest = () => {
  return (
    <Box padding="30px" w="100%" h="92vh" display="flex" gap="20px" justifyContent="center">
      <Box
        bg="rgb(211, 207, 246)"
        borderRadius="12px"
        w="50%"
        h="100%"
        display="flex"
        flexDir="column"
        alignItems="center"
        padding="20px"
      >
        <Text fontSize="20px" color="rgb(0, 8, 55)" fontWeight="bold">
          Make Your Test
        </Text>

        <MakeTestForm />
      </Box>
      
    </Box>
  );
};

export default CreateTest;
