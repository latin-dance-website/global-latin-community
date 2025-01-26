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
} from "@chakra-ui/react";
import {
  FaCloudUploadAlt,
  FaYoutube,
  FaInstagram,
  FaCheck,
  FaCheckCircle,
} from "react-icons/fa";
import { RiCheckFill, RiInstagramFill, RiYoutubeFill } from "react-icons/ri";

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

const Upload = () => {
  const [videoLink, setVideoLink] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [email, setEmail] = useState("");

  // Handle file upload
  const handleVideoUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoLink("");
      setShowThankYou(true);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (videoLink || videoFile) {
      setShowThankYou(true);
    }
  };

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

          {/* Submit Button with Gradient */}
          <Button
            rightIcon={<FaCheckCircle />}
            color="white"
            fontWeight="bold"
            px="1.5rem"
            py="1.5rem"
            bg="brand.purple"
            marginTop="2rem"
            onClick={handleSubmit}
            _hover={{
              opacity: "70%",
            }}
          >
            Submit Video For Analysis
          </Button>
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
          <Text as="h5" fontWeight="bold">
            Thank you!
          </Text>
          <Text fontSize="md" mb="2rem">
            Please enter your email to receive the report.
          </Text>
          <FormControl mb={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email here..."
              variant="outline"
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
            onClick={() => setShowThankYou(false)}
          >
            Submit
          </Button>
        </Box>
      )}
    </>
  );
};

export default Upload;
