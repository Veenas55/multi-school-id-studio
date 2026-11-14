package com.multischool.idstudio.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "schools")
public class School {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String schoolCode;

    @Column(nullable = false)
    private String name;

    private String affiliation;

    @Column(columnDefinition = "TEXT")
    private String address;

    private String contactPhone;

    private String contactEmail;

    @Column(columnDefinition = "TEXT")
    private String logoUrl;

    private Integer totalStudents = 0;

    private Integer generatedCards = 0;

    private Integer pendingCards = 0;

    private Integer printedCards = 0;

    private LocalDateTime createdAt = LocalDateTime.now();

    public School() {}

    public School(String schoolCode, String name, String affiliation, String address, 
                  String contactPhone, String contactEmail, String logoUrl, Integer totalStudents) {
        this.schoolCode = schoolCode;
        this.name = name;
        this.affiliation = affiliation;
        this.address = address;
        this.contactPhone = contactPhone;
        this.contactEmail = contactEmail;
        this.logoUrl = logoUrl;
        this.totalStudents = totalStudents;
        this.pendingCards = totalStudents;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSchoolCode() { return schoolCode; }
    public void setSchoolCode(String schoolCode) { this.schoolCode = schoolCode; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAffiliation() { return affiliation; }
    public void setAffiliation(String affiliation) { this.affiliation = affiliation; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public Integer getTotalStudents() { return totalStudents; }
    public void setTotalStudents(Integer totalStudents) { this.totalStudents = totalStudents; }

    public Integer getGeneratedCards() { return generatedCards; }
    public void setGeneratedCards(Integer generatedCards) { this.generatedCards = generatedCards; }

    public Integer getPendingCards() { return pendingCards; }
    public void setPendingCards(Integer pendingCards) { this.pendingCards = pendingCards; }

    public Integer getPrintedCards() { return printedCards; }
    public void setPrintedCards(Integer printedCards) { this.printedCards = printedCards; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

