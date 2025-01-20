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
            <Text fontFamily= 'Montserrat' fontSize= '40px' fontWeight= '600' textAlign="center">
                Share Your Dance Journey Here!
            </Text>
            <Divider background= '#9560E9' width= '240px' my= '16px'/>
            <Text fontFamily= 'Montserrat' fontSize= '14px' fontWeight= '500' mb= '40px'>
                500 user surveys...
            </Text>
            <SurveyBox />
            <CommunitySection />
        </Box>
    )
}

export default BottomSection;