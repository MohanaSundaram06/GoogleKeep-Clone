package com.clone.GoogleKeep.Controller;

import com.clone.GoogleKeep.DTO.RequestDTO.UserRequestDTO;
import com.clone.GoogleKeep.DTO.RequestDTO.UserUpdateRequestDTO;
import com.clone.GoogleKeep.DTO.ResponseDTO.UserResponseDTO;
import com.clone.GoogleKeep.ObjectTransfomers.UserTransformer;
import com.clone.GoogleKeep.Service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> registerUser(@Valid @RequestBody UserRequestDTO userRequestDTO){
        UserResponseDTO userResponseDTO = UserTransformer.ModelToDTO(userService.registerUser(userRequestDTO));
        return new ResponseEntity<>(userResponseDTO, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable("id") int userId){
        UserResponseDTO userResponseDTO = UserTransformer.ModelToDTO(userService.getUserById(userId));
        return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable("id") int userId,
                                                       @Valid @RequestBody UserUpdateRequestDTO userUpdateRequestDTO){
        UserResponseDTO userResponseDTO = UserTransformer.ModelToDTO(userService.updateUser(userId, userUpdateRequestDTO));
        return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
    }

}

















