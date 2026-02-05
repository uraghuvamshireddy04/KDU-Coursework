package com.example.cinestream.Exception;

public class DirectorNotFoundException extends RuntimeException {
    public DirectorNotFoundException(String message) {
        super(message);
    }
}
