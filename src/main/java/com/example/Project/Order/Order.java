package com.example.Project.Order;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.example.Project.Menu.Menu;

@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    private String customerName;
    private List<Menu> menuItems;
    private double totalPrice;
    private String orderType; 
    private String orderNumber;

    // Constructors
    public Order() {}

    public Order(String customerName, List<Menu> menuItems, String orderType, String orderNumber) {
        this.customerName = customerName;
        this.orderNumber = orderNumber;
        this.menuItems = menuItems;
        this.totalPrice = calculateTotalPrice();
        this.orderType = orderType;
        
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public List<Menu> getMenuItems() {
        return menuItems;
    }

    public void setMenuItems(List<Menu> menuItems) {
        this.menuItems = menuItems;
        this.totalPrice = calculateTotalPrice();
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public String getOrderType() { 
        return orderType;
    }

    public void setOrderType(String orderType) { 
        this.orderType = orderType;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    // Method to calculate total price
    private double calculateTotalPrice() {
        return menuItems.stream().mapToDouble(Menu::getPrice).sum();
    }
}
