package com.multischool.idstudio.dto;

public class AuthResponse {
    private boolean authenticated;
    private String token;
    private String role;
    private String fullName;
    private String message;
    private Long schoolId;

    public AuthResponse() {}

    public AuthResponse(boolean authenticated, String token, String role, String fullName, String message) {
        this.authenticated = authenticated;
        this.token = token;
        this.role = role;
        this.fullName = fullName;
        this.message = message;
    }

    public boolean isAuthenticated() { return authenticated; }
    public void setAuthenticated(boolean authenticated) { this.authenticated = authenticated; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Long getSchoolId() { return schoolId; }
    public void setSchoolId(Long schoolId) { this.schoolId = schoolId; }
}

