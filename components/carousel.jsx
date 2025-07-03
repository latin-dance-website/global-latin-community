import {
  Box,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
  VStack,
  Flex,
  useMediaQuery,
  Skeleton,
  SkeletonText,
  Image,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { FaCalendar, FaClock, FaLocationDot } from "react-icons/fa6";
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const countryCodeMap = {
  India: "IN",
  Vietnam: "VN",
  Thailand: "TH",
  USA: "US",
  Japan: "JP",
  Germany: "DE",
  France: "FR",
  Singapore: "SG",
  UAE: "AE",
};
const addFlagToCity = (citybycountry) => {
  if (!citybycountry) return { text: "", flagImageSrc: "" };

  const parts = citybycountry.split(",");
  const city = parts[0]?.trim();
  const country = parts[1]?.trim();
  const countryCode = countryCodeMap[country];
  const flagImageSrc = countryCode
    ? `/flags/${countryCode.toLowerCase()}.svg`
    : "";

  const cleanLocation = city && country ? `${city}, ${country}` : citybycountry;

  return {
    text: cleanLocation,
    flagImageSrc: flagImageSrc,
  };
};
const EventCardSkeleton = ({ isMobile, isVerySmallMobile, delay = 0 }) => (
  <Box
    flex="none"
    width={{
      base: "calc(50% - 8px)",
      md: "calc(25% - 15px)",
    }}
    maxWidth={{ base: "300px", md: "350px" }}
    opacity={0}
    animation={`fadeInUp 0.6s ease-out ${delay}ms forwards`}
    sx={{
      "@keyframes fadeInUp": {
        "0%": {
          opacity: 0,
          transform: "translateY(20px)",
        },
        "100%": {
          opacity: 1,
          transform: "translateY(0)",
        },
      },
    }}
  >
    <Box
      borderRadius="12px"
      overflow="hidden"
      bg="white"
      height={{ base: "auto", md: "300px" }} 
      border="1px solid #e2e8f0"
      boxShadow="sm"
      display="flex"
      flexDirection="column"
      position="relative"
    >
      {/* Add shimmer effect */}
      <Box
        position="absolute"
        top="0"
        left="-100%"
        width="100%"
        height="100%"
        background="linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
        animation="shimmer 1.5s infinite"
        zIndex={1}
        sx={{
          "@keyframes shimmer": {
            "0%": { left: "-100%" },
            "100%": { left: "100%" },
          },
        }}
      />
      <Skeleton height={{ base: "240px", md: "280px" }} />
      <Box p={{ base: "6px", md: "8px" }} flex="1">
        <SkeletonText noOfLines={1} mb={2} />
        <SkeletonText noOfLines={2} spacing={1} />
      </Box>
    </Box>
  </Box>
);

export default function Carousel() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCards, setShowCards] = useState(false);
  const [error, setError] = useState(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isScrolling, setIsScrolling] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isVerySmallMobile] = useMediaQuery("(max-width: 350px)");
  const cardsPerView = isMobile ? 2 : 4;
  const [touchPosition, setTouchPosition] = useState(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const todayInfo = useMemo(() => {
    const today = dayjs();
    return {
      today,
      todayFullDay: today.format("dddd"),
      todayIndex: today.day(),
    };
  }, []);
  const processEvents = useCallback(
    (data) => {
      const { today, todayFullDay, todayIndex } = todayInfo;

      return data
        .filter((e) => e.id && weekdays.includes(e.day))
        .map((e) => {
          const targetDayIndex = weekdays.indexOf(e.day);
          let offset = targetDayIndex - todayIndex;
          if (offset < 0) offset += 7;

          const targetDate = today.add(offset, "day");
          const { text: processedLocation, flagImageSrc } = addFlagToCity(
            e.citybycountry
          );

          return {
            ...e,
            originalDay: e.day,
            date: targetDate.format("ddd, DD MMM"),
            shortDate: targetDate.format("DD MMM"),
            day: targetDate.format("ddd"),
            title: e.title?.replace(/\s+/g, " ").trim() || "",
            processedLocation,
            countryFlagImage: flagImageSrc,
          };
        })
        .filter((e) => e.originalDay === todayFullDay);
    },
    [todayInfo]
  );
  const prev = useCallback(() => {
  if (events.length > 0) {
    setIndex((prev) => Math.max(0, prev - 1));
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  }
}, [events.length]);

const next = useCallback(() => {
  if (events.length > 0) {
    const maxIndex = Math.max(0, events.length - cardsPerView);
    setIndex((prev) => Math.min(maxIndex, prev + 1));
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  }
}, [events.length, cardsPerView]);

  const handleCardClick = useCallback(
    (event) => {
      sessionStorage.setItem("currentEvent", JSON.stringify(event));
      router.push("/events/social");
    },
    [router]
  );
  useEffect(() => {
    const abortController = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setShowCards(false);
        setError(null);

        const startTime = Date.now();

        const res = await fetch("/api/events", {
          signal: abortController.signal,
          headers: {
            "Cache-Control": "public, max-age=300",
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();
        const processedEvents = processEvents(data);

        setEvents(processedEvents);
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 1500 - elapsedTime);

        setTimeout(() => {
          setLoading(false);
          setTimeout(() => {
            setShowCards(true);
          }, 100);
        }, remainingTime);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("Fetch error:", e);
          setError(e.message);
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        }
      }
    }

    load();

    return () => {
      abortController.abort();
    };
  }, [processEvents]);
  const scrollTo = useCallback(
  (idx) => {
    if (!scrollRef.current || events.length === 0) return;

    setIsScrolling(true);
    const container = scrollRef.current;
    const card = container.children[0];
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const gap = isMobile ? 16 : 20;
    const scrollAmount = (cardWidth + gap) * idx;

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });

    const timeout = setTimeout(() => {
      setIsScrolling(false);
    }, 800);

    return () => clearTimeout(timeout);
  },
  [isMobile, events.length]
);

  useEffect(() => scrollTo(index), [index, scrollTo]);
  useEffect(() => {
    if (!autoPlay || events.length === 0 || events.length <= cardsPerView)
      return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const maxIndex = Math.max(0, events.length - cardsPerView);
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, events.length, cardsPerView]);

  if (loading) {
    return (
      <Box
        position="relative"
        width="100%"
        overflow="hidden"
        px={{ base: 4, md: 6 }}
        pt={4}
        pb={6}
      >
        <Box
          display="flex"
          overflowX="hidden"
          gap={{ base: 4, md: 5 }}
          justifyContent="flex-start"
        >
          {Array.from({ length: cardsPerView }).map((_, i) => (
            <EventCardSkeleton
              key={i}
              isMobile={isMobile}
              isVerySmallMobile={isVerySmallMobile}
              delay={i * 150}
            />
          ))}
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        height="200px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={2}
      >
        <Text color="red.500">Failed to load events</Text>
        <Text fontSize="sm" color="gray.500">
          {error}
        </Text>
      </Box>
    );
  }

  if (!events.length) {
    return (
      <Box
        height="200px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text>No events found for today</Text>
      </Box>
    );
  }

  const showNavigation = events.length > cardsPerView;
  const maxIndex = Math.max(0, events.length - cardsPerView);

  return (
    <Box
      position="relative"
      width="100%"
      overflow="hidden"
      px={{ base: 4, md: 6 }}
      pt={1}
      pb={6}
    >
      {/* Navigation Arrows */}
      {showNavigation && (
  <>
    <IconButton
      icon={<ChevronLeftIcon boxSize={6} />}
      aria-label="Previous"
      position="absolute"
      top="50%"
      left={2}
      transform="translateY(-50%)"
      zIndex={10}
      onClick={prev}
      bg="rgba(255,255,255,0.9)"
      color="black"
      _hover={{ bg: "rgba(255,255,255,1)" }}
      borderRadius="full"
      size="md"
      boxShadow="lg"
      isDisabled={index === 0}
      display={isMobile ? "none" : "flex"} // Only show on desktop
    />
    <IconButton
      icon={<ChevronRightIcon boxSize={6} />}
      aria-label="Next"
      position="absolute"
      top="50%"
      right={2}
      transform="translateY(-50%)"
      zIndex={10}
      onClick={next}
      bg="rgba(255,255,255,0.9)"
      color="black"
      _hover={{ bg: "rgba(255,255,255,1)" }}
      borderRadius="full"
      size="md"
      boxShadow="lg"
      isDisabled={index >= maxIndex}
      display={isMobile ? "none" : "flex"} // Only show on desktop
    />
  </>
)}

      {/* Cards Container */}
     <Box
  ref={scrollRef}
  display="flex"
  overflowX="hidden"
  gap={{ base: 4, md: 5 }}
  sx={{
    "&::-webkit-scrollbar": { display: "none" },
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }}
  justifyContent={{
    base: "flex-start", // Always left-aligned on mobile
    md: events.length < 5 ? "center" : "flex-start" // Centered on desktop if <5 cards
  }}
  onTouchStart={(e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  }}
  onTouchMove={(e) => {
    const touchDown = touchPosition;
    
    if (touchDown === null) {
      return;
    }
    
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;
    
    if (diff > 5) {
      // Swipe left - go next
      next();
      setTouchPosition(null);
    }
    
    if (diff < -5) {
      // Swipe right - go previous
      prev();
      setTouchPosition(null);
    }
  }}
  onTouchEnd={() => {
    setTouchPosition(null);
  }}
>
        {events.map((event, eventIndex) => (
          <Box
            key={`${event.id}-${event.city}`}
            flex="none"
            width={{
  base: events.length === 1 ? "80%" : `calc(50% - 8px)`,
  md:
    events.length === 1
      ? "260px"
      : events.length === 2
      ? "calc(48% - 10px)"
      : events.length === 3
      ? "calc(30% - 12px)"
      : "calc(22% - 10px)", // 🔽 reduce card width for 4+ cards
}}
            onClick={() => {
              handleCardClick(event);
              setAutoPlay(false);
            }}
            cursor="pointer"
            maxWidth={{ base: "300px", md: "280px" }} // 🔽 narrower on desktop
            opacity={showCards ? 1 : 0}
            transform={showCards ? "translateY(0)" : "translateY(30px)"}
            transition={`all 0.8s ease-out ${eventIndex * 100}ms`}
          >
            <Box
              borderRadius="12px"
              overflow="hidden"
              bg="white"
              height={{ base: "auto", md: "350px" }}
              border="1px solid #e2e8f0"
              boxShadow="sm"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "xl",
                borderColor: "#f63c80",
              }}
              transition="all 0.3s ease"
              display="flex"
              flexDirection="column"
            >
              {/* Event Image with lazy loading */}
              <Box
                width="100%"
                height={{ base: "240px", md: "280px" }}
                overflow="hidden"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bg="#f8f9fa"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Event Details */}
              <Box
                p={{ base: "6px", md: "8px" }}
                flex="1"
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
              >
                {/* Title */}
                <Text
                  fontSize={{
                    base: isVerySmallMobile ? "10px" : "11px",
                    sm: "12px",
                    md: "13px",
                  }}
                  fontWeight="700"
                  noOfLines={1}
                  lineHeight="1.2"
                  color="#E53E3E"
                  width="100%"
                  textAlign="center"
                  mb={{ base: "4px", md: "6px" }}
                  px={1}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {event.title}
                </Text>

                {/* Mobile Layout */}
                {isMobile ? (
                  <Flex
                    align="flex-start"
                    justify="center"
                    width="100%"
                    gap={0.5}
                    px={0}
                  >
                    {/* Icons column */}
                    <VStack
                      spacing={1}
                      align="center"
                      mt="1px"
                      width="12px"
                      flexShrink={0}
                      ml={0.5}
                    >
                      <Box
                        color="#6366f1"
                        fontSize="10px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="12px"
                        height="12px"
                        mt="-1px"
                        ml="-6px"
                      >
                        <FaCalendar />
                      </Box>
                      <Box
                        color="#6366f1"
                        fontSize="10px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="12px"
                        height="12px"
                        mt="1px"
                        ml="-6px"
                      >
                        <FaLocationDot />
                      </Box>
                    </VStack>

                    {/* Content column */}
                    <VStack spacing={1} align="flex-start" width="100%" pr={0}>
                      {/* Date + Time Row */}
                      <Flex
                        align="center"
                        gap={1}
                        flexWrap="nowrap"
                        flex="1"
                        flexShrink={1}
                        width="100%"
                      >
                        <Flex
                          align="center"
                          gap={1}
                          whiteSpace="nowrap"
                          flexShrink={0}
                          ml="-3px"
                        >
                          <Text
                            fontSize={isVerySmallMobile ? "9px" : "10px"}
                            color="gray.600"
                            fontWeight="600"
                            lineHeight="1.3"
                            noOfLines={1}
                            overflow="hidden"
                            textOverflow="ellipsis"
                            ml="0px"
                          >
                            {event.day}, {event.shortDate}
                          </Text>
                        </Flex>
                        <Flex
                          align="center"
                          gap={0.5}
                          whiteSpace="nowrap"
                          flexShrink={1}
                          minWidth={0}
                          ml="-3px"
                        >
                          <Box
                            flexShrink={0}
                            color="#6366f1"
                            fontSize="10px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width="12px"
                            height="12px"
                            ml="6px"
                          >
                            <FaClock />
                          </Box>
                          <Text
                            fontSize={isVerySmallMobile ? "9px" : "10px"}
                            color="gray.600"
                            fontWeight="600"
                            lineHeight="1.3"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                          >
                            {event.startTime}-
                            {event.endTime === "0:00" ? "00:00" : event.endTime}{" "}
                            hrs
                          </Text>
                        </Flex>
                      </Flex>

                      {/* Location Row - use pre-processed location */}
                      <Flex align="center" gap="4px" ml="-2px" wrap="nowrap">
                        <Text
                          fontSize={isVerySmallMobile ? "9px" : "10px"}
                          color="gray.600"
                          fontWeight="600"
                          lineHeight="1.3"
                          wordBreak="break-word"
                          noOfLines={1}
                        >
                          {event.processedLocation}
                        </Text>
                        {/*  Display flag image for mobile */}
                        {event.countryFlagImage && (
                          <Image
                            src={event.countryFlagImage}
                            alt={`${event.processedLocation} flag`}
                            boxSize={isVerySmallMobile ? "10px" : "12px"}
                            objectFit="contain"
                            ml="1px"
                          />
                        )}
                      </Flex>
                    </VStack>
                  </Flex>
                ) : (
                  /* Desktop Layout */
                  <>
                    <Flex
  align="center"
  justify="center"
  width="100%"
  gap={{ base: 4, md: 6 }}
  mb={{ base: "3px", md: "4px" }}
>
  {/* Date */}
  <Flex align="center" gap={1}>
    <Box color="#6366f1" fontSize="13px">
      <FaCalendar />
    </Box>
    <Text
      fontSize="12px"
      color="gray.600"
      fontWeight="600"
      noOfLines={1}
      lineHeight="1.3"
      textAlign="center"
      wordBreak="break-word"
    >
      {event.day}, {event.shortDate}
    </Text>
  </Flex>

  {/* Time */}
  <Flex align="center" gap={1}>
    <Box color="#6366f1" fontSize="13px">
      <FaClock />
    </Box>
    <Text
      fontSize="12px"
      color="gray.600"
      fontWeight="600"
      noOfLines={1}
      lineHeight="1.3"
      textAlign="center"
      wordBreak="break-word"
    >
      {event.startTime} - {event.endTime === "0:00" ? "00:00" : event.endTime} hrs
    </Text>
  </Flex>
</Flex>


                    <Flex align="center" justify="center" width="100%">
                      <Flex align="center" gap={2}>
                        <Box flexShrink={0} color="#6366f1" fontSize="13px">
                          <FaLocationDot />
                        </Box>
                        <Flex align="center" gap="4px" wrap="nowrap">
                          <Text
                            fontSize="12px"
                            color="gray.600"
                            fontWeight="600"
                            noOfLines={2}
                            lineHeight="1.3"
                            textAlign="center"
                            wordBreak="break-word"
                          >
                            {event.processedLocation}
                          </Text>
                          {/* ✅ Display flag image for desktop */}
                          {event.countryFlagImage && (
                            <Image
                              src={event.countryFlagImage}
                              alt={`${event.processedLocation} flag`}
                              boxSize="16px"
                              objectFit="contain"
                              ml="4px"
                            />
                          )}
                        </Flex>
                      </Flex>
                    </Flex>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Dots Navigation */}
      {showNavigation && (
        <HStack justify="center" mt={2} spacing={2}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <Box
              key={`dot-${i}`}
              w={index === i ? "12px" : "8px"}
              h={index === i ? "12px" : "8px"}
              bg={index === i ? "#f63c80" : "gray.300"}
              borderRadius="full"
              transition="all 0.3s ease"
              cursor="pointer"
              onClick={() => {
                setIndex(i);
                setAutoPlay(false);
                setTimeout(() => setAutoPlay(true), 10000);
              }}
              _hover={{ bg: index === i ? "#e91e63" : "gray.400" }}
            />
          ))}
        </HStack>
      )}
    </Box>
  );
}
