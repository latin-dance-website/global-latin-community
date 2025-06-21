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

export default function AutoCarousel() {
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        if (response.ok) {
          setEvents(data);
        } else {
          console.error("Failed to fetch events:", data.message);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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

  if (loading) {
    return (
      <Box position="relative" pb={2} width="100%" overflow="hidden" height="300px" display="flex" justifyContent="center" alignItems="center">
        <Text>Loading events...</Text>
      </Box>
    );
  }

  if (events.length === 0) {
    return (
      <Box position="relative" pb={2} width="100%" overflow="hidden" height="300px" display="flex" justifyContent="center" alignItems="center">
        <Text>No events found</Text>
      </Box>
    );
  }

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
        mx={{base: "2.5rem", md:"4rem"}}
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
                  src={event.image || "/assets/images/default-event.jpg"}
                  alt={event.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Box p={4}>
                <Text fontWeight="bold" fontSize="lg">
                  {event.title}
                </Text>
                <HStack>
                  <FaCalendar color={event.buttonColor || "#f63c80"} />
                  <Text fontSize="sm">{event.date}</Text>
                </HStack>
                <HStack>
                  <FaClock color={event.buttonColor || "#f63c80"} />
                  <Text fontSize="sm">{event.startTime} - {event.endTime}</Text>
                </HStack>
                <HStack>
                  <FaLocationDot color={event.buttonColor || "#f63c80"} />
                  <Text fontSize="sm">{event.location}</Text>
                </HStack>
              </Box>
              <Box>
                <button
                  style={{
                    backgroundColor: event.buttonColor || "#f63c80",
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
            mt={{ sm: "2", base: "1" }}
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