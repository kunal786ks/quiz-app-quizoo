import { Box, Stack, Text } from "@chakra-ui/react";

const AnalyticQuesCard = ({ question,ansMarked }) => {
 
  console.log(question,"this is test analytics")
  
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
            <Box  key={index}>
              <Stack direction="column" h="8vh">
                <Text h="100%" size="lg" value={choice}>
                  {choice}
                </Text>
              </Stack>
            </Box>
          ))}
          <Box width="100%" display="flex" justifyContent="space-between" gap="20px">
           <Text w="50%" bg="white" borderRadius="12px" padding="20px" color="green" fontSize="20px">
                Correct Answer is : {question?.correctAnswer}
           </Text>
           <Text w="50%" bg="white" borderRadius="12px" color={question?.correctAnswer===ansMarked?"green":"red"}padding="20px" fontSize="20px">
                Your marked : {ansMarked}
           </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AnalyticQuesCard;
