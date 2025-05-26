import {
  Box,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaCalendar, FaClock, FaLocationDot } from "react-icons/fa6";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";

const events = [
  {
    id: 1,
    title: "Music Festival",
    details: "Enjoy live music and performances.",
    location: "Central Park, NY",
    dateTime: "June 25, 2023, 6:00 PM",
    image:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=2070&auto=format&fit=crop",
    buttonColor: "#f63c80",
  },
  {
    id: 2,
    title: "Food Festival",
    details: "Taste delicious cuisines from around the world.",
    location: "Downtown LA, CA",
    dateTime: "July 10, 2023, 12:00 PM",
    image:
      "https://images.unsplash.com/photo-1587403310983-968055703d5a?q=80&w=2070&auto=format&fit=crop",
    buttonColor: "#a23cf6",
  },
  {
    id: 3,
    title: "Art Festival",
    details: "Explore amazing art and creativity.",
    location: "Art District, SF",
    dateTime: "August 15, 2023, 10:00 AM",
    image:
      "https://images.unsplash.com/photo-1593893197313-b05f4d012f8f?q=80&w=2071&auto=format&fit=crop",
    buttonColor: "#ff7c19",
  },
  {
    id: 4,
    title: "Art Festival",
    details: "Explore amazing art and creativity.",
    location: "Art District, SF",
    dateTime: "August 15, 2023, 10:00 AM",
    image:
      "https://images.unsplash.com/photo-1593893197313-b05f4d012f8f?q=80&w=2071&auto=format&fit=crop",
    buttonColor: "#ff7c19",
  },
  {
    id: 5,
    title: "Art Festival",
    details: "Explore amazing art and creativity.",
    location: "Art District, SF",
    dateTime: "August 15, 2023, 10:00 AM",
    image:
      "https://images.unsplash.com/photo-1593893197313-b05f4d012f8f?q=80&w=2071&auto=format&fit=crop",
    buttonColor: "#ff7c19",
  },
];

export default function AutoCarousel() {
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const scrollToIndex = (idx) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: idx * cardWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToIndex(index);
  }, [index]);

  const next = () => setIndex((prev) => (prev + 1) % events.length);
  const prev = () => setIndex((prev - 1 + events.length) % events.length);

  return (
    <Box position="relative" pb={2} width="100%" overflow="hidden">
      {/* Left Arrow */}
      <IconButton
        icon={<ChevronLeftIcon boxSize={isMobile ? 6 : 8} />}
        aria-label="Previous"
        position="absolute"
        top="46%"
        left={2}
        transform="translateY(-50%)"
        zIndex={1}
        onClick={prev}
        colorScheme="whiteAlpha"
        bg="rgb(246, 108, 193)"
        _hover={{ bg: "rgba(0,0,0,0.6)" }}
        borderRadius="full"
        size={isMobile ? "sm" : "md"}
      />

      {/* Right Arrow */}
      <IconButton
        icon={<ChevronRightIcon boxSize={isMobile ? 6 : 8} />}
        aria-label="Next"
        position="absolute"
        top="46%"
        right={2}
        transform="translateY(-50%)"
        zIndex={1}
        onClick={next}
        colorScheme="whiteAlpha"
        bg="rgb(246, 108, 193)"
        _hover={{ bg: "rgba(0,0,0,0.6)" }}
        borderRadius="full"
        size={isMobile ? "sm" : "md"}
      />

      {/* Carousel Content */}
      <Box
        ref={scrollRef}
        mx={"1.5rem"}
        mt="8px"
        display="flex"
        overflow="clip"
        borderRadius={"15px"}
        scrollSnapType="x mandatory"
        css={{
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {events.map((event) => (
          <Box
            key={event.id}
            flex="0 0 100%"
            scrollSnapAlign="start"
            minW="100%"
          >
            <Box
              mx={2}
              borderRadius="20px"
              overflow="hidden"
              boxShadow="lg"
              bg="white"
              display="flex"
              flexDirection="column"
            >
              <Box height="200px" overflow="hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Box p={4}>
                <Text fontWeight="bold" fontSize="xl">
                  {event.title}
                </Text>
                <Text fontSize="md" mb={2}>
                  {event.details}
                </Text>
                <HStack>
                  <FaCalendar color={event.buttonColor} />
                  <Text fontSize="sm">{event.dateTime.split(",")[0]}</Text>
                </HStack>
                <HStack>
                  <FaClock color={event.buttonColor} />
                  <Text fontSize="sm">{event.dateTime.split(",")[1]}</Text>
                </HStack>
                <HStack>
                  <FaLocationDot color={event.buttonColor} />
                  <Text fontSize="sm">{event.location}</Text>
                </HStack>
              </Box>
              <Box>
                <button
                  style={{
                    backgroundColor: event.buttonColor,
                    color: "white",
                    width: "100%",
                    border: "none",
                    padding: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Buy Now
                </button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Dot Indicators */}
      <HStack justify="center">
        {events.map((_, idx) => (
          <Box
            mt = {{ sm: "2", base: "-3" }}
            key={idx}
            w={index === idx ? "12px" : "8px"}
            h={index === idx ? "12px" : "8px"}
            bg={index === idx ? "blue.500" : "gray.300"}
            borderRadius="full"
            transition="all 0.3s"
            cursor="pointer"
            onClick={() => setIndex(idx)}
          />
        ))}
      </HStack>
    </Box>
  );
}
