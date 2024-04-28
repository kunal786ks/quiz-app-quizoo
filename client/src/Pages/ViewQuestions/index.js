import { useEffect, useState } from "react";
import { Box, Text, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import QuestionCard from "../../component/Card/ques_card";

const ViewQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [totalQues, setTotalQues] = useState();
  const [test, setTest] = useState();
  const [updated, setUpdated] = useState(false);
  const toast = useToast();
  const testId = useSelector((state) => state?.test?.test_id);
  const token = useSelector((state) => state?.user?.token);

  const fetchTestData = async () => {
    try {
      const res = await axios.get(`http://localhost:8084/api/test/${testId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTest(res.data?.test);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8084/api/ques/get-ques/${testId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuestions(res.data?.questions?.questions);
      setTotalQues(res.data?.questions?.totalQuestion);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message,
        status: "error",
        duration: 5000,
        position: "top-left",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchTestData();
  }, [testId, updated]);

  return (
    <Box
      display="flex"
      w="100%"
      h="92vh"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      <Text mt="1%" fontSize="30px" textDecor="underline" fontWeight="bold">
        {test?.title.charAt(0).toUpperCase() + test?.title.slice(1)}
      </Text>
      <Box mt="2%" display="flex" width="100%" justifyContent="space-between">
        <Text
          width="20%"
          color="red"
          textAlign="center"
          fontSize="30px"
          textDecor="underline"
          fontWeight="bold"
        >
          Remaining Marks : {test?.remaingMarksQuestionsTobeAdded}
        </Text>
        <Text
          width="60%"
          textAlign="center"
          fontSize="30px"
          textDecor="underline"
          fontWeight="bold"
        >
          Update Or Delete Your Questions
        </Text>
        <Text
          fontSize="30px"
          width="20%"
          textAlign="right"
          fontWeight="bold"
          mr="2%"
        >
          TotalQuestions : {totalQues}
        </Text>
      </Box>
      {questions.length === 0 ? (
        <Box
          height="80vh"
          width="100%"
          display="flex"
          justifyContent="center"
        >
          <Text mt="10%" fontSize="30px" fontWeight="bold" textDecor="underline">Add Your Questions to test</Text>
        </Box>
      ) : (
        <Box height="100%" w="50%" padding="30px" overflowY="scroll">
          {questions?.map((ques) => (
            <QuestionCard
              question={ques}
              key={ques._id}
              updated={updated}
              setUpdated={setUpdated}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ViewQuestions;
