package com.example.smartlock.service;

import com.example.smartlock.model.User;
import com.example.smartlock.repository.UserRepo;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User save(String name) {
        return userRepo.save(name);
    }

    public User findById(Long id) {
        return userRepo.findById(id);
    }

}
