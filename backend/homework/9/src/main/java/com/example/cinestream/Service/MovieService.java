package com.example.cinestream.Service;

import com.example.cinestream.Exception.DirectorNotFoundException;
import com.example.cinestream.Exception.MovieNotFoundException;
import com.example.cinestream.model.Director;
import com.example.cinestream.model.Movie;
import com.example.cinestream.repository.DirectorRepository;
import com.example.cinestream.repository.MovieRepository;
import org.springframework.stereotype.Service;

@Service
public class MovieService {
    private final MovieRepository movieRepository;
    private final DirectorRepository directorRepository;

    public MovieService(MovieRepository movieRepository, DirectorRepository directorRepository) {
        this.movieRepository = movieRepository;
        this.directorRepository = directorRepository;
    }

    public Movie getMovieById(Long id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new MovieNotFoundException("Movie not found"));
    }
    public Director getDirectorById(Long id) {
        return directorRepository.findById(id)
                .orElseThrow(() -> new DirectorNotFoundException("Director not found"));
    }

    public Movie addReview(Long movieId, String comment, Integer rating) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new MovieNotFoundException("Movie not found"));
        movie.setComment(comment);
        movie.setRating(rating);
        return movieRepository.save(movie);
    }
}
