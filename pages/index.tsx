import React from "react";

import { Cards, Footer, Header, Main } from "@components/css";
import HeroSection from "@components/heroSection";
import EcosystemBox from "@components/ecosystem";
import { Box } from "@mui/material";
import BottomSection from "@components/bottomSection";
import LayerBlur from "@components/css/layerBlur";
import HiringCarousel from "@components/swiperComponent"

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: "100vh",
        overflow: 'hidden'
      }}
    >
      <LayerBlur />

      <Header />    
      <HeroSection />
      <EcosystemBox />
      {/* <SurveyBox />
      <CommunitySection /> */}
      <HiringCarousel />
      <BottomSection />
    </Box>
  );
};

export default Home;
