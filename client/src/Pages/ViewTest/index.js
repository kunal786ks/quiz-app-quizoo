import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import { clearPreviousTestData, viewTest } from "../../feature/test_user/testSlice";
const ViewTest = () => {
  const [test, setTest] = useState();
  const [totalQues, setTotalQues] = useState();
  const { testId } = useParams();

  const toast = useToast();
  const token = useSelector((state) => state?.user?.token);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleTakeTest=()=>{
    dispatch(viewTest(testId))
    dispatch(clearPreviousTestData())
    navigate("/home/take-test")
  }
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

  const fetchTestData = async () => {
    try {
      const res = await axios.get(`http://localhost:8084/api/test/${testId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTest(res.data?.test);
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: error?.response?.data.message,
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchTestData();
    fetchQuestions();
  }, [testId]);
  return (
    <Box h="92vh" w="100%" padding="20px" display="flex" gap="20px">
      <Box h="100%" bg="lightgray" w="40%" borderRadius="12px" padding="20px">
        <Box display="flex">
          <Text
            w="100%"
            display="flex"
            justifyContent="center"
            fontSize="25px"
            fontWeight="bold"
            textDecoration="underline"
          >
            Take the test{" "}
          </Text>
        </Box>
        <Box display="flex" mt="2%" justifyContent="space-between">
          <Text fontSize="25px">
            Test Title :{" "}
            {test?.title &&
              test?.title.charAt(0).toUpperCase() + test?.title.slice(1)}
          </Text>
          <Text fontSize="25px">Max. Marks: {test?.MaximumMarks}</Text>
        </Box>
        <Box h="10%" overflow="hidden" mt="2%">
          <Text fontSize="20px">Description: {test?.testDescription}</Text>
        </Box>
        <Text mt="1%" fontSize="25px">
          Test Instruction (Read Carefully all the instructions)
        </Text>
        <Box mt="1%" h="40%" overflow="hidden">
          {test?.instruction.slice(0, 6).map((instruction, index) => (
            <Text
              key={index}
              fontSize="20px"
              width="100%"
              whiteSpace="no wrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {index + 1}. {instruction}
            </Text>
          ))}
        </Box>
        <Box padding="20px">
          <Text fontSize="25px">Test Topic : {test?.testCategory}</Text>
          <Text fontSize="25px">Maximum Time : {test?.time_to_finish}</Text>
          <Text fontSize="25px">Passing Marks : {test?.passingMarks}</Text>
          <Text fontSize="25px">TotalQuestions : {totalQues}</Text>
        </Box>
      </Box>
      <Box h="100%" bg="lightgray" w="60%" borderRadius="12px" padding="20px">
        <Box display="flex" h="100%" flexDir="column" w="100%">
          <Text
            w="100%"
            display="flex"
            justifyContent="center"
            fontSize="25px"
            fontWeight="bold"
            textDecoration="underline"
          >
            Guidelines and Instructions{" "}
          </Text>
          <Text w="100%" textAlign="center" fontSize="20px" color="gray">
            (Read Carefully all the instruction and Guidelines for seemless flow
            of test)
          </Text>

          <Text w="100%" mt="1%" fontSize="25px" fontWeight="bold">
            1. Exam Protocols
          </Text>
          <Text fontSize="20px" color="gray">
            A. Read all the instructions that are specified by the owner of the
            test and follow all the instructions and guidelines.
          </Text>
          <Text fontSize="20px" color="gray">
            B. This test contains <strong>{totalQues}</strong> questions and it
            is mandatory to attempt the all the questions
          </Text>
          <Text fontSize="20px" color="gray">
            C. Dont use any kind of external devices.
          </Text>
          <Text fontSize="20px" color="gray">
            D. While attempting the test the <b>Full Screen Mode</b> is required
            and it is applied to all users.
          </Text>
          <Text fontSize="20px" color="gray">
            E. Check your internet connectivity and other network sources to
            avoid any kind of indiscrepency during test
          </Text>

          <Text w="100%" mt="2%" fontSize="25px" fontWeight="bold">
            2. After the Test
          </Text>
          <Text fontSize="20px" color="gray">
            A. <b>Feedback:- </b> If allowed, provide feedback on the test
            experience, especially if you encountered technical issues
          </Text>
          <Text fontSize="20px" color="gray">
            B. <b>Result:- </b> Follow instructions on when and how results will
            be communicated. Avoid contacting the test administrators for
            results unless necessary.
          </Text>

          <Text  w="100%" mt="2%" fontSize="25px" fontWeight="bold">
            3. Personal Conduct
          </Text>
          <Text fontSize="20px" color="gray">
          A. <b>Honesty:</b> Adhere to academic integrity principles. Avoid cheating, plagiarism, or other forms of misconduct.
          </Text>
          <Text fontSize="20px" color="gray">
          B. <b>Confidentiality:</b> Do not share exam questions, answers, or other confidential information with others. This might be a violation of the test's terms and conditions.
          </Text>
          <Text fontSize="20px" color="gray">
          C. <b>Time Management:</b> Keep track of time and ensure you submit the test within the allotted period. Use alarms or timers if needed.
          </Text>
          <Text fontSize="20px" color="gray">
          D. <b>Respect Rules and Guidelines:</b> Follow all instructions provided by the exam administrator or proctor. If there are specific rules about dress code, behavior, or permitted items, respect them.
          </Text>

          <Button mt="2%" bg="rgb(20, 165, 255)" color="white" size="lg" _hover={{bg:"rgb(20, 165, 255)"}} onClick={handleTakeTest}>Start test</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewTest;
