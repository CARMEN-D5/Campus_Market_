package com.example.campus_market.controller;

import com.example.campus_market.entity.User;
import com.example.campus_market.repository.UserRepository;
import com.example.campus_market.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest){
        Optional<User> optionalUser = userRepository.findByUsername(loginRequest.getUsername());

        if (optionalUser.isEmpty() ||
                !optionalUser.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        User user = optionalUser.get();

        if(user == null || !user.getPassword().equals(loginRequest.getPassword())){
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(
                Map.of(
                        "token", token,
                        "user", Map.of(
                                "id", user.getId(),
                                "username", user.getUsername()
                        )
                )
        );
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ){
        if (authHeader == null || !authHeader.startsWith("Bearer ")){
            return ResponseEntity.status(401).body("Missing token");
        }

        String token = authHeader.substring(7);

        try{
            Long userId = jwtService.getUserIdFromToken(token);
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            return ResponseEntity.ok(
                    Map.of(
                            "id", user.getId(),
                            "username", user.getUsername()
                    )
            );
        }catch (Exception e){
            return ResponseEntity.status(401).body("Invalid token");
        }
    }

}
