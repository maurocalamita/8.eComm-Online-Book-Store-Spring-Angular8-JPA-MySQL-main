package com.javainuse.db;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javainuse.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

	List<Order> findByName(String name);
}