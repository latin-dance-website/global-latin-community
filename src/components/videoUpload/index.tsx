import React, { useState } from "react";
import {
    Box,
    Button,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

type FileUploadProps = {
    videoFile: File | null;
    handleVideoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ videoFile, handleVideoUpload }) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", width: "100%", border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden" }}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Upload a file"
                value={videoFile ? videoFile.name : ""}
                InputProps={{
                    readOnly: true,
                    sx: {
                        borderRadius: "8px 0 0 8px",
                        overflow: "hidden",
                        background: "#fff"
                    }
                }}
            />
            <Button
                component="label"
                sx={{
                    background: "#9747FF",
                    color: "white",
                    textTransform: "none",
                    fontWeight: "bold",
                    borderRadius: "0 8px 8px 0",
                    padding: "12px 20px",
                    "&:hover": {
                        background: "#843CE5",
                    },
                }}
                startIcon={<CloudUploadIcon />}
            >
                Browse
                <input
                    type="file"
                    accept="video/*"
                    hidden
                    onChange={handleVideoUpload}
                />
            </Button>
        </Box>
    );
};

const VideoUpload = () => {
    const [videoLink, setVideoLink] = useState("");
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [showThankYou, setShowThankYou] = useState(false);
    const [email, setEmail] = useState("");

    // Handle file upload
    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setVideoFile(file);
            setVideoLink("");
            setShowThankYou(true);
        }
    };

    // Handle form submission
    const handleSubmit = () => {
        if (videoLink || videoFile) {
            setShowThankYou(true);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: "400px", p: 4 }}>
            {/* Upload Box */}
            {!showThankYou ? (
                <Box
                    bgcolor="white"
                    p={4}
                    borderRadius={3}
                    boxShadow={3}
                    width="100%"
                    textAlign="center"
                >
                    <Typography variant="h6" fontWeight="bold">
                        Upload Your Video
                    </Typography>

                    {/* Video Link Input */}
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        placeholder="Paste your video link here"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <InstagramIcon color="secondary" sx={{ mx: 0.5 }} />
                                    <YouTubeIcon color="error" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Typography variant="body2" color="textSecondary" my={1}>
                        or
                    </Typography>

                    {/* File Upload Button */}
                    <FileUpload videoFile={videoFile} handleVideoUpload={handleVideoUpload} />

                    {/* Submit Button with Gradient */}
                    <Button
                        fullWidth
                        sx={{
                            textTransform: "none",
                            background: "linear-gradient(180deg, #A6C8FF 0%, #6587FF 100%)",
                            color: "white",
                            fontWeight: "bold",
                            borderRadius: "16px",
                            padding: "12px 20px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                            "&:hover": {
                                background: "linear-gradient(180deg, #8DB9FF 0%, #5175FF 100%)",
                                boxShadow: "0px 5px 12px rgba(0, 0, 0, 0.2)",
                            },
                            mt :'24px'
                        }}
                        onClick={handleSubmit}
                    >
                        Submit Video for Analysis
                    </Button>
                </Box>
            ) : (
                // Thank You Box (Replaces Upload Box)
                <Box
                    bgcolor="white"
                    p={4}
                    borderRadius={3}
                    boxShadow={3}
                    width="100%"
                    textAlign="center"
                >
                    <Typography variant="h5" fontWeight="bold">
                        Thank you!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Please enter your email to receive the report.
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        placeholder="Enter your email here..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* Submit Email Button (Same Gradient) */}
                    <Button
                        fullWidth
                        sx={{
                            textTransform: "none",
                            background: "linear-gradient(180deg, #A6C8FF 0%, #6587FF 100%)",
                            color: "white",
                            fontWeight: "bold",
                            borderRadius: "16px",
                            padding: "12px 20px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                            "&:hover": {
                                background: "linear-gradient(180deg, #8DB9FF 0%, #5175FF 100%)",
                                boxShadow: "0px 5px 12px rgba(0, 0, 0, 0.2)",
                            },
                            mt: '24px'
                        }}
                        onClick={() => setShowThankYou(false)}
                    >
                        Submit
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default VideoUpload;