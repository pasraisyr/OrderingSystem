package com.example.Project.Menu;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MenuRepository extends MongoRepository<Menu, String> {
}