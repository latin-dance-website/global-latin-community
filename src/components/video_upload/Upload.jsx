import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  VStack,
  Icon,
  HStack,
  useToast
} from "@chakra-ui/react";
import {
  FaCloudUploadAlt,
  FaYoutube,
  FaInstagram,
  FaCheck,
  FaCheckCircle,
} from "react-icons/fa";
import { RiCheckFill, RiInstagramFill, RiYoutubeFill } from "react-icons/ri";
import { emailList } from "../../../public/assets/emailList";

const FileUpload = ({ videoFile, handleVideoUpload }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      border="1px solid #ccc"
      borderRadius="8px"
      overflow="hidden"
    >
      <Input
        isReadOnly
        value={videoFile ? videoFile.name : ""}
        placeholder="Upload a file"
        variant="outline"
        borderRadius="8px 0 0 8px"
        background="white"
        _readOnly={{
          cursor: "not-allowed",
        }}
      />
      <Button
        as="label"
        bg="brand.purple"
        color="white"
        textTransform="none"
        fontWeight="bold"
        borderRadius="0 8px 8px 0"
        px="20px"
        py="12px"
        _hover={{ bg: "#843CE5", cursor: "pointer" }}
        leftIcon={<FaCloudUploadAlt />}
      >
        Browse
        <input
          type="file"
          accept="video/*"
          hidden
          onChange={handleVideoUpload}
        />
      </Button>
    </Box>
  );
};

