import React from "react";
import { Logo } from "@components/css";
import { Box, Typography } from "@mui/material";

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
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: '16px', bgColor: 'red', width: '100%', ml: '16px' }}>
      <Logo />
      <Box>
        <Typography sx={styles.header}>GLOBAL LATIN</Typography>
        <Typography sx={styles.subHeader}>DANCE COMMUNITY</Typography>
      </Box>
    </Box>
  );
};
