import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  useToast,
  Avatar,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmailIcon from "@mui/icons-material/Email";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { updatePassword, userPassRequest } from "../../feature/user/actionCreator";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

const ForgotPassowrdModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [show, setShow] = useState(false);
  const [steptwo, setStepTwo] = useState(false);

  const toast = useToast();
  const loading = useSelector((state) => state?.user?.loading);

  const dispatch = useDispatch();
  const handleShowPassword = () => {
    setShow(!show);
  };

  const handlePassRequest = async () => {
    if (!email || email.trim()==="") {
      toast({
        title: "Error",
        description: "Email is required",
        status: "error",
        duration: 4000,
        position: "top-left",
        isClosable: true,
      });
      return;
    }
    try {
      const res = await dispatch(userPassRequest({ email }));
      if (res.meta.requestStatus === "fulfilled") {
        toast({
          title: "Success",
          description: "Otp has been send to your email",
          status: "success",
          duration: 5000,
          position: "top-left",
          isClosable: true,
        });
        setStepTwo(true);
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
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    }
  };
  const handleUpdatePassword=async()=>{
    if(!email || !otp || !newPassword || email.trim()==="" || otp.trim()==="" || newPassword.trim()===""){
        toast({
            title: "Error",
            description: "All Fields are required",
            status: "error",
            duration: 4000,
            position: "top-left",
            isClosable: true,
          });
        return
    }
    try {
        const res=await dispatch(updatePassword({email,otp,newPassword}));
        if (res.meta.requestStatus === "fulfilled") {
            toast({
              title: "Success",
              description: "Password updated successfully",
              status: "success",
              duration: 5000,
              position: "top-left",
              isClosable: true,
            });
            onClose()
          } else if (res.meta.requestStatus === "rejected") {
            toast({
              title: "Error",
              description: res.payload.message,
              status: "error",
              duration: 5000,
              position: "top-left",
              isClosable: true,
            });
          }
    } catch (error) {
        toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            duration: 9000,
            position: "top",
            isClosable: true,
          });
    }
  }
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Forgot Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text>Enter your Email to Recover Your Account</Text>
              <InputGroup
                width="100%"
                size="lg"
                mt="1.5%"
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
              {steptwo && (
                <>
                  <Text mt="3%">Enter the otp you have received</Text>
                  <InputGroup
                    width="100%"
                    size="lg"
                    mt="1.5%"
                    borderColor="rgb(192, 185, 253)"
                  >
                    <InputLeftElement pointerEvents="none">
                      <ContactPageIcon htmlColor="gray" />
                    </InputLeftElement>
                    <Input
                      type="text"
                      placeholder="Your otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </InputGroup>
                </>
              )}
              {steptwo && (
                <>
                  <Text mt="3%">Enter your new password</Text>
                  <InputGroup
                    width="100%"
                    size="lg"
                    mt="1.5%"
                    borderColor="rgb(192, 185, 253)"
                  >
                    <InputLeftElement pointerEvents="none">
                      <ContactPageIcon htmlColor="gray" />
                    </InputLeftElement>
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <InputRightElement onClick={handleShowPassword}>
                      {show ? (
                        <VisibilityOffRoundedIcon htmlColor="gray" />
                      ) : (
                        <RemoveRedEyeRoundedIcon htmlColor="gray" />
                      )}
                    </InputRightElement>
                  </InputGroup>
                </>
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={steptwo?handleUpdatePassword:handlePassRequest}
              bg="rgb(132, 94, 242)"
              isLoading={loading}
              color="white"
            >
              {steptwo?"Update":"Submit"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                onClose();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ForgotPassowrdModal;
