package com.example.Project.Menu;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/menuItems")
public class MenuController {

    @Autowired
    private MenuRepository menuRepository;

    @GetMapping
    public List<Menu> getAllMenuItems() {
        return menuRepository.findAll();
    }

    @GetMapping("/{id}")
    public Menu getMenuItemById(@PathVariable String id) {
        return menuRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Menu createMenuItem(@RequestBody Menu menu) {
        return menuRepository.save(menu);
    }

    @PutMapping("/{id}")
    public Menu updateMenuItem(@PathVariable String id, @RequestBody Menu menu) {
        menu.setId(id);
        return menuRepository.save(menu);
    }

    @DeleteMapping("/{id}")
    public void deleteMenuItem(@PathVariable String id) {
        menuRepository.deleteById(id);
    }
}