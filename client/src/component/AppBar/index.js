import {
  Avatar,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../feature/user/userSlice";
const AppBar = () => {
  const user = useSelector((state) => state?.user?.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateTest = () => {
    navigate("/home/create-test");
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="999"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      h="8vh"
      w="100%"
      boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;"
      padding="10px"
    >
      <Text
        color="rgb(0, 8, 55)"
        fontWeight="bold"
        fontSize="25px"
        onClick={() => {
          navigate("/home");
        }}
        cursor="pointer"
      >
        📝 Quizoo
      </Text>
      <Box width="30%" display="flex" gap="10px">
        <InputGroup borderColor="rgb(132, 94, 242)">
          <InputLeftElement pointerEvents="none">
            <SearchIcon htmlColor="gray" />
          </InputLeftElement>
          <Input type="text" placeholder="Search a Test" />
        </InputGroup>
        <Button
          border="none"
          height="40px"
          borderRadius="12px"
          bg="rgb(132, 94, 242)"
          _hover={{ bg: "rgb(132, 94, 242)" }}
          color="white"
        >
          Search
        </Button>
      </Box>
      <Menu>
        <Avatar
          as={MenuButton}
          name={user.name}
          src={`${process.env.REACT_APP_API_HOST_KEY}${user.pic}`}
        />
        <MenuList>
          <MenuItem
            onClick={() => {
              navigate("/home/profile");
            }}
          >
            Your Profile
          </MenuItem>
          {user.role === 1 && (
            <MenuItem onClick={handleCreateTest}>Create Test</MenuItem>
          )}
          {user.role === 1 && <MenuItem>See Previous Test</MenuItem>}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default AppBar;
