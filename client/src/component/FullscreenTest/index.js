import React from "react";
import { Box, Text } from "@chakra-ui/react";
import TestAppBar from "./TestAppBar";
import TestQuesCard from "../Card/test_ques_card";

const GiveTest = ({ test, totalQues, questions }) => {
  return (
    <Box h="100%" w="100%">
      <TestAppBar totalQues={totalQues} test={test} />

      <Box h="92vh" padding="20px" overflow="hidden" overflowY="scroll">
        <Text
          width="100%"
          fontSize="25px"
          color="rgb(211, 211, 211)"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Total Questions in the Test : {totalQues}
        </Text>
        <Box display="flex" alignItems="center" flexDir="column" padding="20px">
        {questions?.map((ques,index)=>(
          <Box width="70%"  h="50vh">
            <TestQuesCard question={ques} key={index}/>
            </Box>
        ))}
        </Box>
       
      </Box>
    </Box>
  );
};

export default GiveTest;
