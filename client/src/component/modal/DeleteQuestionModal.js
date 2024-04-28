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
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const DeleteQuestionModal = ({ children, questionId, updated, setUpdated }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const token = useSelector((state) => state?.user?.token);
  const testId = useSelector((state) => state?.test?.test_id);
  const handleDelte = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:8084/api/ques/delete-ques`,
        {
          questionId: questionId,
          testId: testId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      toast({
        title: "Success",
        description: res.data?.message,
        status: "success",
        duration: 4000,
        position: "top-left",
        isClosable: true,
      });
      setUpdated(!updated)
      onClose();
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: error?.response?.data?.message,
        status: "error",
        duration: 4000,
        position: "top-left",
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
          <ModalHeader>Delete Test</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="20px" color="gray">
              Are You Sure , You want to delete this Question?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={handleDelte}
              isLoading={loading}
              colorScheme="red"
            >
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

export default DeleteQuestionModal;
