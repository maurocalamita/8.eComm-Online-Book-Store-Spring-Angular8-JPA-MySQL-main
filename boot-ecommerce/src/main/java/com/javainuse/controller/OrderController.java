package com.javainuse.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.javainuse.db.OrderRepository;
import com.javainuse.model.Order;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    
    @GetMapping("/get-orders")
    public ResponseEntity<List<Order>> getOrders() {
        List<Order> orders = orderRepository.findAll();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
    
    @PostMapping("/add-order")
    public ResponseEntity<Order> createOrder(@RequestParam String name) {
        if (name == null || name.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        Order order = new Order();
        order.setName(name);
        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable("id") long id) {
        Optional<Order> orderOptional = orderRepository.findById(id);
        
        if (orderOptional.isPresent()) {
            orderRepository.deleteById(id);
            return new ResponseEntity<>(orderOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Order not found", HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/{name}")
    public ResponseEntity<List<Order>> getOrdersByName(@PathVariable("name") String name) {
        List<Order> orders = orderRepository.findByName(name);
        if (orders.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(orders);
        }
    }
}
