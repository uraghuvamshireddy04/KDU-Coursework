package com.hospital.staffing.repo;

import com.hospital.staffing.entity.ShiftUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShiftUserRepository extends JpaRepository<ShiftUser, Long> {
}
