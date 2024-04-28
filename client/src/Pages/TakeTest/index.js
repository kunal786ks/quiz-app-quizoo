import  { useCallback, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import GiveTest from "../../component/FullscreenTest";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTimer } from "../../feature/test_user/testSlice";

const TakeTest = () => {
  const [open, setOpen] = useState(false);
  const [questions,setQuestions]=useState([])
  const [totalQues, setTotalQues] = useState();
  const [test, setTest] = useState();

  const toast=useToast()
  const dispatch=useDispatch();
  const token = useSelector((state) => state?.user?.token);
  const testId=useSelector(state=>state?.test?.test_id)
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8084/api/ques/test/${testId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalQues(res.data?.questions?.totalQuestion);
      setQuestions(res?.data.questions?.questions)
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
      dispatch(setTimer(res.data?.test?.time_to_finish))
    } catch (error) {
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
  
  const screen1 = useFullScreenHandle();
  const reportChange = useCallback(
    (state, handle) => {
      if (handle === screen1) {
        console.log("Screen 1 went to", state, handle);
        if (state === false) {
          console.log("screen changed");
        }
      }
    },
    [screen1]
  );
  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div>
      <Modal isOpen={open} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="20px" fontWeight="bold">
            Enable Full Screen
          </ModalHeader>
          <ModalBody>
            <Text fontSize="20px" color="gray">
              We wish you all the best for your exam,enable the full screen mode
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={screen1.enter}>
              Full screen
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <FullScreen handle={screen1}>
        <Box h="100vh" w="100vw" bg="white">
            <GiveTest questions={questions} totalQues={totalQues} test={test}/>
        </Box>
      </FullScreen>
    </div>
  );
};

export default TakeTest;
