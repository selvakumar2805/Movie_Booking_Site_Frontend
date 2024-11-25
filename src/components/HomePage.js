import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from './Movies/MovieItem'
import { Link } from 'react-router-dom'
import { getAllMovies } from '../api-helpers/api-helpers'



const HomePage = () => {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        getAllMovies()
            .then((data) => setMovies(data.movies))
            .catch(err => console.log(err))
    }, [])


    return (
        <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2} >

            <Box width="80%" height={"40vh"} margin={"auto"} padding={2}>
                <img width={"100%"} height={"100%"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIqYeeXc4EVDz-vgK6lE6rNhHSiC20cKxhbA&usqp=CAU"
                    alt="Bramhastra" />
            </Box>

            <Box margin="auto" padding={5}>
                <Typography variant='h3' textAlign={"center"}>Latest Releases</Typography>
            </Box>

            <Box margin={"auto"} display="flex" width="80%" justifyContent={"center"} flexWrap="wrap" alignItems="center">
                {movies && movies.slice(0, 4).map((movie, index) =>
                (<MovieItem
                    id={movie.id}
                    title={movie.title}
                    posterUrl={movie.posterUrl}
                    releaseDate={movie.releaseDate}
                    key={index} />
                ))}
            </Box>

            <Box display="flex" padding={5} margin={"auto"}>
                <Button LinkComponent={Link} to="/movies" sx={{ margin: "auto", color: "#2b2d42" }} variant="outlined">View All Movies</Button>
            </Box>

        </Box>
    )
}

export default HomePage