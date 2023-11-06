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
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(UserRequestDTO userRequestDTO) {
        if(userRepository.existsByEmail(userRequestDTO.getEmail()))
            throw new UserAlreadyExistsException( String.format("%s already exists",userRequestDTO.getEmail()));

        User user = new User();
        user.setFirstName(userRequestDTO.getFirstName());
        user.setLastName(userRequestDTO.getLastName());
        user.setEmail(userRequestDTO.getEmail());
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        user.setPassword(bCryptPasswordEncoder.encode(userRequestDTO.getPassword()));
        user.setGender(userRequestDTO.getGender()
                .equalsIgnoreCase("male") ? Gender.MALE : Gender.FEMALE);

        return userRepository.save(user);
    }

    @Override
    public User getUserById(int userId) {
        User user =  userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User does not exist"));

        if(!SecurityContextHolder.getContext().getAuthentication().getName().equals(user.getEmail()))
            throw new AccessDeniedException("Access Denied");

        return user;
    }

    @Override
    public User updateUser(int userId, UserUpdateRequestDTO userUpdateRequestDTO) {

        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User does not exist"));

        if(!SecurityContextHolder.getContext().getAuthentication().getName().equals(user.getEmail()))
            throw new AccessDeniedException("Access Denied");

        user.setFirstName(userUpdateRequestDTO.getFirstName());
        user.setLastName(userUpdateRequestDTO.getLastName());
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        user.setPassword(bCryptPasswordEncoder.encode(userUpdateRequestDTO.getPassword()));
        user.setGender(userUpdateRequestDTO.getGender()
                .equalsIgnoreCase("female") ? Gender.FEMALE : Gender.MALE);

        return userRepository.save(user);
    }

    @Override
    public User getUserByEmail(String username) {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UserNotFoundException("User does not exist"));

        return user;
    }
}
