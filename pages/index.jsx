import React, {useState} from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Navbar from "@components/Navbar";
// import Hero from "@components/landing_page/Hero";
import HeroTemporary from "@components/landing_page/HeroTemporary";
import Features from "@components/landing_page/Features";
import Bento from "@components/landing_page/Bento";
import MarqueeComponent from "@components/landing_page/Marquee";

const Home = () => {
  const [isToastVisible, setIsToastVisible ] = useState(false);
  return (
    <Box minH="100vh" maxWidth="100vw" position="relative" overflowX="clip" opacity={isToastVisible ? "0.2" : "1"}>
      <Navbar />
      {/* <Hero /> */}
      <HeroTemporary />
      <Features />
      <Bento isToastVisible={isToastVisible} setIsToastVisible={setIsToastVisible}/>
      <MarqueeComponent />
    </Box>
  );
};

export default Home;
