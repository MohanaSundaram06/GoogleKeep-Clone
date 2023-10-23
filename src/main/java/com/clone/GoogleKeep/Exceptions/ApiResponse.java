package com.clone.GoogleKeep.Exceptions;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApiResponse {

    private int statusCode;

    private String message;

    private LocalDateTime timeStamp;

    public ApiResponse(Integer statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
        this.timeStamp = LocalDateTime.now();
    }
}
