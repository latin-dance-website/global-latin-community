import { Box, Button, Divider, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

const colors = ["#FFD9DA", "#89023E"];
const colors2 = ["#C7D9B7", "#28AFB0", "#CC7178"];

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
            <Box display= "flex" justifyContent= "space-between" alignItems= "center" px={{ base: '60px', md: '120px', lg: '132px' }} >
                <Box textAlign= 'center' display= 'flex' flexDirection= 'column' alignItems= 'center'>
                    <Text fontSize= "36px" fontWeight= "600" flexWrap= "wrap"  fontFamily= 'Montserrat'>
                        The Latin Dance 
                    </Text>
                    <Text fontSize= "36px" fontWeight= "600" flexWrap= "wrap" fontFamily= 'Montserrat'>
                        Revolution Begins Here
                    </Text>
                    <Divider bgColor= '#07037C' my= "24px" height= '4px' width= '240px' alignSelf= 'center'/>
                    <Text fontSize= "16px" fontWeight= "500" flexWrap= "wrap"  fontFamily= 'Montserrat'>
                        Get a 360-degree of your dance journey!
                    </Text>
                    <Button textTransform= 'none' height= '64px' width= '240px' borderRadius= '12px' background= 'linear-gradient(to bottom, rgba(237, 237, 237, 0.8) 0%, rgba(60, 113, 255, 0.8) 100%)' mt= '64px'>
                        <Text fontSize= "16px" fontWeight= "600" flexWrap= "wrap" fontFamily= 'Montserrat' color= '#fff'>Start Here</Text>
                    </Button>
                </Box>
                <Box display= 'flex' justifyContent= 'space-between' alignItems= 'center' marginLeft="1rem">
                    <Image src={"/assets/video.png"} width={'400px'} height={'540px'} priority />
                </Box>
            </Box>
        </Box>
    );
};

export default HeroSection;