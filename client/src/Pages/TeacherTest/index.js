import {
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useSelector } from "react-redux";
import EastIcon from "@mui/icons-material/East";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import TestCard from "../../component/Card/test_card";
import CreateTestModal from "../../component/modal/CreateTestModal";

const TeacherTests = () => {
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("");
  const [test, setTest] = useState([]);
  const [status,setStatus]=useState()
  const [totalTest, setTotalTest] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const token = useSelector((state) => state.user?.token);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8084/api/test/user-test?page=${page}&limit=8&search=${search}&sortOrder=${order}&status=${status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTest(response.data.tests.records);
      setTotalPages(response.data.tests.totalPages);
      setTotalTest(response.data.tests.totalRecords); // Set total results from response
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, [order, page,status]);

  useEffect(() => {
    setPage(1);
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);
  console.log(status)
  const handleBackPage = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };
  const hanldeNextPage = () => {
    if (page === totalPages) {
      return;
    }
    setPage(page + 1);
  };

  return (
    <Box h="92vh" padding="30px">
      <Box display="flex" gap="20px">
        <InputGroup borderColor="rgb(132, 94, 242)" w="40%">
          <InputLeftElement pointerEvents="none">
            <SearchIcon htmlColor="gray" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search a Test By Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        <Select
          w="10%"
          placeholder="Sort by"
          color="rgb(166, 166, 166)"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </Select>
        <Select
          w="10%"
          placeholder="Test Status"
          color="rgb(166, 166, 166)"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </Select>
        <CreateTestModal>
          <Button
            bg="rgb(132, 94, 242)"
            _hover={{ bg: "rgb(132, 94, 242)" }}
            color="white"
          >
            Create Test
          </Button>
        </CreateTestModal>
      </Box>
      <Box padding="30px">
        <Grid templateColumns="repeat(4, 1fr)" gap={20}>
          {test?.map((test, index) => (
            <GridItem
              w="100%"
              h="30vh"
              key={index}
              borderRadius="12px"
              overflow="hidden"
            >
              <TestCard test={test} />
            </GridItem>
          ))}
        </Grid>
        <Box w="100%" mt="1%" justifyContent="space-between" display="flex">
          <Text color="gray" fontSize="20px">
            {totalTest} Records
          </Text>
          <Box display="flex" alignItems="center">
            <Text color="gray" fontSize="20px">
              Page {page} of {totalPages}
            </Text>
            <Box display="flex" alignItems="center" gap="10px" justifyContent="center">
              <Box width="2%" cursor="pointer" onClick={handleBackPage}>
                <KeyboardBackspaceIcon htmlColor="gray" />
              </Box>
              <Box
                width="2%"
                ml="50%"
                cursor="pointer"
                onClick={hanldeNextPage}
              >
                <EastIcon htmlColor="gray" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TeacherTests;
