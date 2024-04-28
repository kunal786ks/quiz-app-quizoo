import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { viewTest } from "../../../feature/test_user/testSlice";

const SearchTestCard = ({ test }) => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handleViewTest = () => {
    dispatch(viewTest(test?._id));
    navigate(`/home/view-test/${test?._id}`);
  };
  return (
    <Box
      h="100%"
      w="100%"
      padding="10px"
      bg="rgb(211, 211, 211)"
      borderRadius="12px"
      onClick={handleViewTest}
    >
      <Text fontSize="20px">{test?.title}</Text>
    </Box>
  );
};

export default SearchTestCard;
