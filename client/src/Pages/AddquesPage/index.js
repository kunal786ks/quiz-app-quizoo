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
import { useSelector } from "react-redux";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

const AddQues = () => {
  const [test, setTest] = useState();

  const [title, setTitle] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [marks, setMarks] = useState("");
  const [updated, setUpdated] = useState(false);

  const testId = useSelector((state) => state?.test?.test_id);
  const token = useSelector((state) => state?.user?.token);
  const toast = useToast();
  const navigate=useNavigate();

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

  useEffect(() => {
    fetchTestData();
  }, [testId, updated]);

  const handleQuestion = async () => {
    if (
      !title ||
      !option1 ||
      !option2 ||
      !option3 ||
      !option4 ||
      !correctAnswer||
      !marks||
      parseInt(marks)<=0
    ) {
      toast({
        title: "Error",
        description: "Check again your fields",
        status: "error",
        duration: 5000,
        position: "top-left",
        isClosable: true,
      });
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:8084/api/ques/add-ques`,
        {
          question_title: title,
          questionChoices: [option1, option2, option3, option4],
          correctAnswer: correctAnswer,
          testId: testId,
          marksOfQuestions: parseInt(marks, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setUpdated(!updated);
      toast({
        title: "Success",
        description: "Question added successfully to test",
        status: "success",
        duration: 5000,
        position: "top-left",
        isClosable: true,
      });
    } catch (error) {
      console.log(error, "tid");
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

  const handleViewQuestions=()=>{
    navigate('/home/view-ques')
  }
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
            Add Questions to Your Test{" "}
          </Text>
          <Text cursor="pointer" onClick={handleViewQuestions}>
            <Tooltip label="View Test Question">
              <InfoIcon />
            </Tooltip>
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
          <Text mt="1%" color="red" fontWeight="bold" fontSize="20px">
            Remaining Marks for the Questios to be added{" "}
            {test?.remaingMarksQuestionsTobeAdded}
          </Text>
        </Box>
      </Box>
      <Box w="60%" bg="lightgray" borderRadius="12px" padding="30px">
        <Box>
          <FormControl isRequired mt="2%">
            <FormLabel>Question Title:</FormLabel>
            <Input
              placeholder="Enter the Title of question "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt="2%">
            <FormLabel>Option 1:</FormLabel>
            <Input
              placeholder="Enter the option 1 "
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt="2%">
            <FormLabel>Option 2:</FormLabel>
            <Input
              placeholder="Enter the option 2 "
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt="2%">
            <FormLabel>Option 3:</FormLabel>
            <Input
              placeholder="Enter the option 3 "
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt="2%">
            <FormLabel>Option 4:</FormLabel>
            <Input
              placeholder="Enter the option 4 "
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt="2%">
            <FormLabel>Correct Answer:</FormLabel>
            <Input
              placeholder="Enter the Correct Answer "
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt="2%">
            <FormLabel>Question's Marks</FormLabel>
            <Input
              placeholder="Enter the Correct Answer "
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
          </FormControl>
          <Button
            w="100%"
            size="lg"
            mt="2%"
            borderRadius="12px"
            bg="rgb(132, 94, 242)"
            _hover={{ bg: "rgb(132, 94, 242)" }}
            color="white"
            onClick={handleQuestion}
          >
            Submit Question
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddQues;
