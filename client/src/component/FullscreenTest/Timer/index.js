import { Box, Text, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import Countdown from 'react-countdown';
import { useDispatch, useSelector } from 'react-redux';
import { setTimer } from '../../../feature/test_user/testSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Timer({ test }) {
  const dispatch=useDispatch()
  const toast=useToast();
  const testId=useSelector(state=>state?.test?.test_id);
  const questionAndAnsByuser=useSelector(state=>state?.test?.questionAndAnsByuser);
  const token=useSelector(state=>state?.user?.token)
  const navigate=useNavigate();
  
  const handleTestSubmit = async () => {
    try {
      const res=await axios.post(`http://localhost:8084/api/ques/ans`,{
        testId:testId,
        questionAndAnsByuser:questionAndAnsByuser
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(res);
      navigate("/home/test/analytics")
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
  const timer = useSelector((state) => state?.test?.time_to_finsh);
  const days = 0;
  const hours = 0;
  const minutes = parseInt(timer) || 0; // Fallback to 0 if undefined
  const seconds = 0;
  const totalSeconds = days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
  const remainingTime = totalSeconds * 1000;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    
    if (completed) {
      handleTestSubmit()
    } else {
      return (
        <Text fontSize="30px">
          {days} days : {hours} hours : {minutes} minutes : {seconds} seconds
        </Text>
      );
    }
  };

  return (
    <Box h="100%" w="100%" justifyContent="center" display="flex">
      {remainingTime > 0 ? (
        <Countdown date={Date.now() + remainingTime} renderer={renderer} />
      ) : (
        <Text fontSize="30px">Invalid Timer</Text> // Fallback for invalid values
      )}
    </Box>
  );
}

export default Timer;
