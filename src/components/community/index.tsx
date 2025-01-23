import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";

const CommunitySection = () => {
    return (
        <Box
            bg= " #D6BCFA" // Updated gradient
            padding= {{ xs: "24px", sm: "40px" }}
            borderRadius= "16px"
            display= "flex"
            flexDirection= {{ xs: "column", md: "row" }}
            justifyContent= "space-between"
            alignItems= "center"
            gap= "24px"
            width= "fit-content"
            position= "relative"

            
        >
            {/* Text Content */}
            <Box  padding="1rem" paddingRight="-1rem">
                <Text
                    fontWeight= "800"
                    fontSize= '2rem'
                    color= "#000" // Black text
                    fontFamily= 'Montserrat'
                >
                    Join Our Global Community &
                </Text>
                <Text
                    fontWeight= "800"
                    fontSize= '2rem'
                    color= "#000" // Black text
                    fontFamily= 'Montserrat'
                >
                    Stay Updated
                </Text>
                <Text
                    fontSize= "14px"
                    color= "#333"
                    fontFamily= 'Montserrat'
                >
                    Connect with Latin dancers around the globe who share
                </Text>
                <Text
                    fontSize= "14px"
                    color= "#333"
                    marginBottom= "24px"
                    fontFamily= 'Montserrat'
                >
                    their knowledge, collaborate, and help each other grow.
                </Text>
                <Button
                backgroundColor="#fff"
                color="black" // Text color inside the button
                fontWeight="bold"
                padding="10px 20px"
                fontSize="1rem"
                borderRadius="8px"
                _hover={{ backgroundColor: "#333" }} // Hover effect
                textTransform="none"
                >
                    <Text fontSize= '16px' fontWeight= '600' color= '#000' fontFamily= 'Montserrat'>
                        Join Now
                    </Text>
                </Button>
            </Box>

            {/* Image Section */}
            <Box
                display= "flex"
                gap= "12px"
                flexWrap= "wrap"
                justifyContent= "center"
                alignItems="center"
            >
                <Box display="flex" flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                    <Box
                        as="img"
                        src="/assets/Dancer1.png" // Replace with actual image
                        alt="Dancers"
                        width= "130px"
                        height= "100px" 
                        objectFit= "cover"
                        marginY="2"
                        border="3px solid white"
                    />
                    <Box
                        as="img"
                        src="/assets/Dancer3.png"
                        alt="Dancers"
                        width= "90px"
                        height= "90px" 
                        objectFit= "cover"
                        marginBottom={"2"}
                        border="3px solid white"
                    />
                </Box>
                <Box
                    as="img"
                    src="/assets/Dancer2.png"
                    alt="Dancers"
                    width= "100px"
                    height= "150px" 
                    objectFit= "cover"
                    marginRight={"4"}
                    border="3px solid white"
                />
            </Box>

            {/* Gold Star Decoration */}
            {/* <Box
                position= "absolute"
                right= "-30px"
                bottom= "-30px"
                width= "100px"
                height= "100px"
                background= "radial-gradient(circle, #E9B44C, #BF9000)"
                borderRadius= "50%"
                transform= "rotate(45deg)"
                clipPath= "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
            /> */}
        </Box>
    );
};

export default CommunitySection;