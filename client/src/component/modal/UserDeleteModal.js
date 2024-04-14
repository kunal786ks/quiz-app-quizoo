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
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../feature/user/actionCreator";
import { useNavigate } from "react-router-dom";
const UserDeleteModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const toast = useToast();

  const user = useSelector((state) => state?.user?.userData);
  const loading = useSelector((state) => state?.user?.loading);

  const token = useSelector((state) => state?.user?.token)
  const userId = user?._id;

  const navigate = useNavigate();

  const handleDelte = async () => {
    try {
      const res = await dispatch(deleteUser({ userId, token }));
      console.log(res, "tso os sdelete");
      if (res.meta.requestStatus === "fulfilled") {
        toast({
          title: "Success",
          description: "Account Deleted Successfully",
          status: "success",
          duration: 4000,
          position: "top-left",
          isClosable: true,
        });
        navigate("/login");
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
          <ModalHeader>Delete Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="20px" color="gray">
              Are You Sure To Delete Your Account?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDelte} isLoading={loading}>
              Delete
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

export default UserDeleteModal;
