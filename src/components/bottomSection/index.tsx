import CommunitySection from "@components/community";
import SurveyBox from "@components/insights";
import { Box, Divider, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

const BottomSection = () => {
    return (
        <Box py= '64px' px="2rem" display= 'flex' flexDirection= 'column' alignItems= 'center' position= 'relative' width="100vw">
            <Box position= 'absolute' left= '24px' top= '48px' opacity="0.3">
                <Image src={'/assets/star.png'} height={'160px'} width={'160px'}/>
            </Box>
            <Text fontFamily= 'Montserrat' fontSize= '3rem' fontWeight= '800' textAlign="center">
                Share Your Dance Journey With Us!
            </Text>
            <Divider
                bgColor= "#07037C"
                my= "8px"
                height= "5px"
                width= "300px"
                alignSelf= "center"
            />
            <Text fontFamily= 'Montserrat' fontSize= '1.2rem' fontWeight= '500' mb= '40px' opacity={0.6}>
                500+ International Dancers Surveyed | 300+ Interviewed | Now its your time...
            </Text>
            <SurveyBox />
            <CommunitySection />
        </Box>
    )
}

export default BottomSection;