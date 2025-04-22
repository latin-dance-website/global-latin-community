import { Box, Button, Heading, Image, Text, VStack, HStack, Divider } from '@chakra-ui/react';
import { Grid, GridItem } from "@chakra-ui/react";
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { FaCalendar, FaClock } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useBreakpointValue } from "@chakra-ui/react";
import Link from 'next/link';


export default function EventCard() {

  const eventCards = [
    {
      subtitle1:"@amandaandrishabh_official",
      subtitle2:" x ",
      subtitle3:"@bangalore_latin_events",
      title: "BACHATA PARTNERWORK INTENSIVE",
      description1: "Next Edition of our Bachata Intensive in Bangalore! This time, we’re bringing the incredible Amanda Rishabh from Mumbai to level up your dance journey.",
      description2:"Build Communication & Create Connection",
      date: "21st, 22nd, 23rd March, 2025",
      time: "8 Hours",
      location: "Dhurii Domlur, Bengaluru",
      id:"partnerwork-intensive"
    },
    
  ]

  const presenteventCards = [
    {
      subtitle1:"@amandaandrishabh_official",
      subtitle2:" x ",
      subtitle3:"@bangalore_latin_events",
      title: "BACHATA INTENSiIVR WORKSHOP – PUNE EDITION",
      description1: "Experience the essence of Dominican Bachata with Aman Bassi’s immersive solo sessions on culture, musicality, and movement—followed by dynamic partnerwork and body movement with Megha Khatri.",
      description2:"Build Communication & Create Connection",
      date: "16th, 17th, 18th May, 2025",
      time: "8 Hours",
      location: "The Stardom studio, Sanghvi Nagar, Pune",
      id:"partnerwork-pune"
    },
    
  ]



  const swiperWidth = useBreakpointValue({
    base: "70%",
    sm: "50%",
    md: "75%",  
    lg:"60%" ,
    xl: "50%",  
  });

  return (
    <Box w="100vw" minHeight="80vh" display="flex" justifyContent={"start"} alignItems="center" flexDirection={"column"}>
      <Box display="flex" flexDirection={"column"} alignItems={"center"}>
        {/* <Heading
          as="h1"
          fontSize={{
            base: "1.5rem",
            md: "2rem",
            lg: "2rem",
            xl: "2.5rem",
            "2xl": "2.5rem",
          }}
          marginTop={"1rem"}
          fontFamily={"montserrat"}
        >
          Our Initiatives / Events
        </Heading> */}
        {/* <Box
          height="0.2rem"
          width="30rem"
          borderRadius={"1rem"}
          backgroundColor={"brand.purple"}
          alignSelf="center"
          marginBottom={"1rem"}
        /> */}
      </Box>
      
      <Heading
          as="h1"
          fontSize={{
            base: "1.5rem",
            md: "2rem",
            lg: "2rem",
            xl: "2.5rem",
            "2xl": "2.5rem",
          }}
          marginTop={"1rem"}
          fontFamily={"montserrat"}
        >
          Upcoming Events
        </Heading>
        <Box
          height="0.2rem"
          width="30rem"
          borderRadius={"1rem"}
          backgroundColor={"brand.purple"}
          alignSelf="center"
          marginBottom={"1rem"}
        />
      <Swiper
        style={{
          width: swiperWidth,
          marginBottom: "1.2rem",
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
        slidesPerView="auto"
      >
        {presenteventCards.map((event, index) => {
          return (
          <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          key={index}
          >
            <Link href={`/events/our-events/${event.id}`}>
              <Box
                display="flex"
                width="100%"
                flexDirection={{md:"row", base:"column"}}
                height={{md:"50vh", base:"auto"}}
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                overflow="hidden"
                borderRadius={"15px"}
                marginTop="1rem"
                cursor="pointer"
                boxShadow={"lg"}
              >
                <Image src={`/assets/images/eventCardImages/${event.id}.jpg`} width={{md:"50%", base:"100%"}} height={{md:"100%", base:"auto"}}></Image>
                <Box display="flex" flexDirection={"column"} justifyContent={"space-between"} padding="0rem" width={{base:"100%", sm:""}} height="100%" overflow='hidden' >
                  {/* <Text fontWeight={"400"} fontSize="1rem" textAlign={"center"} fontStyle={"italic"} fontFamily={"montserrat"} padding="1rem" pt="0.5rem" paddingBottom="0px"><Text as="span">{event.subtitle1}</Text><Text as="span">{event.subtitle2}</Text><Text as='span'>{event.subtitle3}</Text></Text> */}
                  <Text fontWeight={"700"} fontSize="1rem" fontFamily={"montserrat"} paddingX="1rem" textAlign={"center"} my="1rem">{event.title}</Text>
                  <Text fontWeight={"300"} display={{sm:"block", base:"none"}} fontSize="0.8rem" fontFamily={"montserrat"} paddingX="1rem">{event.description1}<Text fontWeight={"600"}>{event.description2}</Text></Text>
                  <VStack align="start" paddingX="1rem">
                    <HStack><FaCalendar color='hotpink'/> <Text fontSize="1rem">{event.date}</Text></HStack>
                    <HStack><FaClock color='hotpink'/> <Text fontSize="1rem">{event.time}</Text></HStack>
                    <HStack><FaLocationDot color='hotpink'/> <Text fontSize="1rem">{event.location}</Text></HStack>
                  </VStack>
                  <Text bg="hotpink" width="100%" textAlign={"center"} color="white" marginTop="0.5rem" paddingY={"5px"}>Book Now!</Text>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
          )
      })}
      </Swiper>


      

      <Heading
          as="h1"
          fontSize={{
            base: "1.5rem",
            md: "2rem",
            lg: "2rem",
            xl: "2.5rem",
            "2xl": "2.5rem",
          }}
          marginTop={"1rem"}
          fontFamily={"montserrat"}
        >
          Past Events
        </Heading>
        <Box
          height="0.2rem"
          width="30rem"
          borderRadius={"1rem"}
          backgroundColor={"brand.purple"}
          alignSelf="center"
          marginBottom={"1rem"}
        />
      <Swiper
        style={{
          width: swiperWidth,
          marginBottom: "1.2rem",
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
        slidesPerView="auto"
      >
        {eventCards.map((event, index) => {
          return (
          <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          key={index}
          >
            <Link href={`/events/our-events/${event.id}`}>
              <Box
                display="flex"
                width="100%"
                flexDirection={{md:"row", base:"column"}}
                height={{md:"50vh", base:"auto"}}
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                overflow="hidden"
                borderRadius={"15px"}
                marginTop="1rem"
                cursor="pointer"
                boxShadow={"lg"}
              >
                <Image src={`/assets/images/eventCardImages/${event.id}.jpg`} width={{md:"50%", base:"100%"}} height={{md:"100%", base:"auto"}}></Image>
                <Box display="flex" flexDirection={"column"} justifyContent={"space-between"} padding="0rem" width={{base:"100%", sm:""}} height="100%" overflow='hidden' >
                  <Text fontWeight={"400"} fontSize="1rem" textAlign={"center"} fontStyle={"italic"} fontFamily={"montserrat"} padding="1rem" pt="0.5rem" paddingBottom="0px"><Text as="span">{event.subtitle1}</Text><Text as="span">{event.subtitle2}</Text><Text as='span'>{event.subtitle3}</Text></Text>
                  <Text fontWeight={"700"} fontSize="1rem" fontFamily={"montserrat"} paddingX="1rem" textAlign={"center"} my="1rem">{event.title}</Text>
                  <Text fontWeight={"300"} display={{sm:"block", base:"none"}} fontSize="0.8rem" fontFamily={"montserrat"} paddingX="1rem">{event.description1}<Text fontWeight={"600"}>{event.description2}</Text></Text>
                  <VStack align="start" paddingX="1rem">
                    <HStack><FaCalendar color='hotpink'/> <Text fontSize="1rem">{event.date}</Text></HStack>
                    <HStack><FaClock color='hotpink'/> <Text fontSize="1rem">{event.time}</Text></HStack>
                    <HStack><FaLocationDot color='hotpink'/> <Text fontSize="1rem">{event.location}</Text></HStack>
                  </VStack>
                  <Text bg="grey" width="100%" textAlign={"center"} color="white" marginTop="0.5rem" paddingY={"5px"}>Book Now!</Text>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
          )
      })}
      </Swiper>
      
      {/* <Grid width="100%" templateColumns={{sm:"repeat(4, 1fr)", base:"repeat(4, 0.8fr)"}} gap={{md:4, base:2}} paddingX={{md:"5rem", base:"0.5rem"}} paddingLeft={{md:"3.5rem", base:"1rem"}} marginTop="2rem">
        <GridItem justifyContent={"center"} alignItems={"center"}>
          <Box height="100%" display="flex" alignItems={"center"} justifyContent={"center"} fontSize={{sm:"1.5rem", base:"1rem"}} fontFamily="montserrat" fontWeight="600">Filters: </Box>
        </GridItem>
        <GridItem>
          <Menu>
            <MenuButton width="100%" bgColor={"white"} border="2px solid #AD752F" as={Button} rightIcon={<ChevronDownIcon />} p={2} fontSize={{md:"md", base:"sm"}}>
              Month
            </MenuButton>
            <MenuList p={1} fontSize="sm" minWidth="auto">
              <MenuItem p={2}>March</MenuItem>
            </MenuList>
          </Menu>
        </GridItem>
        <GridItem>
          <Menu>
            <MenuButton width="100%" bgColor={"white"} border="2px solid #AD752F" as={Button} rightIcon={<ChevronDownIcon />} p={2}  >
              Dance Style
            </MenuButton>
            <MenuList p={1} fontSize="sm" minWidth="auto">
              <MenuItem p={2}>Bachata</MenuItem>
            </MenuList>
          </Menu>
        </GridItem>
        <GridItem>
          <Menu>
            <MenuButton width="90%" bgColor={"white"} border="2px solid #AD752F" as={Button} rightIcon={<ChevronDownIcon />} p={2} >
              City
            </MenuButton>
            <MenuList p={1} fontSize="sm" minWidth="auto">
              <MenuItem p={2}>Bengaluru</MenuItem> 
            </MenuList>
          </Menu>
        </GridItem>
      </Grid> */}

      
      {/* <Box width="100%" display="flex" gap="2rem" padding="2rem" paddingTop="0rem" flexDirection={{md:"row", base:"column"}}>
        <Box width="100%" borderRadius="20px" padding="20px" display="Flex" flexDirection="column">
      
          <Box width="100%" height="100%" display="flex" justifyContent={{base:"center", sm:"start"}} alignItems={{base:"center", sm:"start"}} flexWrap={"wrap"}>
            {eventCards.map((event, index) => {
              return (
                <Link href={`/events/our-events/${event.id}`}>
                  <Box marginTop="1rem" width="250px" borderRadius="10px" overflow={'hidden'} cursor={"pointer"} alignSelf={{base:"center", sm:"start"}} textAlign={{base:"center", sm:"start"}}>
                    <Box width="250px" height="auto" bg="gray" borderRadius={"10px"} overflow={"hidden"}>
                      <Image src={`/assets/images/eventCardImages/${event.id}.jpg`} width={{md:"100%", base:"100%"}} height={{md:"auto", base:"auto"}}></Image>
                    </Box>
                    <Text color='black' fontWeight={"600"} fontSize="1.2rem">{event.title}</Text>
                    <Text color='black' marginBottom={"0.5rem"}>{event.location}</Text>
                    <Text color='white' width="100%" textAlign={"center"} bg="black" paddingY="5px">Book Now</Text>
                  </Box>
                </Link>
              )
            })}
          </Box>
        </Box>
      </Box> */}
    </Box>
  )
}
