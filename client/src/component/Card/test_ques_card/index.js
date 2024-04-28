import { useEffect, useState } from "react";
import { Box, Button, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { answeringQuestion } from "../../../feature/test_user/testSlice";

const TestQuesCard = ({ question }) => {
  const [value, setValue] = useState("");
  console.log(question,"this is test analytics")
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(answeringQuestion({quesId:question?._id,ansMarked:value}))
  }, [value]);
  return (
    <Box h="100%" w="100%" padding="20px">
      <Box
        bg="rgb(206, 203, 190)"
        borderRadius="12px"
        h="100%"
        w="100%"
        padding="20px"
      >
        <Box display="flex" justifyContent="space-between">
          <Text fontSize="25px">Question : {question?.question_title}</Text>
          <Text fontSize="25px">{question?.marksOfQuestions} Points</Text>
        </Box>

        <Box mt="2%">
          {question?.questionChoices?.map((choice, index) => (
            <RadioGroup onChange={setValue} value={value} key={index}>
              <Stack direction="column" h="8vh">
                <Radio h="100%" size="lg" value={choice}>
                  {choice}
                </Radio>
              </Stack>
            </RadioGroup>
          ))}
          <Box width="100%" display="flex" justifyContent="right">
            <Button
              onClick={() => {
                setValue();
              }}
            >
              Clear choice
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TestQuesCard;
