import { Box, Button, Heading, Image, Text, VStack, HStack, Divider } from '@chakra-ui/react';
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { FaCalendar, FaClock } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useBreakpointValue } from "@chakra-ui/react";
import Link from 'next/link';
// import eventGlance1 from "../../../public/assets/images/eventGlance1.png";


export default function EventCard() {

  const eventCards = [
    {
      subtitle:"Featured Event",
      title: "Event 1",
      description: "Some description of the event to be given in one or two line,Some description of the event to be given in one or two line.",
      date: "25th January, 2025",
      time: "6:30PM",
      location: "Cubbon Park"
    }, 
    // {
    //   subtitle:"Featured Event",
    //   title: "Event 2",
    //   description: "Some description of the event to be given in one or two line,Some description of the event to be given in one or two line.",
    //   date: "25th January, 2025",
    //   time: "6:30PM",
    //   location: "Cubbon Park"
    // },
    // {
    //   subtitle:"Featured Event",
    //   title: "Event 3",
    //   description: "Some description of the event to be given in one or two line,Some description of the event to be given in one or two line.",
    //   date: "25th January, 2025",
    //   time: "6:30PM",
    //   location: "Cubbon Park"
    // }
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
          Our Initiatives / Events
        </Heading>
        <Box
          height="0.2rem"
          width="20rem"
          borderRadius={"1rem"}
          backgroundColor={"brand.purple"}
          alignSelf="center"
          marginBottom={"1rem"}
        />
      </Box>
      <Box display="flex" gap="0.3rem" alignItems={"center"} flexWrap={"wrap"} justifyContent={"center"} paddingX="0rem">
        <Text fontSize="1.2rem" fontFamily="montserrat" fontWeight="600">Filters: </Text>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} p={1}>
            Month
          </MenuButton>
          <MenuList>
            <MenuItem>January</MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} p={1} >
            Dance Style
          </MenuButton>
          <MenuList>
            <MenuItem>Salsa</MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} p={1}>
            City
          </MenuButton>
          <MenuList>
            <MenuItem>Cubbon Park</MenuItem> 
          </MenuList>
        </Menu>
      </Box>
      <Swiper
        style={{
          width: swiperWidth,
          marginBottom: "1.2rem",
        }}
        // navigation
        // autoplay={{
        //   delay: 2000,
        // }}
        // modules={[Navigation, Autoplay]}
        // slidesPerView="auto"
        // sx={{
        //   "& .swiper-button-next, & .swiper-button-prev": {
        //     color: "blue.500", // Chakra UI color syntax
        //     display: "none",  // Hides the arrows
        //   },
        //   "& .swiper-button-next:hover, & .swiper-button-prev:hover": {
        //     color: "red.500", // Changes color on hover
        //   },
        // }}
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
            <Link href="/events/our-events/salsa-dance">
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
              >
                <Image src="/assets/images/eventGlance1.png" width={{md:"50%", base:"100%"}} height={{md:"100%", base:"auto"}}></Image>
                <Box display="flex" flexDirection={"column"} justifyContent={"space-between"} padding="0rem" width={{base:"100%", sm:""}} height="100%" overflow='hidden' >
                  <Text fontWeight={"400"} fontSize="1rem" fontFamily={"montserrat"} padding="1rem" paddingBottom="0px">{event.subtitle}</Text>
                  <Text fontWeight={"700"} fontSize="1rem" fontFamily={"montserrat"} paddingX="1rem">{event.title}</Text>
                  <Text fontWeight={"300"} display={{sm:"block", base:"none"}} fontSize="0.8rem" fontFamily={"montserrat"} paddingX="1rem">{event.description}</Text>
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
      {/* <Box display="flex" flexDirection={"column"} alignItems={"center"}>
        <Heading
          as="h1"
          fontSize={{
            base: "2rem",
            md: "2.2rem",
            lg: "2.5rem",
            xl: "3rem",
            "2xl": "3rem",
          }}
          marginTop={"1rem"}
          fontFamily={"montserrat"}
        >
          Our Events
        </Heading>
        <Box
          height="0.2rem"
          width="10rem"
          borderRadius={"1rem"}
          backgroundColor={"brand.purple"}
          alignSelf="center"
          marginBottom={"1rem"}
        />
      </Box>
      <Box width="100%" display="flex" gap="2rem" padding="2rem" paddingTop="0rem" flexDirection={{md:"row", base:"column"}}>
        {/* <Box bg="white" width="40vh" padding="1rem 2rem" borderRadius="20px" opaicty="0.5">
          <Text color="black" fontWeight={"600"} fontSize="2rem">Fitlers</Text>
          <Divider marginBottom="1rem"></Divider>
          <Box display="flex" flexDirection={{base:"row", md:"column"}} flexWrap={"wrap"} gap="1rem">
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Month
              </MenuButton>
              <MenuList>
                <MenuItem>January</MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
                Dance Style
              </MenuButton>
              <MenuList>
                <MenuItem>Salsa</MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
                City
              </MenuButton>
              <MenuList>
                <MenuItem>Cubbon Park</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box> */}
        {/* <Box width="100%" borderRadius="20px" bg="white" padding="20px" border="2px solid #8547E6" display="Flex" flexDirection="column">
          <Text color="black" fontWeight={"600"} fontSize="2rem" alignSelf={"start"}>Events</Text>
          <Divider></Divider>
          <Link href="/events/our-events/salsa-dance">
            <Box marginTop="1rem" width="250px" borderRadius="10px" overflow={'hidden'} cursor={"pointer"} alignSelf={{base:"center", sm:"start"}} textAlign={{base:"center", sm:"start"}}>
              <Box width="250px" height="250px" bg="gray"></Box>
              <Box width="250px" height="2rem" bg="black" color="white" padding="5px 10px" marginBottom="1rem" borderBottomLeftRadius={"10px"} borderBottomRightRadius={"10px"}>25th Jan</Box>
              <Text color='black' fontWeight={"600"} fontSize="1.2rem">Salsa Dance Class</Text>
              <Text color='black'>Cubbon Park</Text>
              <Text color='black'>Rs 500/-</Text>
            </Box>
          </Link>
        </Box>
      </Box> */}
    </Box>
  )
}
