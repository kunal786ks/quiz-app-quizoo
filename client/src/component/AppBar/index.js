import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../../feature/user/userSlice";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
const AppBar = () => {
  const [search, setSearch] = useState("");
  const [test, setTest] = useState([]);

  const user = useSelector((state) => state?.user?.userData);
  const token = useSelector((state) => state.user?.token);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleCreateTest = () => {
    navigate("/home/create-test");
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  const toast = useToast();
  const handleSearch = async () => {
    if (!search) {
      toast({
        description: "Enter Something in the search",
        status: "error",
        duration: 2000,
        position: "top-left",
        isClosable: true,
      });
      return;
    }
    try {
      console.log("he;;p");
      const response = await axios.get(
        `http://localhost:8084/api/test/get-test?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTest(response.data.tests.records);
    } catch (error) {}
  };
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bg="white"
      display="flex"
      zIndex="1000"
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
      {location?.pathname === "/home" && (
        <Box width="30%" display="flex" gap="10px">
          <Popover h="20vh" overflowY="scroll">
            <InputGroup borderColor="rgb(132, 94, 242)">
              <InputLeftElement pointerEvents="none">
                <SearchIcon htmlColor="gray" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search a Test"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>

            <PopoverTrigger>
              <Button
                border="none"
                height="40px"
                borderRadius="12px"
                bg="rgb(132, 94, 242)"
                _hover={{ bg: "rgb(132, 94, 242)" }}
                color="white"
                isDisabled={!search}
                onClick={handleSearch}
              >
                Search
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Search Results</PopoverHeader>
              {/* <InfiniteScroll
              style={{
                overflow:"hidden"
              }}
                dataLength={test?.length}
                next={handleSearch}
                hasMore={test?.length !== totalRecords}
                loader={
                  <Box
                    margin="auto"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CircularProgress isIndeterminate color="blue" />
                  </Box>
                }
                endMessage={
                  <Text
                    margin="auto"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    Your all results
                  </Text>
                }
              > */}
              <PopoverBody height="400px" overflowY="scroll">
                {test?.length > 0
                  ? test?.map((test, index) => (
                      <Text key={index} h="100px">
                        {test?.title}
                      </Text>
                    ))
                  : "No Data Found"}
              </PopoverBody>
              {/* </InfiniteScroll> */}
            </PopoverContent>
          </Popover>
        </Box>
      )}
      <Menu>
        <Avatar
          as={MenuButton}
          name={user?.name}
          src={`${process.env.REACT_APP_API_HOST_KEY}${user?.pic}`}
        />
        <MenuList>
          <MenuItem
            onClick={() => {
              navigate("/home/profile");
            }}
          >
            Your Profile
          </MenuItem>
          {(user?.role === 1 || user?.role===2) && (
            <MenuItem onClick={handleCreateTest}>Create Test</MenuItem>
          )}
          {(user?.role === 1 || user?.role===2) && <MenuItem onClick={()=>{navigate("/home/all-tests")}}>See Previous Test</MenuItem>}
          {(user?.role===2) && (
            <MenuItem
              onClick={() => {
                navigate("/home/admin");
              }}
            >
              Admin Dasboard
            </MenuItem>
          )}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default AppBar;
