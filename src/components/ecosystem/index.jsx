import React, { useState } from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import PublicIcon from "@mui/icons-material/Public";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const obj = [
    {
        title: "Music and Culture",
        icon: AudiotrackIcon,
        desc: "Dive into the rhythm, instruments, and stories that define the soul of Latin music and dance culture.",
        cta: "Explore Now",
    },
    {
        title: "Tutorials and Courses",
        desc: "Access beginner to advanced tutorials and structured courses designed for your growth, wherever you are.",
        cta: "Start Learning",
        icon: OndemandVideoIcon,
    },
    {
        title: "Events",
        desc: "Attend exclusive workshops, bootcamps, and live events hosted by top Latin dance experts.",
        cta: "See Events",
        icon: TrendingUpIcon,
    },
    {
        title: "Brand building",
        desc: "Create your professional profile, showcase your achievements, and grow your influence as a dancer or instructor.",
        cta: "Start Building",
        icon: TrendingUpIcon,
    },
    {
        title: "Global Community",
        desc: "Join a vibrant global network of dancers. Share your journey, collaborate, and celebrate together.",
        cta: "Join the Community",
        icon: PublicIcon,
    },
    {
        title: "E-commerce",
        desc: "Discover premium dancewear, accessories, and lifestyle products that elevate your practice and performances.",
        cta: "Shop Now",
        icon: LocalMallIcon,
    },
];

const styles = {
    cardStyles: {
        background: "linear-gradient(180deg, #EDEDED 0%, #3C71FF 100%)",
        borderRadius: "8px",
        minHeight: "200px",
        maxWidth: "300px",
        p: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        mb: "24px",
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
        <Box sx={styles.cardStyles} onMouseEnter={() => callback(item.desc)}>
            <Box>
                <IconComponent sx={{ fontSize: "24px", color: "primary.main", mb: "8px" }} />
                <Typography
                    sx={{
                        fontSize: "20px",
                        fontWeight: "600",
                        mb: "8px",
                        fontFamily: "Montserrat",
                        color: "#fff",
                    }}
                >
                    {item.title}
                </Typography>
                <Typography
                    sx={{
                        wordWrap: "break-word",
                        fontSize: "14px",
                        mb: "8px",
                        fontFamily: "Montserrat",
                        color: "#fff",
                        fontWeight: "500",
                    }}
                >
                    {item.desc}
                </Typography>
            </Box>
            <Box>
                <Divider />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        mt: "8px",
                    }}
                    onClick={() => alert("coming soon...")}
                >
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                            fontFamily: "Montserrat",
                            color: "#fff",
                        }}
                    >
                        {item.cta}
                    </Typography>
                    <ArrowForwardIcon sx={{ fontSize: "16px", color: '#fff' }} />
                </Box>
            </Box>
        </Box>
    );
};

const EcosystemBox = () => {
    const [currentText, setCurrentText] = useState("");

    return (
        <Box sx={styles.container}>
            <Typography
                sx={{
                    fontSize: "40px",
                    textAlign: "center",
                    fontWeight: "600",
                    mt: "48px",
                    fontFamily: "Montserrat",
                }}
            >
                Step Into the World Where You Can
            </Typography>
            <Divider
                sx={{
                    bgcolor: "#07037C",
                    my: "8px",
                    height: "2px",
                    width: "260px",
                    alignSelf: "center",
                }}
            />

            {/* Description Box */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center", // Center align horizontally
                    mb: "32px",
                    gap: "8px", // Add space between the text
                }}
            >
                <Typography
                    sx={{
                        fontStyle: "italic",
                        fontSize: "24px",
                        fontFamily: "Montserrat",
                    }}
                >
                    Here you can,
                </Typography>
                <Typography
                    sx={{
                        fontSize: "20px",
                        textAlign: "center",
                        fontFamily: "Montserrat",
                        mt: '2px'
                    }}
                >
                    {currentText || ""}
                </Typography>
            </Box>


            {/* Grid Layout */}
            <Grid container spacing={2} justifyContent="center">
                {obj.map((item, index) => (
                    <Grid
                        item
                        xs={12} // 1 column on mobile screens
                        sm={6}  // 2 columns on tablets
                        md={4}  // 3 columns on large screens
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