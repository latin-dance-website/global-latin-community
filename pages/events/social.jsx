// pages/salsa-class.jsx
import {
  Box,
  Text,
  Flex,
  Button,
  Icon,
  Image,
  VStack,
  HStack,
  useBreakpointValue,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import { MdLocationOn, MdAttachMoney, MdStar } from "react-icons/md";
import Navbar from "@components/Navbar";
import LayerBlur2 from "../../src/components/coming_soon/LayerBlur2";
import { useState } from "react";

export default function Social() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isToastVisible, setIsToastVisible] = useState(false);
  const events = [
  {
    id: "bliss-thursdays",
    eventType:"SBK Night",
    ticketClass: "Early Bird Ticket",
    tickets: [
      { name: "Single", amount: 4000 },
      { name: "Couple", amount: 7500 },
    ],
    title: "Bachata Bliss Thursdays",
    dates: [
      "21st March, 2025: 8PM to 10PM",
    ],
    about: () => (
      <Box>
        <Text fontSize="1.5rem" fontWeight="600" fontFamily={"montserrat"}>
          About
        </Text>
        <Text
          fontSize="1rem"
          fontFamily={"montserrat"}
          marginBottom={"0.5rem"}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </Text>
        <Text
          fontSize="1rem"
          fontFamily={"montserrat"}
          marginBottom={"0.5rem"}
        >
           Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </Text>
        <Text
          fontSize="1.2rem"
          fontFamily={"montserrat"}
          marginBottom={"0.5rem"}
          fontWeight="500"
        >
          ✨ What to expect?
        </Text>
        <Text
          fontSize="1rem"
          fontFamily={"montserrat"}
          marginBottom={"0.2rem"}
        >
          1. Partner Work & Fundamentals
        </Text>
        <Text fontSize="0.8rem" fontFamily={"montserrat"}>
          {" "}
          - Resistance and connection
        </Text>
        <Text fontSize="0.8rem" fontFamily={"montserrat"}>
          {" "}
          - Changing instruments individually and with a partner
        </Text>
        <Text
          fontSize="0.8rem"
          fontFamily={"montserrat"}
          marginBottom={"0.5rem"}
        >
          {" "}
          - Expanding footwork vocabulary
        </Text>
        <Text
          fontSize="1rem"
          fontFamily={"montserrat"}
          marginBottom={"0.2rem"}
        >
          2. Musicality & Modern Dance Understanding
        </Text>
        <Text fontSize="0.8rem" fontFamily={"montserrat"}>
          {" "}
          - Exploring modern songs and their musical differences
        </Text>
        <Text fontSize="0.8rem" fontFamily={"montserrat"}>
          {" "}
          - Incorporating turns and upper body movement
        </Text>
        <Text
          fontSize="1rem"
          fontFamily={"montserrat"}
          marginBottom={"0.2rem"}
        >
          3. Turns & Technique Drills
        </Text>
        <Text fontSize="0.8rem" fontFamily={"montserrat"}>
          {" "}
          - Teaching all basic turns (lead & follow)
        </Text>
        <Text fontSize="0.8rem" fontFamily={"montserrat"}>
          {" "}
          - Cross-over turns, hammerlock, cross grip, haircombs, flicks
        </Text>
        <Text
          fontSize="0.8rem"
          fontFamily={"montserrat"}
          marginBottom={"0.5rem"}
        >
          {" "}
          - Grip changes, preparation, timing, resistance, balance
        </Text>
        <Text
          fontSize="1rem"
          fontFamily={"montserrat"}
          marginBottom={"0.2rem"}
        >
          4. Practice & Creative Application
        </Text>
        <Text fontSize="0.8rem" fontFamily={"montserrat"}>
          {" "}
          - Intensive drills to internalize techniques
        </Text>
        <Text
          fontSize="0.8rem"
          fontFamily={"montserrat"}
          marginBottom={"0.5rem"}
        >
          {" "}
          - Applying learned movements creatively to music
        </Text>
        <Text
          fontSize="1rem"
          fontFamily={"montserrat"}
          marginBottom={"0.5rem"}
        >
          Share with your partner & let’s level up together! 💯🔥
        </Text>
        <Text fontSize="1rem" fontFamily={"montserrat"} color="blue.300">
          #BachataPartnerwork #BangaloreLatinEvents #AmandaAndRishabh
          #BachataWorkshop #DhuriiBangalore #bachataintensive
        </Text>
      </Box>
    ),
    terms: ["The ticket is non - refundable"],
    venue: "Karma & Kurry, Garuda Mall",
    subAddress: "4th Floor, Magrath road, Garuda Mall Rd, Bengaluru, Karnataka 560001",
    googleMapsLink: "https://maps.app.goo.gl/WcGRLCwbbuXe7ErM6?g_st=iw",
    iframeLink:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3695.857219532653!2d77.6388245!3d12.9562128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae153e2e11cd31%3A0x302df0f97fe220b9!2sDhurii%20Academy%20of%20Arts!5e1!3m2!1sen!2sin!4v1741606142543!5m2!1sen!2sin",
    }
  ];

  return (
    <Box
      minH="100vh"
      w="full"
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      px={{ base: 4, md: 6 }}
      py={{ base: 4, md: 8 }}
      overflowX="clip"
      opacity={isToastVisible ? "0.2" : "1"}
    >
      <Navbar isToastVisible={isToastVisible} />
      <LayerBlur2 />

      {/* Hero Banner */}
      <Box
        w="full"
        borderRadius="2xl"
        overflow="hidden"
        position="relative"
        mb={{ base: 6, md: 10 }}
        mt={{ base: 2, md: 4 }}
      >
        <Image
          src="/assets/images/hero.jpg"
          alt="Salsa Dance"
          objectFit="cover"
          w="full"
          h={{ base: "200px", md: "400px" }}
          filter="brightness(0.75)"
        />
        <Box position="absolute" bottom={4} left={4} color="white">
          <Text fontSize={{ base: "xl", md: "3xl" }} fontWeight="bold">
            Salsa Dance Class
          </Text>
          <HStack mt={1} spacing={1} color="yellow.300">
            <Icon as={MdStar} />
            <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>
              9.5 / 10
            </Text>
          </HStack>
        </Box>
      </Box>

      {/* Event Info */}
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        w="full"
        bg="gray.50"
        borderRadius="xl"
        p={{ base: 4, md: 6 }}
        boxShadow="sm"
        mb={6}
      >
        <HStack spacing={2}>
          <CalendarIcon color="orange.400" />
          <Text fontSize={{ base: "sm", md: "md" }}>21 Jan 2025</Text>
        </HStack>
        <HStack spacing={2}>
          <TimeIcon color="orange.400" />
          <Text fontSize={{ base: "sm", md: "md" }}>6:30 PM - 8:00 PM</Text>
        </HStack>
        <HStack spacing={2}>
          <Icon as={MdLocationOn} color="orange.400" />
          <Text fontSize={{ base: "sm", md: "md" }}>Cubbon Park</Text>
        </HStack>
        <HStack spacing={2}>
          <Icon as={MdAttachMoney} color="orange.400" />
          <Text fontSize={{ base: "sm", md: "md" }}>Rs 300/-</Text>
        </HStack>
      </Stack>

      {/* CTA Button */}
      <Button
        size="lg"
        colorScheme="orange"
        borderRadius="full"
        px={10}
        mb={8}
        w={{ base: "full", md: "auto" }}
        onClick={() => alert("Booked")}
      >
        Book Now
      </Button>

      {/* Sections */}
      <VStack align="start" spacing={6} w="full">
        {/* About Class */}
        <Box w="full">
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            About the class
          </Text>
          <Text fontSize="sm" color="gray.700" lineHeight="1.8">
            Discover the vibrant world of salsa dancing in our fun and
            interactive class. Learn basic steps, partner techniques, and enjoy
            the rhythm. Perfect for beginners and enthusiasts.
          </Text>
        </Box>

        <Divider />

        {/* About Instructor */}
        <Box w="full">
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            About the instructor
          </Text>
          <Text fontSize="sm" color="gray.700" lineHeight="1.8">
            Our instructor has 10+ years of experience teaching salsa worldwide.
            With a passion for Latin rhythm and a knack for fun, you're in great
            hands to start your dance journey.
          </Text>
        </Box>

        <Divider />

        {/* Reviews */}
        <Box w="full">
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Reviews
          </Text>
          <Text fontSize="sm" color="gray.500" fontStyle="italic">
            Coming soon...
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
