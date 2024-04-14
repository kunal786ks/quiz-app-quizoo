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
  Toast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../feature/user/actionCreator";

const UpdatePictureModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [pic, setPic] = useState(null); // Store the selected file object

  const user = useSelector((state) => state?.user?.userData);
  const loading = useSelector((state) => state?.user?.loading);

  const token = useSelector((state) => state?.user?.token)
  const userId = user?._id;

  const toast=useToast();
  const dispatch=useDispatch();
  const handleFileChange = (e) => {
    setPic(e.target.files[0]);
  };

  const handleUpdate = async() => {
    if(!pic){
      toast({
        title: "Error",
        description: "Select an Image",
        status: "error",
        duration: 4000,
        position: "top-left",
        isClosable: true,
      });
      return
    }
    try {
      const res=await dispatch(updateProfile({token,userId,pic}))
      if (res.meta.requestStatus === "fulfilled") {
        toast({
          title: "Success",
          description: "Profile Pic Updated SuccessFully",
          status: "success",
          duration: 4000,
          position: "top-left",
          isClosable: true,
        });
        onClose()
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
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile Pic</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" justifyContent="center" alignItems="center" gap="10px">
              <Avatar
                size="lg"
                src={`${process.env.REACT_APP_API_HOST_KEY}${user?.pic}`}
                name={user?.name}
              />
              <Input type="file" onChange={handleFileChange} border="none" />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button color="blue"  onClick={handleUpdate} isLoading={loading}>
              Update
            </Button>
            <Button variant="blue" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdatePictureModal;
