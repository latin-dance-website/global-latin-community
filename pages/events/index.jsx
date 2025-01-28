import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "@components/Navbar";
import MarqueeComponent from "@components/landing_page/Marquee";
import LayerBlur2 from "../../src/components/coming_soon/LayerBlur2";
import HeroComingSoon from "../../src/components/coming_soon/HeroComingSoon";

export default function EventsPage() {
  return (
    <Box
      minH="100vh"
      maxWidth="100vw"
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      overflowX="clip"
    >
      <Navbar />
      <LayerBlur2 />
      <HeroComingSoon />
      <MarqueeComponent />
    </Box>
  );
}
