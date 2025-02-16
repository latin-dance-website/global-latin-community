import React, {useState, useEffect} from "react";
import { Box, Button, ChakraProvider, Grid, GridItem, Heading, Link, Text } from "@chakra-ui/react";
import Navbar from "@components/Navbar";
// import Hero from "@components/landing_page/Hero";
import HeroTemporary from "@components/landing_page/HeroTemporary";
import Features from "@components/landing_page/Features";
import Bento from "@components/landing_page/Bento";
import MarqueeComponent from "@components/landing_page/Marquee";
import LayerBlur2 from "@components/coming_soon/LayerBlur2";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import Link from "next/link";

const Home = () => {
  const [isToastVisible, setIsToastVisible ] = useState(false);
  const [ isSelectedTileEvent, setIsSelectedTileEvent ] = useState(false);
  const eventCards = [
    {
      text: "Our Initiatives/Events",
      href: "/events/our-events",
    }, 
    {
      text: "Global Dance Festivals",
      href: "/events/festivals"
    }, 
    {
      text: "Global Social Nights",
      href: "/events/socials"
    }
  ]
  useEffect(() => {
    console.log("isSelectedTileEvent: ", isSelectedTileEvent);
  }, [isSelectedTileEvent])
  return (
    <Box minH="100vh" maxWidth="100vw" position="relative" overflowX="clip" opacity={isToastVisible ? "0.2" : "1"}>
      <Navbar />
      {/* <Hero /> */}
      <HeroTemporary isSelectedTileEvent={isSelectedTileEvent}/>
      <Features isSelectedTileEvent={isSelectedTileEvent} setIsSelectedTileEvent={setIsSelectedTileEvent}/>
      <Bento isSelectedTileEvent={isSelectedTileEvent} isToastVisible={isToastVisible} setIsToastVisible={setIsToastVisible}/>
      <MarqueeComponent isSelectedTileEvent={isSelectedTileEvent} />
      { isSelectedTileEvent &&
        <Box height="100vh" width="100vw" position="fixed" top="0" left="0" zIndex={"1000"} display="flex" justifyContent={"center"} alignItems={"center"}>
          <LayerBlur2/>
          <Box position="absolute" top={{ base: "10vh", md: "7vh", lg: "7vh", xl: "10vh" }} left={"1rem"} marginTop={"1rem"}>
              <Button bg="hotpink" borderRadius="20px" color="white" onClick={() => {setIsSelectedTileEvent(false)}}><FaArrowLeft color="white"/> <Text marginLeft="0.5rem">Go Back</Text></Button>
          </Box>
          <Grid
            templateColumns={{
              base: '1fr',
              md: "repeat(1, 1fr)",
              lg: "repeat(3, 1fr)"
            }}
            columnGap={{
              base:"1rem",
              md: "3.5rem",
              lg: "2rem",
              xl: "3rem",
              "2xl": "5rem",
            }}
            rowGap={{ base: "1rem", md: "2rem", lg: "3rem", xl: "4rem" }}
            width={{ base: "75%", md: "70%", lg: "70%", xl: "80%", "2xl": "75%" }}
            alignItems={"center"}
            marginTop="0rem"
            col
          >
            {eventCards.map((card, index) => (
              <GridItem key={index}>
              <Link href={card.href} textDecoration={"none"} _hover={{ textDecoration: "none" }}>
                <Box 
                textAlign={"center"} 
                bgGradient={"linear(to-br, #8EA3F4, #3C71FF)"} 
                color="white" 
                borderRadius="1rem" 
                p={{ base: "1rem", md: "2.5rem", lg: "1.5rem", xl: "2rem" }}
                shadow="md" 
                _hover={{
                  transform: "translateY(-5px)",
                  shadow: "lg",
                  transition: "0.3s",
                }}
                paddingY={"2rem"}
                border="1px solid white"
                height="120px"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                >
                <Heading
                  as="h3"
                  fontSize={{ base: "1.25rem", md: "1.25rem" }}
                  fontFamily={"montserrat"}
                >
                  {card.text}
                </Heading> 
                </Box>
              </Link>
            </GridItem>
            ))}
          </Grid>
        </Box>
      }
    </Box>
  );
};

export default Home;
