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
  Heading,
  Badge,
  Container,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import { MdLocationOn, MdAttachMoney, MdStar, MdLink } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import Navbar from "@components/Navbar";
import LayerBlur2 from "../../src/components/coming_soon/LayerBlur2";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";

export default function Social() {
  const router = useRouter();
  const { id } = router.query;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const eventData = sessionStorage.getItem("currentEvent");

    if (eventData) {
      setEvent(JSON.parse(eventData));
      setLoading(false);
    } else {
      router.push("/events");
    }
  }, []);

  if (loading) {
    return (
      <Box>
        <Text>Loading event...</Text>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Event not found</Text>
        <Button onClick={() => router.push("/events")} ml={4}>
          Back to Events
        </Button>
      </Box>
    );
  }

  const formatDateWithDay = (dateString) => {
  if (!dateString || dateString.toLowerCase() === "to be decided") {
    return "To be decided";
  }

  try {
    // Parse "Mon, 24 Jun" assuming current year
    const parsed = dayjs(dateString, "ddd, DD MMM");
    if (!parsed.isValid()) return dateString;

    const withYear = parsed.year(dayjs().year()); // attach current year
    return withYear.format("dddd, DD MMMM YYYY");
  } catch (e) {
    return dateString;
  }
};

  const currencies = event.currencySymbols
    ? event.currencySymbols.split(",")
    : ["₹", "₫", "฿"];

  return (
    <Box
      minH="100vh"
      w="full"
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      px={{ base: 0, md: 8 }}
      overflowX="clip"
      opacity={isToastVisible ? "0.2" : "1"}
      bg="gray.50"
    >
      {/* Fixed Navbar at Top */}
      <Box position="fixed" top="0" left="0" w="100%" zIndex="1000">
        <Navbar isToastVisible={isToastVisible} />
      </Box>
      <LayerBlur2 />

      <Container maxW="container.lg" w="full" mt="80px" pb={10} px={{ base: 0, md: 4 }}>
        {isMobile ? (
          /* Mobile Layout - Full width image */
          <Box>
            {/* Hero Image - Full width on mobile */}
            <Image
              src={event.image || "/assets/images/hero.jpg"}
              alt={event.title || "Event"}
              objectFit="cover"
              w="full"
              h="300px"
            />

            {/* Event Title */}
            <Box px={4} mt={4}>
              <Heading fontSize="2xl" fontWeight="bold" mb={2}>
                {event.title}
              </Heading>
              {event.instagramHandle && (
                <Button
                  as="a"
                  href={event.instagramHandle}
                  target="_blank"
                  size="sm"
                  colorScheme="pink"
                  borderRadius="full"
                  leftIcon={<FaInstagram />}
                  mb={4}
                >
                  Event Page
                </Button>
              )}
            </Box>
          </Box>
        ) : (
          /* Desktop Layout - Split image and content */
          <Grid templateColumns="repeat(2, 1fr)" gap={8} alignItems="start">
            {/* Image Column */}
            <GridItem>
              <Image
                src={event.image || "/assets/images/hero.jpg"}
                alt={event.title || "Event"}
                objectFit="cover"
                w="full"
                h="500px"
                borderRadius="xl"
              />
            </GridItem>

            {/* Content Column */}
            <GridItem>
              <Heading fontSize="3xl" fontWeight="bold" mb={4}>
                {event.title}
              </Heading>
              {event.instagramHandle && (
                <Button
                  as="a"
                  href={event.instagramHandle}
                  target="_blank"
                  size="md"
                  colorScheme="pink"
                  borderRadius="full"
                  leftIcon={<FaInstagram />}
                  mb={6}
                >
                  Event Page
                </Button>
              )}
            </GridItem>
          </Grid>
        )}

        {/* Event Info Cards - Below image on mobile, in content column on desktop */}
        <Box px={{ base: 4, md: 0 }} mt={{ base: 4, md: isMobile ? 4 : 0 }}>
          {!isMobile && (
            <Grid templateColumns="repeat(2, 1fr)" gap={8}>
              <GridItem colSpan={1}>
                {/* Empty space to align with image */}
              </GridItem>
              <GridItem>
                <Flex
                  direction="row"
                  gap={4}
                  mb={8}
                  flexWrap="wrap"
                >
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="lg"
                    boxShadow="md"
                    flex="1"
                    minW="200px"
                  >
                    <HStack spacing={3} align="center">
                      <CalendarIcon color="orange.500" boxSize={5} />
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" color="gray.500">
                          Date
                        </Text>
                        <Text fontWeight="medium">
                          {formatDateWithDay(event.date)}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>

                  <Box
                    bg="white"
                    p={4}
                    borderRadius="lg"
                    boxShadow="md"
                    flex="1"
                    minW="200px"
                  >
                    <HStack spacing={3} align="center">
                      <TimeIcon color="orange.500" boxSize={5} />
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" color="gray.500">
                          Time
                        </Text>
                        <Text fontWeight="medium">
                          {event.startTime} - {event.endTime}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </Flex>

                <Flex
                  direction="row"
                  gap={4}
                  mb={8}
                  flexWrap="wrap"
                >
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="lg"
                    boxShadow="md"
                    flex="1"
                    minW="200px"
                  >
                    <HStack spacing={3} align="center">
                      <Icon as={MdLocationOn} color="orange.500" boxSize={5} />
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" color="gray.500">
                          Location
                        </Text>
                        <Text fontWeight="medium">{event.location}</Text>
                      </VStack>
                    </HStack>
                  </Box>

                  <Box
                    bg="white"
                    p={4}
                    borderRadius="lg"
                    boxShadow="md"
                    flex="1"
                    minW="200px"
                  >
                    <HStack spacing={3} align="center">
                      <Icon as={MdAttachMoney} color="orange.500" boxSize={5} />
                      <VStack align="start" spacing={0}>
                        <Text fontSize="sm" color="gray.500">
                          Price
                        </Text>
                        <Text fontWeight="medium">
                          {event.fees} {currencies[0] || ""}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </Flex>
              </GridItem>
            </Grid>
          )}

          {/* Mobile Info Cards */}
          {isMobile && (
            <Flex
              direction="column"
              gap={4}
              mb={8}
            >
              <Box
                bg="white"
                p={4}
                borderRadius="lg"
                boxShadow="md"
              >
                <HStack spacing={3} align="center">
                  <CalendarIcon color="orange.500" boxSize={5} />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" color="gray.500">
                      Date
                    </Text>
                    <Text fontWeight="medium">
                      {formatDateWithDay(event.date)}
                    </Text>
                  </VStack>
                </HStack>
              </Box>

              <Box
                bg="white"
                p={4}
                borderRadius="lg"
                boxShadow="md"
              >
                <HStack spacing={3} align="center">
                  <TimeIcon color="orange.500" boxSize={5} />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" color="gray.500">
                      Time
                    </Text>
                    <Text fontWeight="medium">
                      {event.startTime} - {event.endTime}
                    </Text>
                  </VStack>
                </HStack>
              </Box>

              <Box
                bg="white"
                p={4}
                borderRadius="lg"
                boxShadow="md"
              >
                <HStack spacing={3} align="center">
                  <Icon as={MdLocationOn} color="orange.500" boxSize={5} />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" color="gray.500">
                      Location
                    </Text>
                    <Text fontWeight="medium">{event.location}</Text>
                  </VStack>
                </HStack>
              </Box>

              <Box
                bg="white"
                p={4}
                borderRadius="lg"
                boxShadow="md"
              >
                <HStack spacing={3} align="center">
                  <Icon as={MdAttachMoney} color="orange.500" boxSize={5} />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="sm" color="gray.500">
                      Price
                    </Text>
                    <Text fontWeight="medium">
                      {event.fees} {currencies[0] || ""}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </Flex>
          )}
        </Box>

        {/* CTA Button */}
        <Flex justify="center" mb={10} px={{ base: 4, md: 0 }}>
          <Button
            as={event.googleMapsLink ? "a" : "button"}
            href={event.googleMapsLink || "#"}
            target={event.googleMapsLink ? "_blank" : undefined}
            size="lg"
            colorScheme="orange"
            borderRadius="full"
            px={10}
            rightIcon={<MdLink />}
            onClick={!event.googleMapsLink ? (e) => e.preventDefault() : undefined}
            cursor={event.googleMapsLink ? "pointer" : "not-allowed"}
            opacity={!event.googleMapsLink ? 0.7 : 1}
          >
            {event.googleMapsLink ? "View Location on Map" : "Location Not Available"}
          </Button>
        </Flex>

        {/* About Section */}
        <Box
          bg="white"
          p={6}
          borderRadius={{ base: "none", md: "xl" }}
          boxShadow={{ md: "md" }}
          mb={8}
          mx={{ base: 0, md: "auto" }}
        >
          <Heading fontSize="2xl" mb={4} color="gray.800">
            About the Event
          </Heading>
          <Text fontSize="md" color="gray.700" lineHeight="1.7" mb={4}>
            {event.description || "No description available."}
          </Text>
          {event.musicRatio && (
            <Box mt={4}>
              <Text fontWeight="semibold" mb={2}>
                Music Ratio:
              </Text>
              <Text fontSize="sm" color="gray.600">
                {event.musicRatio}
              </Text>
            </Box>
          )}
        </Box>

        {/* Details Section */}
        <Box
          bg="white"
          p={6}
          borderRadius={{ base: "none", md: "xl" }}
          boxShadow={{ md: "md" }}
          mb={8}
          mx={{ base: 0, md: "auto" }}
        >
          <Heading fontSize="2xl" mb={4} color="gray.800">
            Event Details
          </Heading>
          <VStack align="start" spacing={4}>
            <Box>
              <Text fontWeight="semibold" mb={1}>
                Date:
              </Text>
              <Text color="gray.600">{formatDateWithDay(event.date)}</Text>
            </Box>
            <Box>
              <Text fontWeight="semibold" mb={1}>
                Time:
              </Text>
              <Text color="gray.600">
                {event.startTime} - {event.endTime}
              </Text>
            </Box>
            <Box>
              <Text fontWeight="semibold" mb={1}>
                Location:
              </Text>
              <Text color="gray.600">{event.location}</Text>
            </Box>
            <Box>
              <Text fontWeight="semibold" mb={1}>
                Entry Fee:
              </Text>
              <Text color="gray.600">
                {event.fees} {currencies[0] || ""}
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Reviews Section */}
        <Box
          bg="white"
          p={6}
          borderRadius={{ base: "none", md: "xl" }}
          boxShadow={{ md: "md" }}
          mx={{ base: 0, md: "auto" }}
        >
          <Heading fontSize="2xl" mb={4} color="gray.800">
            Reviews
          </Heading>
          <Text color="gray.500" fontStyle="italic">
            Coming soon...
          </Text>
        </Box>
      </Container>
    </Box>
  );
}