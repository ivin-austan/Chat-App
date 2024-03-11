import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from 'react'
import { ChatState } from '../context/chatProvider';
import axios from 'axios';
import { REACT_SERVER_URL } from "../config/env";
import UserListItem from './UserAvatar/UserListItem';
import UserBadgeItem from './UserAvatar/UserBadgeItem';

const GroupModelChat = ({children}) => {
    
      const { isOpen, onOpen, onClose } = useDisclosure();
      const [groupChatName,setGroupChatName] = useState();
      const [selectedusers, setSelectedUsers] = useState([]);
      const [search,setSearch] = useState('');
      const [searchResult,setSearchResult] = useState([]);
      const [loading,setLoading] = useState(false);

      const toast = useToast();

      const { user, chats, setChats } = ChatState();

      const handleSearch = async(query)=>{
        setSearch(query);
        if(!query){
            return;
        }

        try {
            setLoading(true);
               const config = {
           headers: {
             Authorization: `Bearer ${user.token}`,
           },
         };
         const { data } = await axios.get(
           `${REACT_SERVER_URL}/api/user?search=${search}`,
           config
         );
         setLoading(false);
         setSearchResult(data);
        } catch (error) {
          toast({
            title: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
        }
      }

      const handleSubmit = async() => {
        if(!groupChatName || !selectedusers){
          toast({ 
            title:"Please fill the required fields",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"top"
          })
          return;
        }
        try {
           const config = {
             headers: {
               Authorization: `Bearer ${user.token}`,
             },
           };

           const { data } =  await axios.post(
             `${REACT_SERVER_URL}/api/chats/group`,
             {
               name: groupChatName,
               users: JSON.stringify(selectedusers.map((u) => u._id)),
             },
             config
           ); 
           setChats([data,...chats]);
           onClose();
           toast({
            title:"New Group Chat Created",
            status:"success",
            duration:5000,
            isClosable:true,
            position:"bottom"
           })
        } catch (error) {
            toast({
              title: "Failed to create the group chat",
              description:error.response.data,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
        }
      };

      const handleDelete = (deluser) => {

        setSelectedUsers(
          selectedusers.filter((selected) => selected._id !== deluser._id)
        );

      }

      const handleGroup = (userToAdd) => {
        if(selectedusers.includes(userToAdd)){
          toast({
            title:"User Already Added",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"top",
          });
          return;
        }
        setSelectedUsers([...selectedusers, userToAdd]);
      };
     

  return (
    <div>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="work sans"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: Ivin, Austan "
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedusers.map((u) => (
                <UserBadgeItem
                  key={user._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              <div>loading</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    users={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default GroupModelChat;