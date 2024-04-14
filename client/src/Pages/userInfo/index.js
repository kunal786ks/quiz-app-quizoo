import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import UserDeleteModal from "../../component/modal/UserDeleteModal";
import { updateUser } from "../../feature/user/actionCreator";
import UpdatePictureModal from "../../component/modal/UpdatePictureModal";
const UserInformation = () => {
  const user = useSelector((state) => state?.user?.userData);
  const loading = useSelector((state) => state?.user?.loading);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const toast = useToast();
  const dispatch = useDispatch();

  const token = useSelector((state) => state?.user?.token);
  const userId = user?._id;

  const handleUpdate = async () => {
    if (!name || !email || name.trim() === "" || email.trim() === "") {
      toast({
        title: "Error",
        description: "Update Atleast One field with value",
        status: "error",
        duration: 4000,
        position: "top-left",
        isClosable: true,
      });
      return;
    }
    try {
      const res = await dispatch(updateUser({ userId, token, name, email }));
      if (res.meta.requestStatus === "fulfilled") {
        toast({
          title: "Success",
          description: "User Info Updated Successfully",
          status: "success",
          duration: 4000,
          position: "top-left",
          isClosable: true,
        });
      } else if (res.meta.requestStatus === "rejected") {
        toast({
          title: "Error",
          description: res.payload.message,
          status: "error",
          duration: 4000,
          position: "top-left",
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
    <Box width="100%" h="92vh" display="flex" padding="40px" gap="20%">
      <Box height="40%" width="30%" position="relative" bg="lightgray">
        <img
          src={`${process.env.REACT_APP_API_HOST_KEY}${user?.pic}`}
          alt="User Avatar"
          style={{
            objectFit: "contain",
            height: "100%",
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <UpdatePictureModal>
          <Text
            position="absolute"
            top="2px"
            right="16px"
            transform="translate(50%, 50%)"
            cursor="pointer"
          >
            <CameraAltIcon htmlColor="gray" />
          </Text>
        </UpdatePictureModal>
      </Box>
      <Box
        width="60%"
        display="flex"
        alignItems="center"
        flexDir="column"
        padding="20px"
      >
        <Text fontSize="30px" fontWeight="bold" color="rgb(0, 8, 55)">
          Your Information
        </Text>
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          h="100%"
          w="100%"
          padding="30px"
        >
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
              placeholder={user?.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
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
              placeholder={user?.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <Button
            width="70%"
            height="8%"
            border="none"
            color="white"
            bg="rgb(132, 94, 242)"
            fontSize="20px"
            _hover={{ bg: "rgb(132, 94, 242)" }}
            mt="2%"
            onClick={handleUpdate}
            isLoading={loading}
          >
            Update account
          </Button>

          <Button
            width="70%"
            height="8%"
            border="none"
            color="white"
            bg="rgb(255, 56, 41)"
            fontSize="20px"
            _hover={{ bg: "red" }}
            mt="2%"
          >
            <UserDeleteModal>Delete Account</UserDeleteModal>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserInformation;
