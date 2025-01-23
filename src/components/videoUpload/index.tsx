import React, { useState } from "react";
import { Box, Button, Text, Input, FormControl, FormLabel, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaCloudUploadAlt, FaYoutube, FaInstagram } from "react-icons/fa";

type FileUploadProps = {
    videoFile: File | null;
    handleVideoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ videoFile, handleVideoUpload }) => {
    return (
        <Box display= "flex" alignItems= "center" width= "100%" border= "1px solid #ccc" borderRadius= "8px" overflow= "hidden">
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
                bg= "#9747FF"
                color= "white"
                textTransform= "none"
                fontWeight= "bold"
                borderRadius= "0 8px 8px 0"
                px="20px"
                py="12px"
                _hover={{ bg: "#843CE5" }}
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

const VideoUpload = () => {
    const [videoLink, setVideoLink] = useState("");
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [showThankYou, setShowThankYou] = useState(false);
    const [email, setEmail] = useState("");

    // Handle file upload
    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width= "700px" pr="5rem" pl="1rem" boxShadow="sm">
            {/* Upload Box */}
            {!showThankYou ? (
                <Box
                    p={4}
                    borderRadius={"10px"}
                    width="500px"
                    textAlign="center"
                    bg="#c5a1f7"
                    boxShadow="20px 20px 10px rgba(0, 0, 0, 0.1)"
                    marginLeft={"1rem"}
                    border="2px solid white"
                >
                    <Text fontWeight="800" fontFamily="Montserrat" fontSize="1.5rem" color="white" mb={2}>
                        Upload Your Video
                    </Text>

                    {/* Video Link Input */}
                    {/* <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        placeholder="Paste your video link here"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon as={FaInstagram} color="secondary" mx="0.5rem"/>
                                    <Icon as={FaYoutube} color="error" />
                                </InputAdornment>
                            ),
                        }}
                    /> */}
                    <FormControl mb={4}>
                        {/* <FormLabel htmlFor="videoLink">Video Link</FormLabel> */}
                        <InputGroup>
                            <Input
                            id="videoLink"
                            value={videoLink}
                            onChange={(e) => setVideoLink(e.target.value)}
                            placeholder="Paste your video link here"
                            variant="outline"
                            color="white"
                            _placeholder={{ color: 'white' }} 
                            />
                            <InputRightElement>
                            <FaInstagram color="#fff" size="40px"/>
                            <FaYoutube color="#fff" size="40px" style={{ marginLeft: '0.5rem', marginRight: "0.5rem" }}/>
                            </InputRightElement>
                        </InputGroup>
                        </FormControl>

                    <Text fontSize="sm" color="textSecondary" my={1}>
                        or
                    </Text>

                    {/* File Upload Button */}
                    <FileUpload videoFile={videoFile} handleVideoUpload={handleVideoUpload} />

                    {/* Submit Button with Gradient */}
                    <Button
                        width="100%"
                        textTransform="none"
                        // bgGradient="linear(180deg, #A6C8FF 0%, #6587FF 100%)"
                        color="white"
                        fontWeight="bold"
                        borderRadius="16px"
                        px="20px"
                        py="12px"
                        bg="#843CE5"
                        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.15)"
                        _hover={{
                        // bgGradient: "linear(180deg, #8DB9FF 0%, #5175FF 100%)",
                        boxShadow: "0px 5px 12px rgba(0, 0, 0, 0.2)",
                        }}
                        mt="24px" 
                        onClick={handleSubmit}
                    >
                        Submit Video for Analysis
                    </Button>
                </Box>
            ) : (
                // Thank You Box (Replaces Upload Box)
                <Box
                    bgColor="white"
                    p={4}
                    borderRadius={3}
                    boxShadow={3}
                    width="100%"
                    textAlign="center"
                >
                    <Text as="h5" fontWeight="bold">
                        Thank you!
                    </Text>
                    <Text fontSize="md" mb="2rem">
                        Please enter your email to receive the report.
                    </Text>
                    {/* <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        placeholder="Enter your email here..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /> */}
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
                    {/* Submit Email Button (Same Gradient) */}
                    <Button
                        width="100%"
                        textTransform="none"
                        // bgGradient="linear(180deg, #A6C8FF 0%, #6587FF 100%)"
                        color="white"
                        fontWeight="bold"
                        borderRadius="16px"
                        px="20px"
                        py="12px"
                        boxShadow= "0px 4px 10px rgba(0, 0, 0, 0.15)"
                        _hover={{
                            // bgGradient: "linear(180deg, #8DB9FF 0%, #5175FF 100%)",
                            boxShadow: "0px 5px 12px rgba(0, 0, 0, 0.2)",
                        }}
                        mt="24px"
                        onClick={() => setShowThankYou(false)}
                    >
                        Submit
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default VideoUpload;