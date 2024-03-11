import React from "react";
import { ChatState } from "../context/chatProvider.js";
import { Box } from "@chakra-ui/react";
import SideDrawer from "./SideDrawer";
import Mychats from "./Mychats.js";
import { useState } from "react";

import Chatbox from "./Chatbox.js";

const Chatpage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        <Box>{user && <Mychats fetchAgain={fetchAgain}/>}</Box>
        {user && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  );
};

export default Chatpage;
