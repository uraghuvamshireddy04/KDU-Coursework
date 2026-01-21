package com.example.cinestream.controller;

import com.example.cinestream.Service.MovieService;
import com.example.cinestream.model.Director;
import com.example.cinestream.model.Movie;
import com.example.cinestream.repository.DirectorRepository;
import com.example.cinestream.repository.MovieRepository;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
@Controller
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService, DirectorRepository directorRepository) {
        this.movieService = movieService;
    }

    @QueryMapping
    public Movie findMovieById(@Argument Long id) {
        return movieService.getMovieById(id);
    }

    @SchemaMapping(typeName = "Movie", field = "director")
    public Director getDirector(Movie movie) {
        if (movie.getDirectorId() == null) {
            return null;
        }
        return movieService.getDirectorById(movie.getDirectorId());
    }
    @MutationMapping
    public Movie addReview(@Argument Long movieId, @Argument String comment, @Argument Integer rating) {
        return movieService.addReview(movieId, comment, rating);
    }
}