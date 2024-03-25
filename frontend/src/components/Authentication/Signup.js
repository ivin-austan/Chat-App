import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from 'axios';
import React from "react";
import { REACT_SERVER_URL } from "../../config/env.js";
import Loading from "../Loading.js";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [show, setShow] = useState(false);
  const [showc, setShowc] = useState(false);
  const [loading,setLoading] = useState(false);
  const toast = useToast();

  const cloudName = "dxhpxvyih";
  const handleClick = () => setShow(!show);
  const handleClickc = () => setShowc(!showc);
  
  const handleFileUpload = async (e) => {
    const pic = e.target.files[0];

    if(pic === undefined){
      toast({
        title:"please select an image",
        status:"warning",
        duration:5000,
        isclosable: true,
        position:"bottom",
      });
      return;
    }
    if (pic) {
      try {
        const formData = new FormData();
        formData.append("file", pic);
        formData.append("upload_preset", "techno_computers");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.secure_url;
          setPic(imageUrl);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    else{
       toast({
         title: "please select an image",
         status: "warning",
         duration: 5000,
         isclosable: true,
         position: "bottom",
       });
    }
  };

  const submitHandler = async() => {
    setLoading(true);
    if(!name || !email || !password || !confirmpassword){
      toast({
        title: "please fill the mandatory fields",
        status: "warning",
        duration: 5000,
        isclosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    else if (password !== confirmpassword) {
      toast({
        title: "Please verify the confirm password",
        status: "warning",
        duration: 5000,
        isclosable: true,
        position: "bottom",
      });
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        };
        const { data } = await axios.post(
          `${REACT_SERVER_URL}/api/user`,
          {
            name,
            email,
            password,
            pic,
          },
          config
        );
        toast({
          title: "Registration is successfull",
          status: "success",
          duration: 5000,
          isclosable: true,
          position: "bottom",
        });
       localStorage.setItem('userInfo',JSON.stringify(data));
       setLoading(false);
      } catch (error) {
        toast({
          title:"Error Occurred",
          description: error.response.data.message,
          status:"error",
          duration: 5000,
          isClosable:"true",
          position:"bottom",
        });
        setLoading(false);
      }
    }
  };
  return (
    <VStack>
      <FormControl id="First-Name" isRequired>
        <FormLabel>Name:</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="Email" isRequired>
        <FormLabel>Email:</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="Password" isRequired>
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
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password:</FormLabel>
        <InputGroup size="md">
          <Input
            placeholder="Enter Your Password"
            type={showc ? "text" : "password"}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClickc}>
              {showc ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={handleFileUpload}
        ></Input>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        {loading ? <Loading /> : "Signup"}
      </Button>
    </VStack>
  );
};

export default Signup;
