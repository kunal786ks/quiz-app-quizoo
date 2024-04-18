import { Box } from '@chakra-ui/react'
import React from 'react'

const TestCard = ({test}) => {
  return (
    <Box h="100%" w="100%" bg="rgb(240, 216, 255)" cursor="pointer" padding="20px">
      {test.title}
    </Box>
  )
}

export default TestCard
