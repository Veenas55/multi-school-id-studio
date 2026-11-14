package com.multischool.idstudio.dto;

public class LoginRequest {
    private String passcode;
    private String mobileNumber;
    private String pin;
    private String role; // ADMIN or PARENT

    public LoginRequest() {}

    public String getPasscode() { return passcode; }
    public void setPasscode(String passcode) { this.passcode = passcode; }

    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }

    public String getPin() { return pin; }
    public void setPin(String pin) { this.pin = pin; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}

