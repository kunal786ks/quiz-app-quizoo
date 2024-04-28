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


const TestSubmitModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
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
              Do You want to submit the test?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              
              
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
  )
}

export default TestSubmitModal
