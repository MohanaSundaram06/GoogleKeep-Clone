package com.clone.GoogleKeep.ObjectTransfomers;

import com.clone.GoogleKeep.DTO.ResponseDTO.UserResponseDTO;
import com.clone.GoogleKeep.Model.User;

public class UserTransformer {

    public static UserResponseDTO ModelToDTO(User user){

        return UserResponseDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .gender(user.getGender().toString())
                .noteList(user.getNoteList())
                .labelList(user.getLabelList())
                .build();
    }
}
