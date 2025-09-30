package com.org.restaurant_management.services.admin;

import com.org.restaurant_management.dtos.CategoryDto;

import java.io.IOException;

public interface AdminService {
    CategoryDto postCategory(CategoryDto categoryDto) throws IOException;
}
