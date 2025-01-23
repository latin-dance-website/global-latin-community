import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Header } from "@components/css";
import HeroSection from "@components/heroSection";
import EcosystemBox from "@components/ecosystem";
import BottomSection from "@components/bottomSection";
import LayerBlur from "@components/css/layerBlur";


const Home: React.FC = () => {
  return (
    <ChakraProvider>
      <Box
        display= "flex"
        flexDirection= "column"
        justifyContent= 'center'
        alignItems= 'center'
        minHeight= "100vh"
        overflowX= 'hidden'
        width="100vw"
      >
        <LayerBlur />

        <Header />    
        <HeroSection />
        <EcosystemBox />
        {/* <SurveyBox />
        <CommunitySection /> */}
        {/* <HiringCarousel /> */}
        <BottomSection />
      </Box>
    </ChakraProvider>
  );
};

export default Home;
