import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminMenu = () => {
    const [selectItem,setSelectedItem]=useState(0);
    const navigate=useNavigate();
  const admin = [
    {
      label: "Website Users",
      path: "/home/admin/all-users",
    },
    {
        label: "All Tests",
        path: "/home/admin/all-test",
      },
  ];
  const handleClick = (path, index) => {
    setSelectedItem(index)
    navigate(`${path}`)
  };
  return (
    <Box
      h="92vh"
      display="flex"
      padding="30px"
      flexDir="column"
      gap="10px"
    >
        {admin.map((menu, index) => (
        <Text
          key={index}
          fontSize="25px"
          cursor="pointer"
          bg={
            selectItem === index
              ? "gray"
              : "linear-gradient(to left, gray,lightgray)"
          }
          h="8%"
          width="100%"
          color="white"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="12px"
          _hover={{ bg: "gray" }}
          onClick={() => handleClick(menu?.path, index)}
        >
          {menu.label}
        </Text>
      ))}
    </Box>
  );
};

export default AdminMenu;
