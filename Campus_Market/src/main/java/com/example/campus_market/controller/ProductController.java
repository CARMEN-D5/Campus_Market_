package com.example.campus_market.controller;

import com.example.campus_market.entity.Category;
import com.example.campus_market.entity.Product;
import com.example.campus_market.entity.User;
import com.example.campus_market.repository.UserRepository;
import com.example.campus_market.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")

public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    @PostMapping("/with-image")
    public Product createProductWithImage(
            @RequestParam("title") String title,
            @RequestParam("price") Double price,
            @RequestParam("description") String description,
            @RequestParam("category") Category category,
            @RequestParam("image") MultipartFile image,
            @RequestParam("userId") Long userId) throws IOException {

        // 1. Define storage path
        String uploadDir = "D:/Project/Campus_Market_/Campus_Market/uploads/";
        File dir = new File(uploadDir);
        if(!dir.exists()) dir.mkdirs();

        // 2. Rename the image, avoiding duplication
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        File saveFile = new File(uploadDir + fileName);

        // 3. Save the image
        image.transferTo(saveFile);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = new Product();
        product.setTitle(title);
        product.setPrice(price);
        product.setDescription(description);
        product.setCategory(category);
        product.setImageUrl("/uploads/" + fileName);
        product.setUser(user);
        return productService.saveProduct(product);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id, @RequestParam Long userId){
        Product product = productService.getProductById(id);
        if(product.getUser() == null || !product.getUser().getId().equals(userId)){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to delete this item");
        }
        String imageUrl = product.getImageUrl();
        if(imageUrl != null && !imageUrl.isEmpty()){
            String absolutePath = "D:/Project/Campus_Market_/Campus_Market" + imageUrl;
            File fileToDelete = new File(absolutePath);
            if(fileToDelete.exists()){
                if(fileToDelete.delete()){
                    System.out.println("File deleted successfully: " + absolutePath);
                }else{
                    System.err.println("Failed to delete file: " + absolutePath);
                }
            }
        }
        productService.deleteProduct(id);
        return ResponseEntity.ok().body("Item and associated image deleted successfully.");
    }
}