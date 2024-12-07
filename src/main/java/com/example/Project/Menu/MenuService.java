package com.example.Project.Menu;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    public List<Menu> getAllMenuItems() {
        return menuRepository.findAll();
    }

    public Menu getMenuItemById(String id) {
        return menuRepository.findById(id).orElse(null);
    }

    public Menu createMenuItem(Menu menu) {
        return menuRepository.save(menu);
    }

    public Menu updateMenuItem(String id, Menu menu) {
        menu.setId(id);
        return menuRepository.save(menu);
    }

    public void deleteMenuItem(String id) {
        menuRepository.deleteById(id);
    }
}