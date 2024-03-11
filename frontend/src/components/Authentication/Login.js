import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import Loading from "../Loading";
import axios from "axios";
import { REACT_SERVER_URL } from "../../config/env.js";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
    const [loadingGuest, setLoadingGuest] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);
  const submitHandler = async() => {
   setLoading(true);
   if (!email || !password ) {
     toast({
       title: "Invalid username/password",
       status: "warning",
       duration: 5000,
       isclosable: true,
       position: "bottom",
     });
     setLoading(false);
     return;
   }
   try {
    const config = {
      headers:{
        "Content-type":"application/json",
      },
    }
    const {data} = await axios.post(
     `${REACT_SERVER_URL}/api/user/login`,
      {email,password},
      config
    );
     toast({
       title: "Successfully signedin",
       status: "success",
       duration: 5000,
       isclosable: true,
       position: "bottom",
     });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate('/chat');
   } catch (error) {
    toast({
      title: "Error Occurred",
      description: error.response.data.message,
      status: "error",
      duration: 5000,
      isClosable: "true",
      position: "bottom",
    });
    setLoading(false);
   }
  };

  const Guestuser =()=>{
    setLoadingGuest(true);
    const Guestdata = {
      name: "Guest User",
      email: "guest@gmail.com",
      pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    };
    localStorage.setItem("userInfo", JSON.stringify(Guestdata));
    navigate('/chat');
  }

  return (
    <VStack>
      <FormControl id="L_Email" isRequired>
        <FormLabel>Email:</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="L_Password" isRequired>
        <FormLabel>Password:</FormLabel>
        <InputGroup size="md">
          <Input
            placeholder="Enter Your Password"
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        {loading ? <Loading /> : "Login"}
      </Button>
      <Button
        colorScheme="orange"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={Guestuser}
      >
        {loadingGuest ? <Loading /> : "Login as Guest User"}
      </Button>
    </VStack>
  ); 
  
};

export default Login;
