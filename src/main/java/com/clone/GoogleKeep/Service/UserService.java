package com.clone.GoogleKeep.Service;

import com.clone.GoogleKeep.DTO.RequestDTO.UserRequestDTO;
import com.clone.GoogleKeep.DTO.RequestDTO.UserUpdateRequestDTO;
import com.clone.GoogleKeep.DTO.ResponseDTO.UserResponseDTO;
import com.clone.GoogleKeep.Model.User;
import org.springframework.stereotype.Service;


public interface UserService {
    public User registerUser(UserRequestDTO userRequestDTO);

    public User getUserById(int userId);

    public User updateUser(int userId, UserUpdateRequestDTO userUpdateRequestDTO);
}
