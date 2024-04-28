import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import TestQuesCard from "../../component/Card/test_ques_card";
import AnalyticQuesCard from "../../component/Card/Analytic_ques_card";

const TestAnalytics = () => {
  const [report, setReport] = useState();
  const testId = useSelector((state) => state?.test?.test_id);
  const toast = useToast();
  const token = useSelector((state) => state?.user?.token);

  const fetchReport = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8084/api/report/get-report/${testId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReport(res.data?.userReport);
    } catch (error) {
      toast({
        title: "Error",
        description: error?.response?.data?.message,
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }
  };

  console.log(report, "%%");
  useEffect(() => {
    fetchReport();
  }, [testId]);
  return (
    <Box h="92vh" overflowY="scroll" padding="20px">
      <Text w="100%" fontSize="25px" textAlign="center" fontWeight="bold">
        Your Test Report
      </Text>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
      >
        <img src={report?.passStatus===true?"/pass_image.png":"/fail_image.jpg"} style={{ height: "25vh" }} />
        <Text
          fontSize="25px"
          textAlign="center"
          fontWeight="bold"
          color="green"
        >
          {report?.passStatus===true?"You Passed the test":"You Failed the test"}
        </Text>
        <Text
          fontSize="25px"
          textAlign="center"
          fontWeight="bold"
          color="green"
        >
          Your Score : {report?.score} / {report?.maximumMarks}
        </Text>
      </Box>
        <Text mt="2%" fontSize="25px" color="rgb(0, 204, 0)" fontWeight="bold" textAlign="center">View Your Submitted Test</Text>
      <Box mt="2%" bg="rgb(236, 236, 236)" borderRadius="12px" padding="20px">
        <Text fontSize="20px" fontWeight="bold">Test title : {report?.testId?.title.charAt(0).toUpperCase()+report?.testId?.title.slice(1)}</Text>
        <Text fontSize="20px" fontWeight="bold">Maximum Marks : {report?.testId?.MaximumMarks}</Text>
        <Text fontSize="20px" fontWeight="bold">Passing Marks : {report?.testId?.passingMarks}</Text>
        <Text fontSize="20px" fontWeight="bold">Total Questions : {report?.totalQuestions}</Text>
        <Text fontSize="20px" fontWeight="bold">Correct Questions : {report?.correctQuestions}</Text>
        <Text fontSize="20px" fontWeight="bold">Not Attempted : {report?.notAttempted}</Text>
        <Text fontSize="20px" fontWeight="bold">Wrong Questions : {report?.wrongAns}</Text>

        <Box>
            {report?.userExam?.map((question,index)=>
            <AnalyticQuesCard question={question?.quesId} ansMarked={question?.ansMarked} key={index}/>
        )}
        </Box>
      </Box>

    </Box>
  );
};

export default TestAnalytics;
