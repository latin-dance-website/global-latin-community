import React, {useState} from "react";
import { Box } from "@chakra-ui/react";
import Hero from "@components/video_upload/Hero";
import Testimonials from "@components/video_upload/Testimonials";
import LayerBlur from "@components/video_upload/LayerBlur";
import Navbar from "@components/Navbar";
import MarqueeComponent from "@components/landing_page/Marquee";

export default function VideoUploadPage() {
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
      opacity={isToastVisible ? "0.2" : "1"}
    >
      <Navbar />
      <LayerBlur />
      <Hero isToastVisible={isToastVisible} setIsToastVisible={setIsToastVisible}/>
      <Testimonials />
      <MarqueeComponent />
    </Box>
  );
}
