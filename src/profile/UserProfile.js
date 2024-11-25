import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { deleteBooking, getUserBooking, getUserDetails } from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const UserProfile = () => {
    const [bookings, setBookings] = useState([]); // Initialize as empty array
    const [user, setUser] = useState(null); // Initialize as null
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const bookingRes = await getUserBooking();
                setBookings(bookingRes.bookings || []); // Fallback to empty array if undefined

                const userRes = await getUserDetails();
                setUser(userRes.user || null); // Fallback to null if undefined
            } catch (err) {
                console.error(err);
                setError("Failed to load user data.");
            }
        };

        fetchUserData();
    }, []);

    const handleDelete = (id) => {
        deleteBooking(id)
            .then((res) => {
                console.log(res);
                // Optionally, refresh bookings after deletion
                setBookings((prev) => prev.filter((booking) => booking._id !== id));
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to delete booking.");
            });
    };

    return (
        <Box width={"100%"} display="flex">
            <Fragment>
                {error && <Typography color="error">{error}</Typography>} {/* Display error message */}

                {user && (
                    <Box flexDirection={"column"} justifyContent="center" alignItems={"center"} width={"30%"} padding={3}>
                        <AccountCircleIcon sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }} />
                        <Typography padding={1} width={"auto"} textAlign={"center"} border={"1px solid #ccc"} borderRadius={6}>
                            Name: {user.name}
                        </Typography>
                        <Typography mt={1} padding={1} width={"auto"} textAlign={"center"} border={"1px solid #ccc"} borderRadius={6}>
                            Email: {user.email}
                        </Typography>
                    </Box>
                )}

                {bookings.length > 0 ? ( // Check if there are bookings
                    <Box width={"70%"} display={"flex"} flexDirection={"column"}>
                        <Typography fontFamily={"verdana"} textAlign={"center"} padding={2} variant="h3">
                            Bookings
                        </Typography>

                        <Box margin={"auto"} display="flex" flexDirection={"column"} width="80%">
                            <List>
                                {bookings.map((booking) => (
                                    <ListItem key={booking._id} sx={{ bgcolor: "#00d386", color: "white", textAlign: "center", margin: 1 }}>
                                        <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left" }}>
                                            Movie: {booking.movie ? booking.movie.title : "N/A"}
                                        </ListItemText>
                                        <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left" }}>
                                            Seat: {booking.seatNumber || "N/A"}
                                        </ListItemText>
                                        <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left" }}>
                                            Date: {booking.date ? new Date(booking.date).toDateString() : "N/A"}
                                        </ListItemText>
                                        <IconButton onClick={() => handleDelete(booking._id)} color="error">
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                ) : (
                    <Box width={"70%"} textAlign="center">
                        <Typography>No bookings found.</Typography>
                    </Box>
                )}
            </Fragment>
        </Box>
    );
};

export default UserProfile;
