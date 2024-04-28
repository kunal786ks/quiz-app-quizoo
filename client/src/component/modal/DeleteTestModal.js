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
  import {  useSelector } from "react-redux";
  const DeleteTestModal = ({ children,test }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [loading,setLoading]=useState(false);

    const toast = useToast();
    const token = useSelector((state) => state?.user?.token)
  
    const handleDelte = async () => {
      setLoading(true);
        try {
          const res=await axios.delete(`http://localhost:8084/api/test/delete-test/${test._id}`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          setLoading(false);
          toast({
            title: "Success",
            description: res.data?.res,
            status: "success",
            duration: 4000,
            position: "top-left",
            isClosable: true,
          });
          onClose()
          
        } catch (error) {
          setLoading(false)
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
                Are You Sure , You want to delete this test?
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
  
  export default DeleteTestModal;
  