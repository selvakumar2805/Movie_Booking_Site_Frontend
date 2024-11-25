import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Box, Autocomplete, TextField, Tabs, Tab, IconButton } from "@mui/material"
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import { getAllMovies } from '../api-helpers/api-helpers';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { adminActions, userActions } from '../store';


const Header = () => {

    const dispath = useDispatch()
    

    const [value, setValue] = useState(0)
    const [movies, setMovies] = useState([])

    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn)
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn)

    useEffect(() => {
        getAllMovies()
            .then((data) => setMovies(data.movies))
            .catch((err) => console.log(err))
    }, [])

    const logout = (isAdmin) => {
        dispath(isAdmin ? adminActions.logout() : userActions.logout())
    }


    return (
        <AppBar position='sticky' sx={{ bgcolor: "#2b2d42" }}>
            <Toolbar>

                <Box bgcolor={"white"} borderRadius={"100%"}>
                    <IconButton LinkComponent={Link} to="/"> <MovieCreationIcon /> </IconButton>
                </Box>

                <Box width={"30%"} margin={"auto"}>
                    <Autocomplete
                        freeSolo
                        options={movies && movies.map((option) => option.title)}
                        renderInput={(params) => <TextField sx={{ input: { color: "white" } }} variant="standard" {...params} placeholder="Search Across Multiple Movies" />}
                    />
                </Box>

                <Box display={"flex"}>
                    <Tabs textColor="inherit" indicatorColor="secondary" value={value} onChange={(e, val) => setValue(val)}>
                        <Tab LinkComponent={Link} to="/movies" label="Movies" />

                        {!isUserLoggedIn && !isAdminLoggedIn && <>
                            <Tab LinkComponent={Link} to="/admin" label="Admin" />
                            <Tab LinkComponent={Link} to="/auth" label="User" />
                        </>}

                        {isUserLoggedIn && (<>
                            <Tab LinkComponent={Link} to="/user" label="Profile" />
                            <Tab onClick={() => logout(false)} LinkComponent={Link} to="/" label="Logout" />
                        </>)}

                        {isAdminLoggedIn && (<>
                            <Tab LinkComponent={Link} to="/add" label="Add Movie" />
                            <Tab LinkComponent={Link} to="/admin-profile" label="Profile" />
                            <Tab onClick={() => logout(true)} LinkComponent={Link} to="/" label="Logout" />
                        </>)}

                    </Tabs>
                </Box>

            </Toolbar>
        </AppBar>
    )
}

export default Header