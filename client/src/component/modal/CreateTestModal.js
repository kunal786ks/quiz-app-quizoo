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
} from "@chakra-ui/react";
import MakeTestForm from "../forms/make_test_form";

const CreateTestModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Your Test</ModalHeader>
          <ModalCloseButton />
          <ModalBody bg="lightgray">
            <MakeTestForm />
          </ModalBody>

          <ModalFooter>
            <Button
              bg="rgb(126, 91, 231)"
              _hover={{ bg: "rgb(126, 91, 231)" }}
              color="white"
              mr={1}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateTestModal;
