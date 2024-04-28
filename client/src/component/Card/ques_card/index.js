import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DeleteQuestionModal from "../../modal/DeleteQuestionModal";

const QuestionCard = ({ question, updated, setUpdated }) => {
  const [disabled, setDisabled] = useState(true);
  const [title, setTitle] = useState(question?.question_title);
  const [choices, setChoices] = useState(question?.questionChoices);
  const [corrAns, setCorrAns] = useState(question?.correctAnswer);
  const [marks, setMarks] = useState(question?.marksOfQuestions);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const testId = useSelector((state) => state?.test?.test_id);
  const token = useSelector((state) => state?.user?.token);

  const handleOptionChange = (index, newValue) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = newValue;
    setChoices(updatedChoices);
  };
  const handleEdit = () => {
    setDisabled(false);
  };

  const handleQuestionUpdate = async () => {
    if (parseInt(marks) <= 0) {
      toast({
        title: "Error",
        description: "Marks of question is not less than or equal to zero",
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:8084/api/ques/update-ques`,
        {
          question_title: title,
          questionChoices: choices,
          correctAnswer: corrAns,
          marksOfQuestions: parseInt(marks, 10),
          questionId: question?._id,
          testId: testId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDisabled(true);
      setLoading(false);
      setUpdated(!updated);
      toast({
        title: "Success",
        description: res?.data?.message,
        status: "success",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
    } catch (error) {
      setLoading(false);
      setDisabled(true);
      setUpdated(!updated);
      toast({
        title: "Error",
        description: error?.response.data.message,
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      w="100%"
      bg="rgb(246, 246, 247)"
      padding="20px"
      borderRadius="12px"
      mt="2%"
    >
      <FormControl>
        <FormLabel fontSize="20px">Question : </FormLabel>
        <Input
          size="lg"
          type="text"
          isDisabled={disabled}
          placeholder={question?.question_title}
          color="black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      {question?.questionChoices.map((choice, index) => (
        <FormControl key={index}>
          <FormLabel fontSize="20px">Option {index + 1}: </FormLabel>
          <Input
            size="lg"
            type="text"
            isDisabled={disabled}
            placeholder={choice}
            color="black"
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        </FormControl>
      ))}
      <FormControl>
        <FormLabel fontSize="20px">Correct Answer: </FormLabel>
        <Input
          size="lg"
          type="text"
          isDisabled={disabled}
          placeholder={question?.correctAnswer}
          color="black"
          value={corrAns}
          onChange={(e) => setCorrAns(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel fontSize="20px">Questions Marks: </FormLabel>
        <Input
          size="lg"
          type="text"
          isDisabled={disabled}
          placeholder={question?.marksOfQuestions}
          color="black"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />
      </FormControl>
      <Text display="flex" gap="20px" alignItems="left" mt="2%">
        <Button
          width="70%"
          bg="rgb(156, 220, 254)"
          color="white"
          _hover={{ bg: "rgb(156, 220, 254)" }}
          onClick={disabled ? handleEdit : handleQuestionUpdate}
        >
          {disabled ? "Edit" : "Update"}
        </Button>
        <Button
          width="70%"
          bg="rgb(248, 102, 57)"
          color="white"
          _hover={{ bg: "rgb(248, 102, 57)" }}
        >
          <DeleteQuestionModal updated={updated} setUpdated={setUpdated} questionId={question?._id}>Delete</DeleteQuestionModal>
        </Button>
      </Text>
    </Box>
  );
};

export default QuestionCard;
