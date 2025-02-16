import React, {useState} from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "@components/Navbar";
import MarqueeComponent from "@components/landing_page/Marquee";
import LayerBlur2 from "../../src/components/coming_soon/LayerBlur2";
import HeroComingSoon from "../../src/components/coming_soon/HeroComingSoon";
import EventCard from "../../src/components/events/EventCard";

export default function EventsPage() {
  const [isToastVisible, setIsToastVisible ] = useState(false);
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
      opacity={isToastVisible ? "0.2": "1"}
    >
      <Navbar isToastVisible={isToastVisible}/>
      <LayerBlur2 />
      {/* <EventCard /> */}
      <HeroComingSoon isToastVisible={isToastVisible} setIsToastVisible={setIsToastVisible}/>
      <MarqueeComponent />
    </Box>
  );
}
