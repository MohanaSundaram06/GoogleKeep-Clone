package com.clone.GoogleKeep.DTO.RequestDTO;


import com.clone.GoogleKeep.Model.Gender;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRequestDTO {

    @NotBlank(message = "Please enter your name")
    @Size(min = 2, max = 16, message = "username must contains minimum of 2 and maximum of 16 characters")
    private String firstName;

    private String lastName;

    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}",
            flags = Pattern.Flag.CASE_INSENSITIVE,message = "Please enter a valid Email Id")
    private String email;

    @NotBlank(message = "Please enter a valid password")
    @Size(min = 8,max = 16, message = "The password must contain minimum of 8 and maximum 16 characters")
    private String password;

    private String gender;
}
