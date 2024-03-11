import React from 'react';
import { ChatState } from '../context/chatProvider';
import { Box } from '@chakra-ui/react';
import SingleChats from './SingleChats';

const Chatbox = ({ fetchAgain, setFetchAgain}) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="5px"
      borderWidth="2px"
    >
      <SingleChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </Box>
  );
};

export default Chatbox;
