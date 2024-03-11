import { Avatar, Box,Badge, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from '../context/chatProvider';
import ProfileModal from './profileModal';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { REACT_SERVER_URL } from "../config/env";
import ChatLoading from './ChatLoading';
import UserListItem from './UserAvatar/UserListItem';
import { getSender } from './miscellaneous/ChatLogics';



const SideDrawer = () => {

  const [search, setSearch] = useState('');
  const [searchResult, setsearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingchat, setLoadingchat] = useState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { user,setSelectedChat,chats,setChats,notification,setNotification } = ChatState();
  const toast = useToast();
  function logout() {
    localStorage.clear();
    navigate('/');
  }

  const handleSearch =async()=>{
    if(!search){
      toast({
        title:"Please enter something in search",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:'bottom-left'
      });
      return;
    }
    try {
      setLoading(true);
      const config ={
        headers:{
            Authorization: `Bearer ${user.token}`,   
        },
      };
      const { data } = await axios.get(
        `${REACT_SERVER_URL}/api/user?search=${search}`,
        config
      );
      setLoading(false);
      setsearchResult(data);
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position:"bottom-left",
      });
    }
  }

  const accessChat = async(userId)=>{
    try {
        setLoadingchat(true);
       const config = {
         headers: {
            "Content-type":"application/json",
           Authorization: `Bearer ${user.token}`
         },
       }
       const { data } = await axios.post(
         `${REACT_SERVER_URL}/api/chats`,
         { userId },
         config
       );
       if(!chats.find((c)=>c._id === data._id)){
        setChats([data, ...chats]);
       }
       console.log(data);
       setLoadingchat(false);
       setSelectedChat(data);
       onClose();
    } catch (error) {
      toast({
        title: "Error fetching chat",
        description:error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }
  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <FaSearch />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search user
            </Text>
          </Button>
        </Tooltip>
        <Text
          textAlign="center"
          fontSize="2xl"
          fontFamily="work sans"
          whiteSpace="nowrap"
        >
          Iv chat
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
              {notification.length > 0 && (
                <Badge
                  bg="secondary"
                  fontSize="xs"
                  borderRadius="full"
                  ml={-2}
                  mb={5}
                  backgroundColor="red"
                  color="white"
                >
                  {notification.length}
                </Badge>
              )}
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "NO New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New message in ${notif.chat.chatName} `
                    : `New message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>

            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Flex>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by email or name"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((users) => (
                <UserListItem
                  key={users._id}
                  users={users}
                  handleFunction={() => accessChat(users._id)}
                />
              ))
            )}
            {loadingchat && <Spinner ml="auto" d="flex"></Spinner>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
