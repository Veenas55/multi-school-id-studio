package com.multischool.idstudio.controller;

import com.multischool.idstudio.dto.AuthResponse;
import com.multischool.idstudio.dto.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        if (request.getPasscode() == null || request.getMobileNumber() == null) {
            return ResponseEntity.badRequest().body(new AuthResponse(false, null, null, null, "Passcode and mobile number are required."));
        }

        // Demo fallback or database lookup
        boolean isAdmin = "AGENCY-2026".equalsIgnoreCase(request.getPasscode()) || "ADMIN".equalsIgnoreCase(request.getRole());
        String token = "JWT_" + UUID.randomUUID().toString();
        String role = isAdmin ? "ADMIN" : "PARENT";
        String name = isAdmin ? "Rajesh Kumar Sharma" : "Venkat Rao S.";

        AuthResponse response = new AuthResponse(true, token, role, name, "Authentication successful");
        return ResponseEntity.ok(response);
    }
}

