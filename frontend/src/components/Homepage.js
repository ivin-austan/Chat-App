import React, { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import { useNavigate } from "react-router-dom";

const Homepage = () => {

const navigate = useNavigate();

localStorage.clear();
   useEffect(() => {
     const userinfo = JSON.parse(localStorage.getItem("userinfo"));
     if (userinfo) {
       navigate("/chats");
     }
   }, [navigate]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="1g"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" textAlign="center">
          Iv chat
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="1g" borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{<Login />}</TabPanel>
            <TabPanel>{<Signup />}</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
