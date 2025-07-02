import {
  Box,
  Fade,
  Grid,
  GridItem,
  Heading,
  Text,
  useBreakpoint,
  VStack,
  HStack,
  Stack,
  Button,
  Flex,
} from "@chakra-ui/react";
import {
  FiMusic,
  FiPlay,
  FiTrendingUp,
  FiGlobe,
  FiShoppingBag,
  FiUser,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";
import FeatureCard from "./FeatureCard";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

const Features = ({isSelectedTileEvent, setIsSelectedTileEvent}) => {
  const router = useRouter();
  const [currentlySelectedCard, setCurrentlySelectedCard] =
    useState("Music & Culture");
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [dynamicText, setDynamicText] = useState(
    "Dive into the rhythm, instruments, and stories that define the soul of Latin music and dance culture."
  );



  const cardData = useMemo(
    () => [
      {
        icon: FiTrendingUp,
        title: "Events",
        description:
          "Attend exclusive workshops, bootcamps, and live events hosted by top Latin dance experts.",
        link: "See Events",
        href: "/events",
      },
      {
        icon: FiMusic,
        title: "Music & Culture",
        description:
          "Dive into the rhythm, instruments, and stories that define the soul of Latin music and dance culture.",
        link: "Explore",
        href: "/music-culture",
      },
      {
        icon: FiPlay,
        title: "Tutorials & Courses",
        description:
          "Access beginner to advanced tutorials and structured courses designed for your growth, wherever you are.",
        link: "Start Learning",
        href: "/tutorial-courses",
      },
      {
        icon: FiUser,
        title: "Brand Building",
        description:
          "Create your professional profile, showcase your achievements, and grow your influence as a dancer or instructor.",
        link: "Start Building",
        href: "/brand",
      },
      {
        icon: FiGlobe,
        title: "Global Community",
        description:
          "Join a vibrant global network of dancers. Share your journey, collaborate, and celebrate together.",
        link: "Join The Community",
        href: "/global-community",
      },
      {
        icon: FiShoppingBag,
        title: "E-Commerce",
        description:
          "Discover premium dancewear, accessories, and lifestyle products that elevate your practice and performances.",
        link: "Shop Now",
        href: "/ecommerce",
      },
    ],
    []
  );

  useEffect(() => {
    setIsTransitioning(false);
    console.log(currentlySelectedCard);

    const timeoutId = setTimeout(() => {
      const selectedCard = cardData.find(
        (obj) => obj.title === currentlySelectedCard
      );

      setDynamicText(selectedCard.description);
      console.log(currentlySelectedCard);
      setIsTransitioning(true);
    }, 600);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [cardData, currentlySelectedCard]);

  let currentBreakpoint = useBreakpoint();



  const handleEventsBannerClick = () => {
    router.push('/events/socials');
  };

  return (
    <VStack
      px={{ base: "1rem", md: "4rem", lg: "4rem", xl: "7rem", "2xl": "10rem" }}
      paddingBottom={{ md: "3rem", lg: "3rem", xl: "5rem", "2xl": "8rem" }}
      bgColor="transparent"
      filter={isSelectedTileEvent ? "blur(500px)" : ""}
      marginTop={{ base: "-2rem", md: "0rem", xl: "0rem", "2xl": "0rem" }}
    >
      {/* Top Header Section */}
      {/* <VStack
        alignItems="center"
        spacing="0.25rem"
        width="100%"
        marginBottom={{ base: "2rem", md: "3rem" }}
      > */}
        {/* <Heading
          as="h3"
          fontSize={{
            base: "1rem",
            md: "1.1rem",
            lg: "1.2rem",
            xl: "1.3rem",
          }}
          fontFamily="montserrat"
          fontWeight="bold"
          lineHeight="1.1"
          textAlign="center"
        >
          The Latin Dance
        </Heading>
        <Heading
          as="h3"
          fontSize={{
            base: "1rem",
            md: "1.1rem",
            lg: "1.2rem",
            xl: "1.3rem",
          }}
          fontFamily="montserrat"
          fontWeight="bold"
          lineHeight="1.1"
          textAlign="center"
        >
          Movement
        </Heading>
        <Heading
          as="h3"
          fontSize={{
            base: "1rem",
            md: "1.1rem",
            lg: "1.2rem",
            xl: "1.3rem",
          }}
          fontFamily="montserrat"
          fontWeight="bold"
          lineHeight="1.1"
          textAlign="center"
        >
          Begins Here
        </Heading>
        <Box
          height="0.15rem"
          width="6rem"
          borderRadius={"1rem"}
          backgroundColor={"brand.purple"}
          marginTop="0.25rem"
        />
        <Text
          fontSize={{
            base: "0.7rem",
            md: "0.75rem",
            lg: "0.8rem",
          }}
          color="gray.600"
          marginTop="0.5rem"
          fontFamily="montserrat"
          textAlign="center"
        >
          Get Free Personalised Feedback & Insights of your dancing journey!
        </Text>
      </VStack> */}

      {/* Events Banner */}
      {/* <Box
        width="100%"
        maxWidth="900px"
        mb={{ base: "2rem", md: "3rem" }}
         mt={{ base: "-6rem", md: "-2rem" }}
        cursor="pointer"
        onClick={handleEventsBannerClick}
        _hover={{ transform: "translateY(-2px)" }}
        transition="all 0.3s ease"
      > */}
        {/* <Box
          bgGradient="linear(135deg, brand.purple 0%, brand.pink 100%)"
          borderRadius="xl"
          p={{ base: "1.5rem", md: "2rem" }}
          position="relative"
          overflow="hidden"
          boxShadow="lg"
        > */}
          {/* Background decoration */}
          {/* <Box
            position="absolute"
            top="-50%"
            right="-10%"
            width="200px"
            height="200px"
            borderRadius="full"
            bg="whiteAlpha.200"
            opacity="0.3"
          /> */}
          {/* <Box
            position="absolute"
            bottom="-30%"
            left="-5%"
            width="150px"
            height="150px"
            borderRadius="full"
            bg="whiteAlpha.100"
            opacity="0.4"
          /> */}
          
          {/* <Flex
            alignItems="center"
            justifyContent="space-between"
            flexDirection={{ base: "column", md: "row" }}
            gap={{ base: "1rem", md: "2rem" }}
            position="relative"
            zIndex="1"
          > */}
            {/* <VStack
              alignItems={{ base: "center", md: "flex-start" }}
              spacing="0.5rem"
              flex="1"
            > */}
              {/* <HStack spacing="0.5rem">
                <FiCalendar size="20px" color="white" />
                <Heading
                  as="h3"
                  fontSize={{ base: "1.2rem", md: "1.4rem", lg: "1.6rem" }}
                  color="white"
                  fontFamily="montserrat"
                  fontWeight="bold"
                  textAlign={{ base: "center", md: "left" }}
                >
                  Live Social Events
                </Heading>
              </HStack> */}
              
              {/* <HStack spacing="0.5rem" opacity="0.9" alignItems="flex-start">
                <FiMapPin size="28px" color="white" />
                <Text
                  color="white"
                  fontSize={{ base: "0.9rem", md: "1rem" }}
                  fontFamily="montserrat"
                  textAlign={{ base: "center", md: "left" }}
                  lineHeight="1.2"
                >
                  Discover verified Global Social Nights in Hanoi • Bangkok • Bangalore
                </Text>
              </HStack> */}
            {/* </VStack> */}
            
            {/* <Button
              bg="whiteAlpha.200"
              color="white"
              border="2px solid"
              borderColor="whiteAlpha.300"
              _hover={{
                bg: "white",
                color: "brand.purple",
                borderColor: "white",
              }}
              size={{ base: "md", md: "lg" }}
              fontFamily="montserrat"
              fontWeight="bold"
              borderRadius="lg"
              px="2rem"
            >
              Explore Events
            </Button> */}
          {/* </Flex> */}
        {/* </Box> */}
      {/* </Box> */}

      {/* Start Here Button */}
      {/* <Button
        bg="brand.blue"
        color="white"
        _hover={{ bg: "blue.600" }}
        size={{ base: "lg", md: "xl" }}
        fontFamily="montserrat"
        fontWeight="bold"
        borderRadius="lg"
        px="3rem"
        py="1.5rem"
        fontSize={{ base: "1rem", md: "1.2rem" }}
        mb={{ base: "3rem", md: "4rem" }}
        onClick={() => router.push('/video-upload')}
      >
        Start Here
      </Button> */}

      {/* Main Content */}
      <VStack
        spacing={{
          base: "0.75rem",
          md: "0.75rem",
          lg: "0.75rem",
          xl: "0.75rem",
          "2xl": "1rem",
        }}
        textAlign="center"
        mb="10"
        width="100%"
      >
        <Heading
          as="h1"
          fontSize={{
            base: "2rem",
            md: "2.2rem",
            lg: "2.5rem",
            xl: "3rem",
            "2xl": "3rem",
          }}
          fontFamily="montserrat"
        >
          Step Into The World Of Latin Dancing
        </Heading>
        <Box
          height="0.2rem"
          width="20rem"
          borderRadius={"1rem"}
          backgroundColor={"brand.purple"}
          alignSelf="center"
        />
        {currentBreakpoint !== "base" && (
          <>
            <Text
              fontSize={{ base: "1rem", md: "1rem", lg: "1rem", xl: "1.2rem" }}
              fontStyle="italic"
              marginTop="1rem"
              fontFamily={"montserrat"}
            >
              Here you can,{" "}
            </Text>
            <Fade
              transition={{ exit: { duration: 0.3 }, enter: { duration: 0.3 } }}
              in={isTransitioning}
            >
              <Text
                as="span"
                fontWeight="bold"
                fontSize={{
                  base: "0.8rem",
                  md: "1rem",
                  lg: "1rem",
                  xl: "1.2rem",
                }}
                fontStyle="italic"
                fontFamily={"montserrat"}
              >
                {dynamicText}
              </Text>
            </Fade>
          </>
        )}
      </VStack>

      {/* Grid */}
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        columnGap={{
          base: "1rem",
          md: "3.5rem",
          lg: "2rem",
          xl: "3rem",
          "2xl": "5rem",
        }}
        rowGap={{ base: "1rem", md: "2rem", lg: "3rem", xl: "4rem" }}
        width={{ base: "75%", md: "100%", lg: "100%", xl: "80%", "2xl": "75%" }}
      >
        {cardData.map((card, index) => (
          <GridItem key={index}>
            <FeatureCard
              icon={card.icon}
              title={card.title}
              description={card.description}
              link={card.link}
              href={card.href}
              setCurrentlySelectedCard={setCurrentlySelectedCard}
              setIsSelectedTileEvent = {setIsSelectedTileEvent}
            />
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

export default Features;