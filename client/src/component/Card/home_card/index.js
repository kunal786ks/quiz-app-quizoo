import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

const HomePageCard = () => {
  const [test, setTest] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalTest, setTotalTest] = useState(null);
  const token = useSelector((state) => state.user?.token);
  const fetchData = async () => {
    try {
      console.log("he;;p");
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
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box height="100vh"> 
      <InfiniteScroll
        dataLength={test.length}
        next={fetchData}
        hasMore={test.length !== totalTest} // Check if items.length is not equal to results
        loader={<p>Loading.. eej.</p>}
        endMessage={<p>No more data to load.</p>}
      >
        <Box bg="red">
          <ol>
            {test.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ol>
        </Box>
      </InfiniteScroll>
    </Box>
  );
};

export default HomePageCard;
