package com.multischool.idstudio.repository;

import com.multischool.idstudio.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findBySchoolId(Long schoolId);
    Optional<Student> findBySchoolIdAndRollNumber(Long schoolId, String rollNumber);
    long countBySchoolIdAndStatus(Long schoolId, String status);
}

