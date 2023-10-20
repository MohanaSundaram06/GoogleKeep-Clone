package com.clone.GoogleKeep.Exceptions;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApiErrorResponse {

    private int statusCode;

    private String message;

    private LocalDateTime timeStamp;

    public ApiErrorResponse(Integer statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
        this.timeStamp = LocalDateTime.now();
    }
}
