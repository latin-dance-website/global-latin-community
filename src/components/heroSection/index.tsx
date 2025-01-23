import { Box, Button, Divider, Text, Link } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import { keyframes } from "@emotion/react";
import { MdAudiotrack, MdPublic, MdTrendingUp, MdLocalMall, MdOndemandVideo } from 'react-icons/md';

const colors = ["#FFD9DA", "#89023E"];
const colors2 = ["#C7D9B7", "#28AFB0", "#CC7178"];

const IconAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity:1;
  }
`;

const HeroSection = () => {
    return (
        <Box
            width= "100vw"
            minHeight= "360px"
            mt= "16px"
            p= "16px"
            // Updated background with linear gradient
            //background: "linear-gradient(135deg, #FFFFFF 0%, #FFD9DA 30%, #F63C80 60%, #A07ADC 100%)",
            py= '80px'
        >

            {/* Title Section */}
            <Box display= "flex" width="100%" height="100%" justifyContent= "space-between" alignItems= "center" px={{ base: '60px', md: '120px', lg: '132px' }} >
                <Box display= 'flex' flexDirection= 'column'>
                    <Text fontSize= "4rem" fontWeight= "600" flexWrap= "wrap"  fontFamily= 'Montserrat' marginBottom="-2rem">
                        The Latin Dance 
                    </Text>
                    <Text fontSize= "7rem" fontWeight= "800" flexWrap= "wrap" fontFamily= 'Montserrat' marginBottom="-2rem">
                        Revolution
                    </Text>
                    <Text fontSize= "4rem" fontWeight= "800" flexWrap= "wrap" fontFamily= 'Montserrat'>
                        Begins Here
                    </Text>
                    <Divider bgColor= '#07037C' height= '10px' width= '240px' marginBottom="2rem"/>
                    <Text fontSize= "1.5rem" fontWeight= "600" flexWrap= "wrap"  fontFamily= 'Montserrat' opacity={"0.7"}>
                        Get a 360 degree view of your dance
                    </Text>
                    <Text fontSize= "1.5rem" fontWeight= "600" flexWrap= "wrap"  fontFamily= 'Montserrat' opacity={"0.7"}>
                        journey with personalised insights & tools
                    </Text>
                    <Link href="/videoUpload">
                        <Button _hover={{opacity: 0.8, color: "white"}} textTransform= 'none' height= '64px' width= '240px' borderRadius= '12px' bg= 'linear-gradient(to right bottom, rgb(142, 163, 244), rgb(60, 113, 255))' mt= '64px'>
                            <Text fontSize= "1.5rem" fontWeight= "600" flexWrap= "wrap" fontFamily= 'Montserrat' color= '#fff'>Start Here</Text>
                        </Button>
                    </Link>
                </Box>
                <Box position="relative">
                    <Box display= 'flex' justifyContent= 'space-between' alignItems= 'center' marginLeft="1rem" border="5px solid white" borderRadius={"25px"}>
                        <Image src={"/assets/video.png"} width={'380px'} height={'520px'}  
                        style={{
                            border: "5px solid white", 
                        }} 
                        priority 
                        />
                    </Box>
                    <Box position="absolute" top="-10px" left="-100px"  animation={`${IconAnimation} 4s infinite`}>
                        <MdAudiotrack color="#3c71ff" size="100px"/>
                    </Box>
                    <Box position="absolute" top="200px" left="-200px"  animation={`${IconAnimation} 4s 1s infinite`}>
                        <MdPublic color="#3c71ff" size="70px"/>
                    </Box>
                    <Box position="absolute" top="500px" left="-300px"  animation={`${IconAnimation} 6s infinite`}>
                        <MdTrendingUp color="#3c71ff" size="100px"/>
                    </Box>
                    <Box position="absolute" top="200px" left="420px"  animation={`${IconAnimation} 4s 1s infinite`}>
                        <MdLocalMall color="#3c71ff" size="50px"/>
                    </Box>
                    <Box position="absolute" top="550px" left="420px"  animation={`${IconAnimation} 6s 1s infinite`}>
                        <MdOndemandVideo color="#3c71ff" size="50px" />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HeroSection;