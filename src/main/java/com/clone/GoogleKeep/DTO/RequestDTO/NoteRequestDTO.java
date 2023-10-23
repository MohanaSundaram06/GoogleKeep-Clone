package com.clone.GoogleKeep.DTO.RequestDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class NoteRequestDTO {

    @NotBlank(message = "Please enter the title")
    @Size(min = 1, max = 10, message = "Title must contains minimum of 1 and maximum of 10 characters")
    private String title;

    @NotBlank(message = "Please the title description")
    @Size(min = 1, max = 10, message = "Description must contains minimum of 1 character")
    private String description;
}
