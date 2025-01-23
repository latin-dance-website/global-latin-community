import React, { useState } from "react";
import { Box, Text, Grid, Divider, Icon } from "@chakra-ui/react"
import { MdAudiotrack, MdPublic, MdTrendingUp, MdLocalMall, MdOndemandVideo, MdArrowForward } from 'react-icons/md';

const obj = [
    {
        title: "Music and Culture",
        icon: MdAudiotrack,
        desc: "Dive into the rhythm, instruments, and stories that define the soul of Latin music and dance culture.",
        cta: "Explore Now",
    },
    {
        title: "Tutorials and Courses",
        desc: "Access beginner to advanced tutorials and structured courses designed for your growth, wherever you are.",
        cta: "Start Learning",
        icon: MdOndemandVideo,
    },
    {
        title: "Events",
        desc: "Attend exclusive workshops, bootcamps, and live events hosted by top Latin dance experts.",
        cta: "See Events",
        icon: MdTrendingUp,
    },
    {
        title: "Brand building",
        desc: "Create your professional profile, showcase your achievements, and grow your influence as a dancer or instructor.",
        cta: "Start Building",
        icon: MdTrendingUp,
    },
    {
        title: "Global Community",
        desc: "Join a vibrant global network of dancers. Share your journey, collaborate, and celebrate together.",
        cta: "Join the Community",
        icon: MdPublic,
    },
    {
        title: "E-commerce",
        desc: "Discover premium dancewear, accessories, and lifestyle products that elevate your practice and performances.",
        cta: "Shop Now",
        icon: MdLocalMall,
    },
];

const styles = {
    cardStyles: {
        background: "linear-gradient(to right bottom, rgb(142, 163, 244), rgb(60, 113, 255))",
        borderRadius: "8px",
        minHeight: "200px",
        maxWidth: "300px",
        p: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        mb: "24px",
        boxShadow:"10px 10px 2px rgba(0, 0, 0, 0.1)"
    },
    container: {
        //background: "linear-gradient(180deg, #FFD1E3, #FCEBF4)",
        minHeight: "420px",
        width: "100%",
        mt: "16px",
        p: "16px",
        pb: "32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
       // maxWidth: "1280px",
        margin: "auto",
    },
};

const Card = ({ item, callback }) => {
    const IconComponent = item.icon;

    return (
        <Box {...styles.cardStyles} onMouseEnter={() => callback(item.desc)}>
            <Box>
                <Icon as={IconComponent} boxSize="24px" color="#fff" mb="8px" />
                <Text
                    fontSize= "20px"
                    fontWeight= "600"
                    mb= "8px"
                    fontFamily= "Montserrat"
                    color= "#fff"
                >
                    {item.title}
                </Text>
                <Text
                    wordBreak="break-word"
                    fontSize= "14px"
                    mb= "8px"
                    fontFamily= "Montserrat"
                    color= "#fff"
                    fontWeight= "500"
                >
                    {item.desc}
                </Text>
            </Box>
            <Box>
                <Divider />
                <Box
                    display= "flex"
                    justifyContent= "space-between"
                    alignItems= "center"
                    width= "100%"
                    mt= "8px"
                    onClick={() => alert("coming soon...")}
                >
                    <Text
                        fontSize= "14px"
                        fontWeight= "500"
                        fontFamily= "Montserrat"
                        color= "#fff"
                    >
                        {item.cta}
                    </Text>
                    <MdArrowForward fontSize="16px" color='#fff' />
                </Box>
            </Box>
        </Box>
    );
};

const EcosystemBox = () => {
    const [currentText, setCurrentText] = useState("");

    return (
        <Box {...styles.container}>
            <Text
                fontSize= "3rem"
                textAlign= "center"
                fontWeight= "800"
                mt= "48px"
                fontFamily= "Montserrat"
            >
                Step Into the World Where You Can
            </Text>
            <Divider
                bgColor= "#07037C"
                my= "8px"
                height= "5px"
                width= "300px"
                alignSelf= "center"
            />

            {/* Description Box */}
            <Box
                display= "flex"
                flexDirection={"column"}
                alignItems= "center"
                justifyContent= "center" // Center align horizontally
                mb= "32px"
                gap= "8px" // Add space between the text
            >
                <Text
                    fontStyle="italic"
                    fontSize= "22px"
                    fontFamily= "Montserrat"
                    fontWeight="600"
                >
                    Here you can,
                </Text>
                <Text
                    fontSize= "18px"
                    textAlign= "center"
                    fontFamily= "Montserrat"
                    mt= '2px'
                >
                    {currentText || ""}
                </Text>
            </Box>


            {/* Grid Layout */}
            <Grid 
                templateColumns={{
                    base: "1fr", // 1 column on mobile screens
                    sm: "repeat(2, 1fr)",  // 2 columns on tablets
                    md: "repeat(3, 1fr)", // 3 columns on large screens
                }}
                gap={"3rem"}
                justifyContent= "center"
                width="100vw"
                paddingX="2rem"
                >
                {obj.map((item, index) => (
                    <Grid 
                        key={item.title + index}
                        display="flex"
                        justifyContent="center"
                    >
                        <Card item={item} callback={setCurrentText} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default EcosystemBox;