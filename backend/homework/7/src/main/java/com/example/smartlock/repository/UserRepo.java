package com.example.smartlock.repository;

import java.util.HashMap;
import java.util.Map;

import com.example.smartlock.model.User;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepo {
    private final Map<Long, User> userdb = new HashMap<>();
    private Long counter = 1L;

    public User save(String name) {
        User user = new User();
        user.setName(name);
        user.setId(counter);
        userdb.put(counter, user);
        counter++;
        return user;
    }

    public User findById(Long id) {
        return userdb.get(id);

    }
}
