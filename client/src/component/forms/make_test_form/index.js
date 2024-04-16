import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useToast,
} from "@chakra-ui/react";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addTest } from "../../../feature/test_user/actionCreator";

const MakeTestForm = () => {
  const [title, setTitle] = useState("");
  const [isToggle, setToggle] = useState(false);
  const [testCategory, setTestCategory] = useState("");
  const [time_to_finish, setTimeToFinish] = useState("");
  const [instruction, setInstruction] = useState("");
  const [instArray, setinstArray] = useState([]);
  const [questions, setQuestions] = useState();
  const [passingMarks, setPassingMakrs] = useState();
  const [maxMarks, setMaxMarks] = useState();

  const dispach = useDispatch();
  const toast = useToast();

  const token = useSelector((state) => state.user?.token);
  const loading=useSelector((state)=>state?.test?.loading)
  const handleAddToArray = () => {
    if (instruction.trim() !== "") {
      setinstArray([...instArray, instruction.trim()]);
      setInstruction("");
    }
  };
  const removeFromArray = (index) => {
    const newArray = [...instArray];
    newArray.splice(index, 1);
    setinstArray(newArray);
  };

  const handleSubmitTest = async () => {
    if (
      !title ||
      !testCategory ||
      !time_to_finish ||
      instArray.length === 0 ||
      !questions ||
      !passingMarks ||
      !maxMarks
    ) {
      toast({
        title: "Error",
        description: "Required feilds are not present",
        status: "error",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      return;
    }
    try {
      const res = await dispach(
        addTest({
          title: title,
          time_to_finish: time_to_finish,
          testCategory: testCategory,
          instruction: instArray,
          totalQuestions: parseInt(questions, 10),
          passingMarks: parseInt(passingMarks, 10),
          MaximumMarks: parseInt(maxMarks, 10),
          token,
        })
      );
      if (res.meta.requestStatus === "fulfilled") {
        toast({
          title: "Success",
          description: "Test created Successfully",
          status: "success",
          duration: 5000,
          position: "top-left",
          isClosable: true,
        });
      } else if (res.meta.requestStatus === "rejected") {
        toast({
          title: "Error",
          description: res.payload.message,
          status: "error",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }
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

  return (
    <Box w="100%" padding="20px">
      <FormControl isRequired>
        <FormLabel>Test title</FormLabel>
        <Input
          placeholder="Enter the test title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired mt="2%">
        <FormLabel>Test Subject</FormLabel>
        <Input
          placeholder="Enter the Topic of test "
          value={testCategory}
          onChange={(e) => setTestCategory(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired mt="2%">
        <FormLabel>Time to finish (in minutes)</FormLabel>
        <Input
          placeholder="Enter the total time of test "
          value={time_to_finish}
          onChange={(e) => setTimeToFinish(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired mt="2%">
        <FormLabel>Add Instructions</FormLabel>
        <InputGroup>
          <InputLeftElement cursor="pointer" onClick={handleAddToArray}>
            <AddIcon htmlColor="white" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Enter the instruction"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          />
          <InputRightElement
            cursor="pointer"
            onClick={() => {
              setToggle(!isToggle);
            }}
          >
            <Popover isOpen={isToggle}>
              <PopoverTrigger>
                <KeyboardArrowDownIcon htmlColor="white" />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Instructions!</PopoverHeader>
                <PopoverBody>
                  {instArray.length === 0 && (
                    <Text>No instruction added yet</Text>
                  )}
                  {instArray &&
                    instArray?.map((instruction, index) => (
                      <Box display="flex" justifyContent="space-between">
                        <Text>{instruction}</Text>
                        <CloseIcon
                          htmlColor="gray"
                          onClick={() => removeFromArray(index)}
                        />
                      </Box>
                    ))}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired mt="2%">
        <FormLabel>Total Questions</FormLabel>
        <Input
          placeholder="Enter the total Questions of test "
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired mt="2%">
        <FormLabel>Maximum Marks</FormLabel>
        <Input
          placeholder="Enter the total Questions of test "
          value={maxMarks}
          onChange={(e) => setMaxMarks(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired mt="2%">
        <FormLabel>Passing Marks</FormLabel>
        <Input
          placeholder="Enter the total Questions of test "
          value={passingMarks}
          onChange={(e) => setPassingMakrs(e.target.value)}
        />
      </FormControl>
      <Button
        mt="2%"
        w="100%"
        color="white"
        bg="rgb(132, 94, 242)"
        isLoading={loading}
        _hover={{ bg: "rgb(132, 94, 242)" }}
        onClick={handleSubmitTest}
      >
        Create Test
      </Button>
    </Box>
  );
};

export default MakeTestForm;
