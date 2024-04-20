import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { viewTest } from "../../../feature/test_user/testSlice";
import { useLocation, useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteTestModal from "../../modal/DeleteTestModal";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteIcon from "@mui/icons-material/Delete";

const TestCard = ({ test }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const hanldeTestCard = () => {
    dispatch(viewTest(test?._id));
    navigate("/home/add-ques");
  };
  return (
    <Box
      h="100%"
      w="100%"
      bg="rgb(240, 216, 255)"
      padding="20px"
      // onClick={hanldeTestCard}
    >
      {location.pathname === "/home/admin/all-test" && (
        <Box display="flex" gap="10px">
          <Avatar
            src={`${process.env.REACT_APP_API_HOST_KEY}${test?.owner?.pic}`}
            size="lg"
          />
          <Text fontSize="20px" color="gray" mt="2%">
            {test?.owner?.name
              ? test?.owner?.name.charAt(0).toUpperCase() +
                test?.owner?.name.slice(1)
              : ""}
          </Text>
          <Box ml="auto" cursor="pointer">
            <Menu>
              <MenuButton as={MoreVertIcon}></MenuButton>
              <MenuList>
                <MenuItem onClick={hanldeTestCard}>View This Test</MenuItem>
                <DeleteTestModal test={test}>
                  <MenuItem>Delete this Test</MenuItem>
                </DeleteTestModal>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      )}
      <Box mt="4%">
        <Text
          fontSize="25px"
          color="gray"
          whiteSpace="nowrap"
          width="100%"
          textOverflow="ellipsis"
          overflow="hidden" // Ensure overflow is set to "hidden"
          numberOfLines={1}
        >
          Title:{" "}
          {test?.title &&
            test?.title.charAt(0).toUpperCase() + test?.title.slice(1)}
        </Text>
        <Text color="gray">Max Marks : {test?.MaximumMarks}</Text>
        <Text color="gray">Max Time :{test?.time_to_finish}</Text>
        <Text color="gray">Pass. Mark :{test?.passingMarks}</Text>
      </Box>
      <Text
        color="gray"
        width="100%"
        numberOfLines={1}
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        Description: {test?.testDescription}
      </Text>
      <Tooltip label={`${test?.remaingMarksQuestionsTobeAdded}`>0?"Add Questions to this test":"Published User can give this test"}>
        <Text fontSize="20px" color="red">
          {`${test?.remaingMarksQuestionsTobeAdded}` > 0
            ? "Pending"
            : "Published"}{" "}
        </Text>
      </Tooltip>
      <Box mt="10%" ml="80%" w="100%" display="flex" gap="10px">
        <OpenInNewIcon
          htmlColor="gray"
          onClick={hanldeTestCard}
          sx={{ cursor: "pointer" }}
        />
        <DeleteTestModal test={test}>
          <DeleteIcon htmlColor="gray" sx={{ cursor: "pointer" }} />
        </DeleteTestModal>
      </Box>
    </Box>
  );
};

export default TestCard;
