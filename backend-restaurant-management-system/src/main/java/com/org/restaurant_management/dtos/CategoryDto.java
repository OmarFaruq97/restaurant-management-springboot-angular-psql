package com.org.restaurant_management.dtos;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class CategoryDto {

    private Long id;
    private String name;
    private String description;
    private MultipartFile img;
    private byte[] returnedImg;
}

