import React from "react";
import { Logo } from "@components/css";
import { Box, Text } from "@chakra-ui/react";

const styles = {
  header: {
    fontSize: "32px",
    fontFamily: 'Mulish'
  },
  subHeader: {
    fontSize: "24px",
    fontFamily: 'Mulish'
  },
  headerBox: {}
}

export const Header: React.FC = () => {
  return (
    <Box display= 'flex' justifyContent= 'flex-start' p= '16px'  width= '100%' ml= '16px'>
      <Logo />
      <Box>
        <Text {...styles.header}>GLOBAL LATIN</Text>
        <Text {...styles.subHeader}>DANCE COMMUNITY</Text>
      </Box>
    </Box>
  );
};
