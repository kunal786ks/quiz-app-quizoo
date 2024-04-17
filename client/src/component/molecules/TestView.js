import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const TestViewCard = ({ test }) => {
  const navigate=useNavigate();
  const handleViewTest=(testId)=>{
    navigate(`/home/view-test/${testId}`)
  }
  return (
    <Box w="50vw" h="50%" bg="rgb(230, 215, 255)" overflowY="hidden" cursor="pointer" onClick={()=>handleViewTest(test?._id)}borderRadius="12px" padding="20px" flexDir="column" display="flex" alignItems="center">
      <Box w="100%" h="50%" borderRadius="12px">
        {/* <img src={`${process.env.REACT_APP_API_HOST_KEY}${test?.owner.pic}`} style={{ width: "100%", height: "300px", borderRadius: "12px" }} /> */}
        {/* image if neccessary of the data of the app*/}
        <Box
          h="300px"
          w="100%"
          bg="lightgray"
          borderRadius="12px"
          padding="20px"
          display="flex"
        >
          <Box w="50%" h="100%">
            <Text fontSize="20px" color="rgb(135, 129, 153)">Title: {test?.title ? test?.title.charAt(0).toUpperCase() + test?.title.slice(1) : "Test"}</Text>
            <Text fontSize="15px" color="rgb(135, 129, 153)">Subject: {test?.testCategory ? test?.testCategory.charAt(0).toUpperCase() + test?.testCategory.slice(1) : "Subject"}</Text>
            <Box mt="2%">
              <Text color="gray">Total Time :{test?.time_to_finish}</Text>
              <Text color="gray">Maximum Marks :{test?.MaximumMarks}</Text>
              <Text color="gray">Passing Marks :{test?.passingMarks}</Text>
            </Box>

          </Box>
          <Box w="50%" h="100%">
            <Text fontSize="20px" color="gray">Test Instructions</Text>
            {test?.instruction.slice(0, 6).map((instruction, index) => (
              <Text key={index} fontSize="15px" width="100%" whiteSpace="no wrap" overflow="hidden" textOverflow="ellipsis" color="rgb(135, 129, 153)">
                {index + 1}: {instruction}
              </Text>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        padding="20px"
        bg="rgb(249, 249, 249)"
        borderRadius="12px"
        transform="translateY(30px)"
        zIndex="100"
        height="100px"
        mb="2%"
        w="95%"
        position="relative"
        marginTop="-100px">
        <Box display="flex" alignItems="center" gap="20px" >
          <Avatar src={`${process.env.REACT_APP_API_HOST_KEY}${test?.owner.pic}`} size="lg" />
          <Box>
            <Text fontSize="20px" color="gray">{test?.owner?.name ? test.owner.name.charAt(0).toUpperCase() + test.owner.name.slice(1) : ""}</Text>
            <Text color="gray" font>{test?.owner?.email}</Text>
          </Box>
        </Box>
      </Box>

    </Box>
  )
}

export default TestViewCard
