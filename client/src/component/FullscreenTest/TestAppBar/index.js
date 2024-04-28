import { useState } from "react";
import { useSelector } from "react-redux";
import Timer from "../Timer";
import { Avatar, Box, Button, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TestAppBar = ({ test }) => {
  const [loading, setLoading] = useState(false);
  
  const user = useSelector((state) => state.user?.userData);
  const toast=useToast();
  const testId=useSelector(state=>state?.test?.test_id);
  const questionAndAnsByuser=useSelector(state=>state?.test?.questionAndAnsByuser);
  const token=useSelector(state=>state?.user?.token)
  const navigate=useNavigate();
  
  const handleTestSubmit = async () => {
    setLoading(true);
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
      setLoading(false);
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
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      h="8vh"
      bg="lightgray"
      padding="20px"
    >
      <Box
        display="flex"
        gap="20px"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar src={`${process.env.REACT_APP_API_HOST_KEY}${user?.pic}`} />
        <Box>
          <Text fontSize="25px" fontWeight="bold">
            {user?.name.charAt(0).toUpperCase() + user.name.slice(1)}
          </Text>
          <Text>{user?.email}</Text>
        </Box>
      </Box>

      <Box width="40%" h="100%">
        <Timer test={test} />
      </Box>

      <Button
        bg="rgb(40, 174, 234)"
        _hover={{ bg: "rgb(40, 174, 20)" }}
        color="white"
        fontSize="100%"
        w="8%"
        height="100%"
        onClick={handleTestSubmit}
        disabled={loading}
        isLoading={loading}
      >
        End Test
      </Button>
    </Box>
  );
};

export default TestAppBar;
