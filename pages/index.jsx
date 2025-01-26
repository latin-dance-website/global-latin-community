import React from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Navbar from "@components/Navbar";
import Hero from "@components/landing_page/Hero";
import Features from "@components/landing_page/Features";
import Bento from "@components/landing_page/Bento";
import MarqueeComponent from "@components/landing_page/Marquee";

const Home = () => {
  return (
    <Box minH="100vh" maxWidth="100vw" position="relative" overflowX="clip">
      <Navbar />
      <Hero />
      <Features />
      <Bento />
      <MarqueeComponent />
    </Box>
  );
};

export default Home;
