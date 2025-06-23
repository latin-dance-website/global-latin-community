import { Box, HStack, IconButton, Text, useBreakpointValue } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState, useEffect, useRef } from "react";
import { FaCalendar, FaClock, FaLocationDot } from "react-icons/fa6";
import dayjs from "dayjs";

export default function CityEventsCarousel({ city, dateRange, events }) {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [index, setIndex] = useState(0);
  const scrollRef = useRef(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (!events) return;

    let result = [...events];
    if (dateRange && dateRange[0] && dateRange[1]) {
      const startDate = dayjs(dateRange[0]);
      const endDate = dayjs(dateRange[1]);
      
      result = result.filter(event => {
        const eventDate = dayjs(event.date);
        return eventDate.isBetween(startDate, endDate, null, '[]');
      });
    }

    setFilteredEvents(result);
  }, [events, dateRange]);

  // Carousel navigation functions
  const scrollTo = (idx) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.children[0]?.offsetWidth || 0;
    const scrollAmount = cardWidth + 16;
    const target = isMobile
      ? idx * scrollAmount
      : idx * scrollAmount - (container.offsetWidth - cardWidth) / 2;

    container.scrollTo({ left: target, behavior: "smooth" });
  };

  useEffect(() => scrollTo(index), [index, isMobile]);

  if (!filteredEvents.length) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="lg">
          No events found for {city}
          {dateRange && dateRange[0] && dateRange[1] && (
            <> between {dayjs(dateRange[0]).format("MMM D")} and {dayjs(dateRange[1]).format("MMM D, YYYY")}</>
          )}
        </Text>
      </Box>
    );
  }

  return (
    <Box mt={8} position="relative">
      <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center" color="#f63c80">
        Events in {city}
        {dateRange && dateRange[0] && dateRange[1] && (
          <Text fontSize="md" color="gray.600">
            {dayjs(dateRange[0]).format("MMM D")} - {dayjs(dateRange[1]).format("MMM D, YYYY")}
          </Text>
        )}
      </Text>

      {/* Carousel implementation */}
      <Box position="relative">
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Previous event"
          position="absolute"
          left={2}
          top="50%"
          transform="translateY(-50%)"
          zIndex={1}
          onClick={() => setIndex(prev => Math.max(0, prev - 1))}
        />
        
        <Box
          ref={scrollRef}
          display="flex"
          overflowX="auto"
          gap={4}
          scrollSnapType="x mandatory"
          sx={{
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </Box>

        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="Next event"
          position="absolute"
          right={2}
          top="50%"
          transform="translateY(-50%)"
          zIndex={1}
          onClick={() => setIndex(prev => Math.min(filteredEvents.length - 1, prev + 1))}
        />
      </Box>
    </Box>
  );
}

function EventCard({ event }) {
  return (
    <Box
      minWidth={{ base: "85%", md: "300px" }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      scrollSnapAlign="center"
    >
      <Box height="200px" overflow="hidden">
        <img
          src={event.image}
          alt={event.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
      <Box p={4}>
        <Text fontWeight="bold" fontSize="lg">{event.title}</Text>
        <HStack mt={2}><FaCalendar color="#f63c80" /><Text>{dayjs(event.date).format("MMM D, YYYY")}</Text></HStack>
        <HStack><FaClock color="#f63c80" /><Text>{event.startTime} - {event.endTime}</Text></HStack>
        <HStack><FaLocationDot color="#f63c80" /><Text>{event.location}</Text></HStack>
      </Box>
    </Box>
  );
}