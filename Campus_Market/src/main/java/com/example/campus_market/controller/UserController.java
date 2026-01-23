package com.example.campus_market.controller;

import com.example.campus_market.entity.User;
import com.example.campus_market.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody User user){
        if (userRepository.findByUsername(user.getUsername())!= null){
            throw new RuntimeException("User name already exists!");
        }
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User loginRequest){
        User user = userRepository.findByUsername(loginRequest.getUsername());

        if (user != null && user.getPassword().equals(loginRequest.getPassword())){
            return user;
        }else{
            throw new RuntimeException("Invalid username or password!");
        }

    }
}
