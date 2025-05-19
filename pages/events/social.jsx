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
