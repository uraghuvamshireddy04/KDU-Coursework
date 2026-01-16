package com.example.hospital.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.hospital.dto.ShiftTypeDTO;

@Repository
public class ShiftTypeJdbcRepository {

    private final JdbcTemplate jdbc;

    public ShiftTypeJdbcRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void saveShiftType(ShiftTypeDTO dto) {
        String sql = """
            INSERT INTO shift_type (name, description, active_status, tenant_id)
            VALUES (?, ?, ?, ?)
        """;
        jdbc.update(sql, dto.name, dto.description, dto.active, dto.tenantId);
    }
}
