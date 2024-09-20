package com.javainuse.db;

import com.javainuse.model.OrderBook;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderBookRepository extends JpaRepository<OrderBook, Long> {

	List<OrderBook> findByOrderId(Long orderId);
    
}
