package com.clone.GoogleKeep.Controller;

import com.clone.GoogleKeep.Configurations.JwtService;
import com.clone.GoogleKeep.DTO.RequestDTO.AuthenticationRequestDTO;
import com.clone.GoogleKeep.DTO.ResponseDTO.AuthenticationResponseDTO;
import com.clone.GoogleKeep.Exceptions.ApiResponse;
import com.clone.GoogleKeep.Model.User;
import com.clone.GoogleKeep.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SecurityController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponseDTO> authenticate(@RequestBody AuthenticationRequestDTO authenticationRequestDTO){

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequestDTO.getUsername(),
                        authenticationRequestDTO.getPassword()));

        if (! authentication.isAuthenticated())
            new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST,
                    "Invalid Credentials"),HttpStatus.BAD_REQUEST);

        String token = jwtService.generateToken(authenticationRequestDTO.getUsername());
        User user = userService.getUserByEmail(authenticationRequestDTO.getUsername());
        return new ResponseEntity<>(new AuthenticationResponseDTO(user.getId(), user.getEmail(),
                user.getFirstName(), token), HttpStatus.OK);
    }
}