const Upload = ({isToastVisible, setIsToastVisible}) => {
  const [videoLink, setVideoLink] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const allowedEmailList= emailList;

  // Handle file upload
  const handleVideoUpload = (event) => {
    const file = event.target.files?.[0];
    const maxFileSize = 200 * 1024 * 1024;
    if (file && file.size <= maxFileSize) {
      setVideoFile(file);
      setVideoLink("");
      setShowThankYou(true);
    }else if(file && file.size > maxFileSize){
      setIsToastVisible(true);
      toast({
        title: 'File too large.',
        description: 'The file size must be less than 200MB.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top",
        onCloseComplete: () => setIsToastVisible(false)
      });
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (videoLink || videoFile) {
      setShowThankYou(true);
    }
  };

  const handleFullSubmit = async() => {
    // if(allowedEmailList.includes(email)){
    if (!email || !email.includes("@")) {
      setIsToastVisible(true);
          toast({
            title: "Enter Email Address",
            description: "Please enter valid email address.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
            onCloseComplete: () => setIsToastVisible(false)
          });
    }else{
      const tempEmail = email.toLowerCase();
      setIsLoading(true);
      try {
        if(videoLink){
          let response;
          if(allowedEmailList.includes(tempEmail)){
            response = await fetch(
            "https://s356o5gg2kfik723dpxbqrb2da0wahnn.lambda-url.ap-south-1.on.aws/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                metadata: { email: tempEmail, link:videoLink, emailInList:true, event: "linkUpload"}
              }),
            }
          );
        }else{
            response = await fetch(
              "https://s356o5gg2kfik723dpxbqrb2da0wahnn.lambda-url.ap-south-1.on.aws/",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  metadata: { email: tempEmail, link:videoLink, emailInList:false, event: "linkUpload"}
                }),
              }
            );
        }

          if (response.ok) {
            setIsToastVisible(true)
            if(allowedEmailList.includes(tempEmail)){
              toast({
                title: "Upload Successful!",
                description: "You will get the report soon!!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
                onCloseComplete: () => setIsToastVisible(false)
              });
            }else{
              toast({
                title: "Thank You for Sharing!",
                description: "We’re granting access to our early bird registrants. You’ve been added to the waitlist, and your report card will be available soon.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position:"top",
                onCloseComplete: () => setIsToastVisible(false)
              });
            }
            setVideoLink("");
            setShowThankYou(false); 
          } else {
            const errorData = await response.json();
            setIsToastVisible(true);
            toast({
              title: "Error",
              description: errorData.message || "Something went wrong.",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top",
              onCloseComplete: () => setIsToastVisible(false)
            });
            setVideoLink("");
            setShowThankYou(false); 
          }
        }else if(videoFile){
          // First fetch: Get signed URL
          let response;
          if(allowedEmailList.includes(tempEmail)){
              response = await fetch('https://s356o5gg2kfik723dpxbqrb2da0wahnn.lambda-url.ap-south-1.on.aws/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                metadata: { email: tempEmail, emailInList:true, event:"fileUpload" }
              })
            });
          }else{
            response = await fetch('https://s356o5gg2kfik723dpxbqrb2da0wahnn.lambda-url.ap-south-1.on.aws/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                metadata: { email: tempEmail, emailInList:false, event:"fileUpload" }
              })
            });
          }
    
        const data = await response.json();
        // console.log('Success:', data);
    
        // Prepare form data for the signed URL
        const formData = new FormData();
        Object.keys(data.signedURL.fields).forEach((key) => {
          if (key !== 'acl') {
            formData.append(key, data.signedURL.fields[key]);
          }
        });
        formData.append('file', videoFile);
    
        // Second fetch: Upload the file using the signed URL
        const uploadResponse = await fetch(data.signedURL.url, {
          method: 'POST',
          body: formData
        });
    
        if (uploadResponse.ok) {
          console.log('Upload successful', uploadResponse.status);
          const publicAccessURL = data.signedURL.url + data.signedURL.fields.key;
          console.log('Public-access-url:', publicAccessURL);
          setIsToastVisible(true);
          if(emailList.includes(tempEmail)){
            toast({
              title: "Upload Successful!",
              description: "You will get the report soon!!",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
              onCloseComplete: () => setIsToastVisible(false)
            });
          }else{
            toast({
              title: "Thank You for Sharing!",
              description: "We're granting access to our early bird registrants. You've been added to the waitlist, and your report card will be available soon.",
              status: "success",
              duration: 5000,
              isClosable: true,
              position:"top",
              onCloseComplete: () => setIsToastVisible(false)
            });
          }
          setVideoFile(null)
          setShowThankYou(false);
        } else {
          console.error('Error in uploading file:', uploadResponse.status);
          setIsToastVisible(true);
          toast({
            title: "Upload Issue",
            description: "Server Issue",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
            onCloseComplete: () => setIsToastVisible(false)
          });
          setVideoFile(null)
          setShowThankYou(false);
        }
        }
      } catch (error) {
        console.error('Error:', error);
        setIsToastVisible(true);
        toast({
          title: "Error",
          description: "Server Problem",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
          onCloseComplete: () => setIsToastVisible(false)
        });
        setVideoFile(null)
        setVideoLink("")
        setShowThankYou(false);
        setEmail("");
      }finally {
        setIsLoading(false);
        setVideoFile(null)
        setVideoLink("")
        setShowThankYou(false);
        setEmail("");
      }
    }
  }

  return (
    <>
      {!showThankYou ? (
        <VStack
          gap={{ base: "0.75rem", md: "1rem" }}
          px={{ base: "1rem", md: "3rem" }}
          py={"2rem"}
          borderRadius={"0.75rem"}
          textAlign="center"
          bg="white"
          color="white"
          width={{ md: "100%", lg: "100%", xl: "80%", "2xl": "70%" }}
          borderStyle={{ base: "solid", md: "solid", xl: "none" }}
          borderWidth={{ base: "0.1rem" }}
          borderColor="blackAlpha.300"
        >
          <Text
            fontWeight="600"
            fontFamily="Montserrat"
            fontSize={{ base: "1.5rem", md: "2rem" }}
            color="black"
          >
            Upload Your Video
          </Text>
          <Box
            height="0.2rem"
            width="10rem"
            borderRadius={"1rem"}
            backgroundColor={"brand.purple"}
            alignSelf="center"
            mb={"2rem"}
          />
          <FormControl>
            <HStack>
              <Input
                id="videoLink"
                width="80%"
                position="relative"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                placeholder="Paste your video link here"
                variant="filled"
                color="black"
                _placeholder={{ color: "black.100" }}
              />
              <Icon
                as={RiInstagramFill}
                fontSize="1.5rem"
                color="brand.pink"
                background="white"
              />
              <Icon
                as={RiYoutubeFill}
                background="white"
                fontSize="1.5rem"
                color="red"
              />
            </HStack>
          </FormControl>

          <Text
            fontSize={{ base: "0.8rem", sm: "1rem" }}
            color="blackAlpha.700"
            fontFamily="MontserratAlt"
            my={1}
          >
            OR
          </Text>

          {/* File Upload Button */}
          <FileUpload
            videoFile={videoFile}
            handleVideoUpload={handleVideoUpload}
          />
          <Text color="gray.500">Max File Size: 200MB</Text>

          {/* Submit Button with Gradient */}
          <Button
            rightIcon={<FaCheckCircle />}
            color="white"
            fontWeight="bold"
            px="1.5rem"
            py="1.5rem"
            bg="brand.purple"
            marginTop="0rem"
            onClick={handleSubmit}
            _hover={{
              opacity: "70%",
            }}
          >
            Submit Video For Analysis
          </Button>
          <Text color="gray.500">*Your uploaded video files are securely stored in a protected environment, with encryption and access control measures in place to ensure privacy and security.</Text>
        </VStack>
      ) : (
        // Thank You Box (Replaces Upload Box)
        <Box
          bgColor="white"
          p={4}
          borderRadius={"0.75rem"}
          width={{ md: "100%", lg: "100%", xl: "80%", "2xl": "70%" }}
          height="100%"
          textAlign="center"
          fontFamily="montserrat"
        >
          <Text fontSize="lg" fontWeight="bold">
            Thank you!
          </Text>
          <Text fontSize="lg" mb="2rem">
            Please enter your email to receive the report.
          </Text>
          <FormControl mb={4} isRequired>
            {/* <FormLabel htmlFor="email" fontSize={"xl"} pl={4}>Email</FormLabel> */}
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email here..."
              variant="outline"
              type="email"
              isRequired
            />
          </FormControl>
          <Button
            textTransform="none"
            rightIcon={<FaCheckCircle />}
            color="white"
            fontWeight="bold"
            borderRadius="0.5rem"
            px="1.5rem"
            py="1.5rem"
            bg="brand.purple"
            isLoading={isLoading}
            onClick={handleFullSubmit}
          >
            Submit
          </Button>
        </Box>
      )}
    </>
  );
};

export default Upload;
