package com.example.Project.Order;
import java.util.concurrent.atomic.AtomicInteger;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private AtomicInteger orderCounter = new AtomicInteger(1);
    private LocalDate lastOrderDate = LocalDate.now();

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(String id) {
        return orderRepository.findById(id).orElse(null);
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrder(String id, Order order) {
        order.setId(id);
        return orderRepository.save(order);
    }

    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }

    public String generateOrderNumber() {
        LocalDate today = LocalDate.now();
        if (!today.equals(lastOrderDate)) {
            lastOrderDate = today;
            orderCounter.set(1); // Reset the counter each day
        }
        return String.format("%03d", orderCounter.getAndIncrement());
    }

    public Order saveOrder(Order order) {
        String orderNumber = generateOrderNumber();
        order.setOrderNumber(orderNumber);
        return orderRepository.save(order);
    }
}