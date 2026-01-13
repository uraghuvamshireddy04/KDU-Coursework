package com.example.hospital.service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.hospital.dto.UserRequestDTO;
import com.example.hospital.repository.UserJdbcRepo;

@Service
public class UserService {

    private final UserJdbcRepo repo;

    public UserService(UserJdbcRepo repo) {
        this.repo = repo;
    }

    public void createUser(UserRequestDTO dto) {
        repo.saveUser(dto);
    }

    public List<Map<String, Object>> getUsers(
            UUID tenantId, int page, int size, String sort) {

        int offset = page * size;
        return repo.findUsersByTenant(tenantId, size, offset, sort);
    }

    public void updateUser(UUID id, String username, String timezone) {
        repo.updateUser(id, username, timezone);
    }
}
