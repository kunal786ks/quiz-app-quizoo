import { Box, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectMenu } from "../../feature/user/userSlice";

const ProfileMenu = () => {
  const selectedMenuItem = useSelector((state) => state?.user?.selectedMenu);
    
  const userMenu = [
    {
      label: "Your Information",
      path: "/home/profile/user-info",
    }
    //add the other options according to ur need
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (path, index) => {
    console.log(path);
    dispatch(selectMenu(index));
    navigate(`${path}`)
  };

  return (
    <Box h="92vh" display="flex" padding="30px" flexDir="column" gap="10px">
      {userMenu.map((menu, index) => (
        <Text
          key={index}
          fontSize="25px"
          bg={
            selectedMenuItem === index
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

export default ProfileMenu;
