package com.clone.GoogleKeep.DTO.ResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthenticationResponseDTO {
    private int id;
    private String email;
    private String username;
    private String accessToken;
}
