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
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Social() {
  const router = useRouter();
  const { id } = router.query;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {

    const eventData = sessionStorage.getItem('currentEvent');
    
    if (eventData) {
      setEvent(JSON.parse(eventData));
      setLoading(false);
    } else {

      router.push('/events');
    }
  }, []);

  if (loading) {
    return (
      <Box minH="100vh" display="flex" justifyContent="center" alignItems="center">
        <Text>Loading event details...</Text>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box minH="100vh" display="flex" justifyContent="center" alignItems="center">
        <Text>Event not found</Text>
      </Box>
    );
  }

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
      {/* Fixed Navbar at Top */}
      <Box position="fixed" top="0" left="0" w="100%" zIndex="1000">
        <Navbar isToastVisible={isToastVisible} />
      </Box>
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
          src={event.image || "/assets/images/hero.jpg"}
          alt={event.title || "Event"}
          objectFit="cover"
          w="full"
          h={{ base: "200px", md: "400px" }}
          filter="brightness(0.75)"
        />
        <Box position="absolute" bottom={4} left={4} color="white">
          <Text fontSize={{ base: "xl", md: "3xl" }} fontWeight="bold">
            {event.title}
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
          <Text fontSize={{ base: "sm", md: "md" }}>{event.date}</Text>
        </HStack>
        <HStack spacing={2}>
          <TimeIcon color="orange.400" />
          <Text fontSize={{ base: "sm", md: "md" }}>
            {event.startTime} - {event.endTime}
          </Text>
        </HStack>
        <HStack spacing={2}>
          <Icon as={MdLocationOn} color="orange.400" />
          <Text fontSize={{ base: "sm", md: "md" }}>{event.location}</Text>
        </HStack>
        <HStack spacing={2}>
          <Icon as={MdAttachMoney} color="orange.400" />
          <Text fontSize={{ base: "sm", md: "md" }}>{event.fees}</Text>
        </HStack>
      </Stack>

      {/* CTA Button */}
      <Button
        as="a"
        href={event.googleMapsLink || "#"}
        target="_blank"
        size="lg"
        colorScheme="orange"
        borderRadius="full"
        px={10}
        mb={8}
        w={{ base: "full", md: "auto" }}
      >
        View Location
      </Button>

      {/* Sections */}
      <VStack align="start" spacing={6} w="full">
        {/* About Class */}
        <Box w="full">
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            About the event
          </Text>
          <Text fontSize="sm" color="gray.700" lineHeight="1.8">
            {event.description}
          </Text>
        </Box>

        <Divider />

        {/* Event Details */}
        <Box w="full">
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Event Details
          </Text>
          <VStack align="start" spacing={3}>
            <Box>
              <Text fontWeight="semibold">Date:</Text>
              <Text>{event.date}</Text>
            </Box>
            <Box>
              <Text fontWeight="semibold">Time:</Text>
              <Text>{event.startTime} - {event.endTime}</Text>
            </Box>
            <Box>
              <Text fontWeight="semibold">Location:</Text>
              <Text>{event.location}</Text>
            </Box>
            <Box>
              <Text fontWeight="semibold">Entry Fee:</Text>
              <Text>{event.fees}</Text>
            </Box>
          </VStack>
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