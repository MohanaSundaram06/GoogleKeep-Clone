package com.clone.GoogleKeep.Service.Implementaion;

import com.clone.GoogleKeep.DTO.RequestDTO.UserRequestDTO;
import com.clone.GoogleKeep.DTO.RequestDTO.UserUpdateRequestDTO;
import com.clone.GoogleKeep.Exceptions.UserAlreadyExistsException;
import com.clone.GoogleKeep.Exceptions.UserNotFoundException;
import com.clone.GoogleKeep.Model.Gender;
import com.clone.GoogleKeep.Model.User;
import com.clone.GoogleKeep.Repository.UserRepository;
import com.clone.GoogleKeep.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User registerUser(UserRequestDTO userRequestDTO) {

        if(userRepository.existsByEmail(userRequestDTO.getEmail()))
            throw new UserAlreadyExistsException( String.format("%s already exists",userRequestDTO.getEmail()));

        User user = new User();
        user.setFirstName(userRequestDTO.getFirstName());
        user.setLastName(userRequestDTO.getLastName());
        user.setEmail(userRequestDTO.getEmail());
        user.setPassword(userRequestDTO.getPassword());
        user.setGender(userRequestDTO.getGender()
                .equalsIgnoreCase("male") ? Gender.MALE : Gender.FEMALE);

        return userRepository.save(user);
    }

    @Override
    public User getUserById(int userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User does not exist"));
    }

    @Override
    public User updateUser(int userId, UserUpdateRequestDTO userUpdateRequestDTO) {

        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User does not exist"));

        user.setFirstName(userUpdateRequestDTO.getFirstName());
        user.setLastName(userUpdateRequestDTO.getLastName());
        user.setPassword(userUpdateRequestDTO.getPassword());
        user.setGender(userUpdateRequestDTO.getGender()
                .equalsIgnoreCase("male") ? Gender.MALE : Gender.FEMALE);

        return userRepository.save(user);
    }
}
