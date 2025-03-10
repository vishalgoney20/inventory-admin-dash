package com.example.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;


@Document(collection = "products")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Product {
    @Id
    private String id;  // MongoDB's ObjectId (auto-generated)

    @Getter @Setter private String name;
    private String description;
    private String category;
    private double price;
    private int stockQuantity;

    private List<String> images;
    private List<String> videos;

    private Map<String, String> attributes;  // Dynamic fields (e.g., color, size, battery life)

    private boolean available;
}