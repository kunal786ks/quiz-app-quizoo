import { Box, CircularProgress, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import TestViewCard from "../../molecules/TestView";

const HomePageCard = () => {
  const [test, setTest] = useState([]);
  const [page, setPage] = useState(1);
  const [totalTest, setTotalTest] = useState(null);
  const token = useSelector((state) => state.user?.token);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8084/api/test/get-test?page=${page}&limit=4`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTest([...test, ...response.data.tests.records]);
      setPage(page + 1);
      setTotalTest(response.data.tests.totalRecords); // Set total results from response
    } catch (error) { }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box className="demo-text" height="100vh">
      <InfiniteScroll
       style={{
        overflowY:"hidden"
       }}
        dataLength={test.length}
        next={fetchData}
        hasMore={test.length !== totalTest}
        loader={<Box w="100%" alignItems="center" justifyContent="center" display="flex" padding="20px"><CircularProgress isIndeterminate color="blue"/></Box>}
        endMessage={<Box w="100%" alignItems="center" justifyContent="center" display="flex" padding="20px"><Text color="gray" fontSize="20px">
          .... No more Data ....</Text></Box>}
      >
        <Box display="flex" alignItems="center" w="100%" justifyContent="center" >
          <ol>
            {test.map((item, index) => (
              <Box key={index} w="100%" padding="20px" >
                <TestViewCard test={item} />
              </Box>
            ))}
          </ol>
        </Box>
      </InfiniteScroll>
    </Box>
  );
};

export default HomePageCard;