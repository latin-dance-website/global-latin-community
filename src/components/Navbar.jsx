import { Box, HStack, Icon, Text, useBreakpoint } from "@chakra-ui/react";
import Image from "next/image";
import { RiWhatsappFill, RiInstagramFill, RiYoutubeFill } from "react-icons/ri";
import logo from "../../public/assets/images/logo.png";
import Link from "next/link";

const Navbar = ({isToastVisible}) => {
  return (
    <HStack
      mx="auto"
      color="white"
      py={{ xl: "1rem" }}
      px={{ base: "1rem", md: "3rem", lg: "4rem", xl: "6rem", "2xl": "8rem" }}
      position="sticky"
      display="flex"
      zIndex="1000"
      height={{ base: "10vh", md: "7vh", lg: "7vh", xl: "10vh" }}
      alignItems="center"
      top="0"
      w="100vw"
      backdropFilter="auto"
      backdropBlur="0.5rem"
      justifyContent="space-between"
      bgColor="whiteAlpha.100"
      borderBottom="solid 0.1rem"
      bg={isToastVisible ? "rgba(0, 0, 0, 0.5)" : ""}
    >
      <Box
        width={{ base: "40%", md: "40%", lg: "50%", xl: "50%", "2xl": "40%" }}
        justifyContent={"start"}
      >
        <Link href="/">
          <Box
            width={{ base: "100%", md: "70%", lg: "50%", xl: "40%" }}
            display="flex"
            justifyContent="start"
            alignItems="center"
            _hover={{
              cursor: "pointer",
            }}
          >
            <Image
              src={logo}
              priority
              placeholder="blur"
              style={{
                transition: "1s",
              }}
            />
          </Box>
        </Link>
      </Box>
      <HStack
        width={{ md: "50%", lg: "50%", xl: "50%" }}
        height="full"
        gap="2rem"
        paddingX="1rem"
        justifyContent="center"
        alignItems={"center"}
        borderRadius="0.5rem"
      >
        <HStack
          // width={{ lg: "100%", xl: "80%" }}
          gap={{
            base: "1rem",
            md: "1rem",
            lg: "1.3rem",
            xl: "1.3rem",
            "2xl": "2rem",
          }}
          justifyContent="center"
          backgroundColor={"white"}
          paddingX="1rem"
          paddingY="0.5rem"
          borderRadius={{
            base:"0.4rem",
            md: "0.4rem",
            lg: "0.4rem",
            xl: "0.4rem",
            "2xl": "0.5rem",
          }}
          bg={isToastVisible ? "rgba(0, 0, 0, 0.5)" : ""}
        >
          <Text
            color="black"
            fontWeight={"semibold"}
            fontSize={{ base: "0.8rem", md: "1rem" }}
            fontFamily={"montserrat"}
            display={{ base: "none", md: "block" }}
          >
            Reach Out To Us:{" "}
          </Text>
          <Link href="https://www.instagram.com/bangalore_latin_events?igsh=ZTh6cTdoeXVrYW96" passHref>
            <a target="_blank" rel="noopener noreferrer">
              <Icon
                as={RiInstagramFill}
                fontSize={{
                  base: "1.2rem",
                  md: "1.5rem",
                  lg: "1.8rem",
                  xl: "1.8rem",
                  "2xl": "2rem",
                }}
                _hover={{
                  cursor:"pointer"
                }}
                color="brand.pink"
              />
            </a>
          </Link>
          <Link href="https://www.youtube.com/" passHref>
            <a target="_blank" rel="noopener noreferrer">
              <Icon
                as={RiYoutubeFill}
                fontSize={{
                  base: "1.2rem",
                  md: "1.5rem",
                  lg: "1.8rem",
                  xl: "1.8rem",
                  "2xl": "2rem",
                }}
                color="red"
              />
            </a>
          </Link>
          <Link href="https://chat.whatsapp.com/Lr08jfHbN3o1wI4pGAkNxY" passHref>
            <a target="_blank" rel="noopener noreferrer">
              <Icon
                as={RiWhatsappFill}
                fontSize={{
                  base: "1.2rem",
                  md: "1.5rem",
                  lg: "1.8rem",
                  xl: "1.8rem",
                  "2xl": "2rem",
                }}
                color="#25d366"
                _hover={{
                  cursor:"pointer"
                }}
              />
            </a>
          </Link>
        </HStack>
      </HStack>
    </HStack>
  );
};

export default Navbar;
