package com.multischool.idstudio.controller;

import com.multischool.idstudio.entity.School;
import com.multischool.idstudio.repository.SchoolRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schools")
public class SchoolController {

    private final SchoolRepository schoolRepository;

    public SchoolController(SchoolRepository schoolRepository) {
        this.schoolRepository = schoolRepository;
    }

    @GetMapping
    public List<School> getAllSchools() {
        List<School> schools = schoolRepository.findAll();
        if (schools.isEmpty()) {
            // Seed initial sample schools if empty
            schoolRepository.save(new School("DPGA-HYD", "Delhi Public Global Academy", "CBSE Affiliated #3630129",
                    "Plot 42, Silicon Corridor, Gachibowli, Hyderabad - 500032", "+91 98480 12345", "admin@delhipublicglobal.edu.in",
                    "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=160&auto=format&fit=crop&q=80", 3420));

            schoolRepository.save(new School("SXIS-BLR", "St. Xavier's International School", "ICSE Board #KA-084",
                    "Bishop Cotton Road, Richmond Town, Bengaluru - 560025", "+91 94490 88765", "principal@stxaviersintl.edu.in",
                    "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=160&auto=format&fit=crop&q=80", 2150));

            schoolRepository.save(new School("KVMC-VIZ", "Kendriya Vidyalaya Mega Campus", "KVS Regional Office #AP-012",
                    "Waltair Uplands, Siripuram, Visakhapatnam - 530003", "+91 89125 67432", "office@kvmegacampus.ac.in",
                    "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=160&auto=format&fit=crop&q=80", 4890));

            schools = schoolRepository.findAll();
        }
        return schools;
    }

    @PostMapping
    public School createSchool(@RequestBody School school) {
        return schoolRepository.save(school);
    }

    @PutMapping("/{id}")
    public ResponseEntity<School> updateSchool(@PathVariable Long id, @RequestBody School updated) {
        return schoolRepository.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setSchoolCode(updated.getSchoolCode());
            existing.setAffiliation(updated.getAffiliation());
            existing.setAddress(updated.getAddress());
            existing.setContactPhone(updated.getContactPhone());
            existing.setTotalStudents(updated.getTotalStudents());
            existing.setLogoUrl(updated.getLogoUrl());
            return ResponseEntity.ok(schoolRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchool(@PathVariable Long id) {
        if (schoolRepository.existsById(id)) {
            schoolRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

