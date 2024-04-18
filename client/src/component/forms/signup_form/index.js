import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../feature/user/actionCreator";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const loading = useSelector((state) => state?.user?.loading);

  const handleShowPassword = () => {
    setShow(!show);
  };

  const handleSignIn = () => {
    navigate("/login");
  };
  const handleRegister = async () => {
    if (
      !name ||
      name.trim() === "" ||
      !email ||
      email.trim() === "" ||
      !password ||
      password.trim() === ""
    ) {
      toast({
        title: "Error",
        description: "All Feilds are required",
        status: "error",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
      return;
    }
    try {
      const payload = {
        name,
        email,
        password,
      };
      const res = await dispatch(addUser(payload));
      console.log(res);
      if (res.meta.requestStatus === "fulfilled") {
        toast({
          title: "Success",
          description: "Account Created Successfully",
          status: "success",
          duration: 5000,
          position: "top-left",
          isClosable: true,
        });
        navigate("/home");
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
      console.log(error);
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
    <Box display="flex" alignItems="center" h="100%" w="100%" flexDir="column">
      <Text
        alignItems="center"
        color="rgb(16, 34, 77)"
        fontWeight="bold"
        fontSize="35px"
      >
        Create an account
      </Text>
      <Text fontSize="25px">Sign up now and unlock exclusive access!</Text>
      <Box
        width="100%"
        padding="30px"
        h="100%"
        display="flex"
        alignItems="center"
        flexDir="column"
      >
        <Text
          alignItems="left"
          ml="15%"
          mb="1%"
          mr="auto"
          fontSize="20px"
          color="rgb(20, 25, 58)"
          fontWeight="bold"
        >
          Name
        </Text>
        <InputGroup
          size="lg"
          width="70%"
          mb="1.5%"
          borderColor="rgb(192, 185, 253)"
        >
          <InputLeftElement pointerEvents="none">
            <PersonIcon htmlColor="gray" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>
        <Text
          alignItems="left"
          ml="15%"
          mb="1%"
          mr="auto"
          fontSize="20px"
          color="rgb(20, 25, 58)"
          fontWeight="bold"
        >
          Email
        </Text>
        <InputGroup
          width="70%"
          size="lg"
          mb="1.5%"
          borderColor="rgb(192, 185, 253)"
        >
          <InputLeftElement pointerEvents="none">
            <EmailIcon htmlColor="gray" />
          </InputLeftElement>
          <Input
            type="email"
            placeholder="abcd@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <Text
          alignItems="left"
          ml="15%"
          mb="1%"
          mr="auto"
          fontSize="20px"
          color="rgb(20, 25, 58)"
          fontWeight="bold"
        >
          Password
        </Text>
        <InputGroup
          width="70%"
          size="lg"
          mb="1.5%"
          borderColor="rgb(192, 185, 253)"
        >
          <InputLeftElement pointerEvents="none">
            <KeyIcon htmlColor="gray" />
          </InputLeftElement>
          <Input
            type={show ? "text" : "password"}
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputRightElement onClick={handleShowPassword}>
            {show ? (
              <VisibilityOffRoundedIcon htmlColor="gray" />
            ) : (
              <RemoveRedEyeRoundedIcon htmlColor="gray" />
            )}
          </InputRightElement>
        </InputGroup>
        <Button
          mt="2%"
          w="70%"
          bg="rgb(132, 94, 242)"
          height="14%"
          fontSize="20px"
          border="none"
          color="white"
          _hover={{ bg: "rgb(132, 94, 242)" }}
          onClick={handleRegister}
          isLoading={loading}
        >
          Create Account
        </Button>
        <Button
          mt="2%"
          w="70%"
          bg="rgb(237, 237, 249)"
          height="14%"
          fontSize="20px"
          border="none"
          color="black"
          _hover={{ bg: "rgb(237, 237, 249)" }}
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default SignUpForm;
