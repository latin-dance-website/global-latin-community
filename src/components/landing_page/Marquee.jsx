import Marquee from "react-fast-marquee";
import { Box, Text } from "@chakra-ui/react";

const MarqueeComponent = ({isSelectedTileEvent}) => {
  return (
    <Box bg="purple.600" py="1rem" filter={isSelectedTileEvent ? "blur(100px)" : ""}>
      <Marquee gradient={false} speed={50}>
        <Text
          color="white"
          fontSize="1.2rem"
          fontWeight="semibold"
          fontFamily={"montserratAlt"}
          px={{ base: "4rem", lg: "5rem", xl: "10rem", "2xl": "0rem" }}
        >
          We are building a holistic Global Latin Dance Community. Currently
          exploring the feasibility of our model in Bangalore, India. Coming
          soon to your city - stay tuned!
        </Text>
      </Marquee>
    </Box>
  );
};

export default MarqueeComponent;
