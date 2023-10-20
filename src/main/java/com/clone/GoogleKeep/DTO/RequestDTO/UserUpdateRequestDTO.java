package com.clone.GoogleKeep.DTO.RequestDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUpdateRequestDTO {

    @NotBlank(message = "Please enter your name")
    @Size(min = 2, max = 16, message = "username must contains minimum of 2 and maximum of 16 characters")
    private String firstName;

    private String lastName;

    @NotBlank(message = "Please enter a valid password")
    @Size(min = 8,max = 16, message = "The password must contain minimum of 8 and maximum 16 characters")
    private String password;

    private String gender;
}
