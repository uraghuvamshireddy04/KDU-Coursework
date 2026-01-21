package com.example.cinestream.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Movie {

    @Id
    private Long id;
    private String title;
    private String genre;
    private Long directorId;
    private String comment;
    private Integer rating;

    public Movie(Long id, String title, String genre, Long directorId){
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.directorId = directorId;
    }

}
