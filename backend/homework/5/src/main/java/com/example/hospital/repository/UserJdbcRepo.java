package com.example.hospital.repository;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.hospital.dto.UserRequestDTO;

@Repository
public class UserJdbcRepo {

    private final JdbcTemplate jdbc;

    public UserJdbcRepo(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void saveUser(UserRequestDTO dto) {
        String sql = """
            INSERT INTO users (username, timezone, logged_in, tenant_id)
            VALUES (?, ?, ?, ?)
        """;
        jdbc.update(sql, dto.username, dto.timezone, dto.loggedIn, dto.tenantId);
    }

    public List<Map<String, Object>> findUsersByTenant(
            UUID tenantId, int limit, int offset, String sortDir) {

        String sql = """
            SELECT * FROM users
            WHERE tenant_id = ?
            ORDER BY username %s
            LIMIT ? OFFSET ?
        """.formatted(sortDir);

        return jdbc.queryForList(sql, tenantId, limit, offset);
    }

    public void updateUser(UUID id, String username, String timezone) {
        String sql = """
            UPDATE users
            SET username = ?, timezone = ?
            WHERE id = ?
        """;
        jdbc.update(sql, username, timezone, id);
    }
}
