import VideoUpload from '@components/videoUpload'
import React from 'react'
import { ChakraProvider, Box } from "@chakra-ui/react";
import HiringCarousel from '@components/swiperComponent';
import { Header } from '@components/css';
import LayerBlur2 from '@components/css/layerBlur2';

export default function VideoUploadPage() {
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
        <LayerBlur2 />
        <Header />
        <HiringCarousel />
      </Box>
    </ChakraProvider>
  )
}
