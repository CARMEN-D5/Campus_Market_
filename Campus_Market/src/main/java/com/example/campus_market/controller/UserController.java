package com.example.campus_market.controller;

import com.example.campus_market.entity.User;
//import com.example.campus_market.repository.UserRepository;
import com.example.campus_market.repository.UserRepository;
import com.example.campus_market.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody User user){
        if (userRepository.findByUsername(user.getUsername()).isPresent()){
            throw new RuntimeException("User name already exists!");
        }
        return userRepository.save(user);
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody User loginRequest){
//        User user = userRepository.findByUsername(loginRequest.getUsername());
//
//        if (user != null && user.getPassword().equals(loginRequest.getPassword())){
//            String token = jwtService.generateToken(user);
//            return ResponseEntity.ok(
//                    Map.of(
//                            "token", token,
//                            "user",Map.of(
//                                    "id", user.getId(),
//                                    "username", user.getUsername()
//                            )
//                    )
//            );
//        }else{
//            throw new RuntimeException("Invalid username or password!");
//        }

//    public User login(@RequestBody User loginRequest){
//        User user = userRepository.findByUsername(loginRequest.getUsername());
//
//        if (user != null && user.getPassword().equals(loginRequest.getPassword())){
//            return user;
//        }else{
//            throw new RuntimeException("Invalid username or password!");
//        }
//    }
//
//    @GetMapping("/me")
//    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader){
//        if(authHeader == null ||!authHeader.startsWith("Bearer ")){
//            return ResponseEntity.status(401).body("Missing token");
//        }
//
//        String token = authHeader.substring(7);
//
//        try{
//            Long userId = jwtService.getUserIdFromToken(token);
//            User user = userRepository.findById(userId)
//                    .orElseThrow(() -> new RuntimeException("User not found"));
//
//            return ResponseEntity.ok(
//                    Map.of(
//                            "id", user.getId(),
//                            "username", user.getUsername()
//                    )
//            );
//        }catch (Exception e){
//            return ResponseEntity.status(401).body("Invalid token");
//        }
//    }
}
