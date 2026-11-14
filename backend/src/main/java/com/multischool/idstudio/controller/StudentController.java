package com.multischool.idstudio.controller;

import com.multischool.idstudio.entity.Student;
import com.multischool.idstudio.repository.StudentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping("/school/{schoolId}")
    public List<Student> getStudentsBySchool(@PathVariable Long schoolId) {
        return studentRepository.findBySchoolId(schoolId);
    }

    @PostMapping
    public Student registerStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Student> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return studentRepository.findById(id).map(student -> {
            student.setStatus(status);
            return ResponseEntity.ok(studentRepository.save(student));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

