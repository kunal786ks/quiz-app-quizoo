import React, { useEffect, useState } from "react";
import "./UserAll.css"; // Import CSS file for styling
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Select,
  Text,
} from "@chakra-ui/react";
import SearchIcon from "@mui/icons-material/Search";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EastIcon from "@mui/icons-material/East";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";
import { useSelector } from "react-redux";
const UserAll = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(3);
  const [totalData, setTotalData] = useState(0);
  const [usersRecord, setUser] = useState([]);
  const token = useSelector((state) => state.user?.token);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8084/api/user/get-user-admin?limit=${limit}&page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res?.data?.users, "thsi is");
      const responsedData = res?.data?.users;
      setTotalPage(responsedData?.totalPages);
      setTotalData(responsedData?.totalRecords);
      setUser(responsedData?.records);
      setPage(parseInt(responsedData?.page, 10));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [limit, page]);

  useEffect(() => {
    setPage(1);
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);
  const handleBackPage = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };
  const hanldeNextPage = () => {
    if (page === totalPage) {
      return;
    }
    setPage(page + 1);
  };

  return (
    <Box h="92vh" display="flex" justifyContent="center">
      <Box padding="30px" mt="5%" className="user-table-container">
        <Box mb="1%" display="flex" alignItems="center" gap="20px">
          <InputGroup width="40%" size="lg" borderRadius="12px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon htmlColor="rgb(199, 199, 202)" />
            </InputLeftElement>
            <Input
              type="tel"
              placeholder="Search user by email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Box>
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>allow</th>
            </tr>
          </thead>
          {totalData > 0 ? (
            <tbody>
              {usersRecord?.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role === 0 ? "Student" : "Teacher"}</td>
                  <td>{user.allow}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr bg="red" width="100%">
                <Text>No data found</Text>
              </tr>
            </tbody>
          )}
        </table>

        <Box
          mt="1%"
          display="flex"
          justifyContent="space-between"
          w="100%"
          gap="20px"
        >
          <Box>{totalData} Records</Box>
          <Box display="flex" gap="20px">
            <Text fontSize="20px" color="gray">
              Page {page} of {totalPage}
            </Text>
            <Select
              w="100px"
              size="sm"
              onChange={(e) => {
                setPage(1);
                setLimit(e.target.value);
              }}
            >
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </Select>
            <Box display="flex" alignItems="center" gap="10px">
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

export default UserAll;
