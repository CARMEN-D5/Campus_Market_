package com.example.campus_market.service;

import com.example.campus_market.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Date;


@Service
public class JwtService {

    private static final String SECRET = "campus-market-secret-key-123456-campus-market-secret";
    private static final long EXPIRATION = 1000 * 60 * 60 *24;
    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(User user){
        return Jwts.builder()
                .subject(user.getUsername())
                .claim("id", user.getId())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+EXPIRATION))
                .signWith(key)
                .compact();

//                .claims(Map.of(
//                        "sub", user.getUsername(),
//                        "id", user.getId(),
//                        "iat", new Date(),
//                        "exp", new Date(System.currentTimeMillis() + EXPIRATION)
//                ))
//                .signWith(key)
//                .compact();
    }

    public Claims parseToken(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public Long getUserIdFromToken(String token){
        return parseToken(token).get("id", Long.class);
    }

    public String getUsernameFromToken(String token){
        return parseToken(token).getSubject();
    }

    public Date getExpiration(String token){
        return parseToken(token).getExpiration();
    }
}
