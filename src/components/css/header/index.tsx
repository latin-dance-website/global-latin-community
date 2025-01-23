import React from "react";
import { Logo } from "@components/css";
import { Box, Text, Link, Hide } from "@chakra-ui/react";
import { FaWhatsapp, FaYoutube, FaInstagram } from "react-icons/fa";

const styles = {
  header: {
    fontSize: "20px",
    fontFamily: 'Mulish',
  },
  subHeader: {
    fontSize: "16px",
    fontFamily: 'Mulish'
  },
  headerBox: {}
}

export const Header: React.FC = () => {
  return (
    <Box 
      position="fixed"
      zIndex={20}
      top="0"
      display= 'flex' 
      justifyContent= 'space-between' 
      alignItems='center' 
      p= '16px' 
      px="2rem"  
      width= '100vw' 
      height="5rem" 
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(10px)"  
      borderRadius="10px"       
      border="1px solid rgba(255, 255, 255, 0.3)"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)">
      <Box display="flex">
        <Logo/>
        <Box marginLeft="2" textAlign={"center"}>
          <Text {...styles.header} fontWeight={"800"} marginBottom={"-1"}>GLOBAL LATIN</Text>
          <Text {...styles.subHeader} fontWeight={"600"}>DANCE COMMUNITY</Text>
        </Box>
      </Box>
      <Hide below="sm">
      <Box bg="white" display="flex" padding="0.5rem 2rem"  borderRadius={"15px"} alignItems={"center"}>
        <Hide below="md">
          <Text marginRight={"1rem"} fontSize={"1rem"} fontWeight={800} fontFamily={'Mulish'}>Reach Out To Us: </Text>
        </Hide>
        <Link href="https://wa.me/your_number" isExternal marginRight={"1rem"}>
          <FaWhatsapp size={30} color="#25D366"/>
        </Link>
        <Link href="https://www.youtube.com/your_channel" isExternal marginRight={"1rem"}>
          <FaYoutube size={30} color="#FF0000" />
        </Link>
        <Link href="https://www.instagram.com/your_profile" isExternal>
          <FaInstagram size={30} color="#E1306C" />
        </Link>
      </Box>
      </Hide>
    </Box>
  );
};
