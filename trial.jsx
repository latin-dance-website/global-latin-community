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
} from "@chakra-ui/react";
import {
  FiMusic,
  FiPlay,
  FiTrendingUp,
  FiGlobe,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";
import FeatureCard from "./FeatureCard";
import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import { useRouter } from "next/router";
import SlideshowCard from "@components/video_upload/SlideshowCard";
import "swiper/css";
import "swiper/css/effect-cards";

const Features = ({isSelectedTileEvent, setIsSelectedTileEvent}) => {
  const router = useRouter();
  const [currentlySelectedCard, setCurrentlySelectedCard] =
    useState("Music & Culture");
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [dynamicText, setDynamicText] = useState(
    "Dive into the rhythm, instruments, and stories that define the soul of Latin music and dance culture."
  );

  // Cards data for the swiper
  const uploadCards = [
    {
      title: "Upload Your Dance",
      description: "Share a video link or file of your dance.",
      imageSrc: "/assets/Subtract.png",
      imageSize: "234px",
      backgroundColor: "rgb(147 51 234 / var(--tw-bg-opacity, 1))",
    },
    {
      title: "Expert Analysis",
      description: "Reviewed by a trusted Subject Matter Expert.",
      imageSrc: "/assets/Group14.png",
      imageSize: "206px",
      backgroundColor: "brand.pink",
    },
    {
      title: "Structured Feedback",
      description: "Receive a 'free' dance report card.",
      imageSrc: "/assets/Group16.png",
      imageSize: "150px",
      backgroundColor: "rgb(147 51 234 / var(--tw-bg-opacity, 1))",
    },
    {
      title: "Customised Road map",
      description: "Discover your tailored next steps.",
      imageSrc: "/assets/Group17.png",
      imageSize: "206px",
      backgroundColor: "brand.pink",
    },
  ];

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

  const handleCardClick = () => {
    router.push('/video-upload');
  };

  return (
    <VStack
      px={{ base: "1rem", md: "4rem", lg: "4rem", xl: "7rem", "2xl": "10rem" }}
      paddingBottom={{ md: "3rem", lg: "3rem", xl: "5rem", "2xl": "8rem" }}
      bgColor="transparent"
      filter={isSelectedTileEvent ? "blur(500px)" : ""}
      marginTop={{ base: "3rem", md: "2rem", xl: "0rem", "2xl": "0rem" }}
    >
      {/* Top Header Section with Cards */}
      <HStack
        width="100%"
        spacing={{ base: "1rem", md: "3rem", lg: "4rem" }}
        alignItems="center"
        marginBottom={{ base: "2rem", md: "3rem" }}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        {/* Left Side - Header */}
        <VStack
          alignItems={{ base: "center", md: "flex-start" }}
          spacing="0.25rem"
          width={{ base: "100%", md: "50%" }}
        >
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
            textAlign={{ base: "center", md: "left" }}
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
            textAlign={{ base: "center", md: "left" }}
          >
            Community
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
            textAlign={{ base: "center", md: "left" }}
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
            textAlign={{ base: "center", md: "left" }}
          >
            Get Free Personalised Feedback & Insights of your dancing journey!
          </Text>
        </VStack>

        {/* Right Side - Cards Swiper */}
        <Box
          display="flex"
          justifyContent="center"
          cursor="pointer"
          onClick={handleCardClick}
          width={{ base: "100%", md: "50%" }}
          maxWidth={{ base: "250px", md: "280px", lg: "300px" }}
          height={{ base: "180px", md: "200px", lg: "220px" }}
          marginTop={{ base: "1rem", md: "0" }}
        >
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Autoplay]}
            className="select-none"
            style={{ 
              width: "100%", 
              height: "100%",
            }}
            loop={true}
            autoplay={{ delay: 1200, pauseOnMouseEnter: true }}
            cardsEffect={{
              perSlideOffset: 8,
              perSlideRotate: 2,
              rotate: true,
              slideShadows: true,
            }}
          >
            {uploadCards.map((card, index) => (
              <SwiperSlide
                key={index}
                style={{
                  borderRadius: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box transform="scale(0.8)">
                  <SlideshowCard {...card} />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </HStack>

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