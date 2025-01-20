import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";

const CommunitySection = () => {
    return (
        <Box
            bg= "linear-gradient(to right, #EDEDED 0%, rgba(133, 71, 230, 0.6) 100%)" // Updated gradient
            padding= {{ xs: "24px", sm: "40px" }}
            borderRadius= "16px"
            display= "flex"
            flexDirection= {{ xs: "column", md: "row" }}
            justifyContent= "space-between"
            alignItems= "center"
            gap= "24px"
            width= "100%"
            position= "relative"
            
        >
            {/* Text Content */}
            <Box maxWidth= "50%" padding="1rem">
                <Text
                    fontWeight= "600"
                    fontSize= '30px'
                    color= "#000" // Black text
                    marginBottom= "16px"
                    fontFamily= 'Montserrat'
                >
                    Become A Part Of Our Powerful Community
                </Text>
                <Text
                    fontSize= "14px"
                    color= "#333"
                    marginBottom= "24px"
                    fontFamily= 'Montserrat'
                >
                    Connect with professionals around the globe who share their knowledge, collaborate, and help each other grow.
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
            >
                <Box
                    as="img"
                    src="https://via.placeholder.com/150" // Replace with actual image
                    alt="Dancers"
                    width= "150px"
                    height= "100px" 
                    borderRadius= "8px"
                    objectFit= "cover"
                />
                <Box
                    as="img"
                    src="https://via.placeholder.com/150"
                    alt="Dancers"
                    width= "150px"
                    height= "100px" 
                    borderRadius= "8px"
                    objectFit= "cover"
                />
                <Box
                    as="img"
                    src="https://via.placeholder.com/150"
                    alt="Dancers"
                    width= "150px"
                    height= "100px" 
                    borderRadius= "8px"
                    objectFit= "cover"
                />
            </Box>

            {/* Gold Star Decoration */}
            <Box
                position= "absolute"
                right= "-30px"
                bottom= "-30px"
                width= "100px"
                height= "100px"
                background= "radial-gradient(circle, #E9B44C, #BF9000)"
                borderRadius= "50%"
                transform= "rotate(45deg)"
                clipPath= "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
            />
        </Box>
    );
};

export default CommunitySection;