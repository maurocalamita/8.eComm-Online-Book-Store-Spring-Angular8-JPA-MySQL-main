package com.javainuse.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.javainuse.db.BookRepository;
import com.javainuse.db.OrderBookRepository;
import com.javainuse.db.OrderRepository;
import com.javainuse.db.UserRepository;
import com.javainuse.model.Book;
import com.javainuse.model.OrderBook;
import com.javainuse.model.Order;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/order-books")
public class OrderBookController {

    @Autowired
    private OrderBookRepository orderBookRepository;
    
    @Autowired
	private BookRepository bookRepository;
    
    @Autowired
	private OrderRepository orderRepository;

    // Create a new UserBook with query parameters
    @PostMapping("/add")
    public ResponseEntity<?> createOrderBook(
            @RequestParam("orderId") Long orderId,
            @RequestParam("bookId") Long bookId,
            @RequestParam("quantity") Integer quantity,
    		@RequestParam("price") Double price){

        // Check if orderId or bookId or quantity is null
        if (orderId == null || bookId == null || quantity == null || price == null) {
            return ResponseEntity.badRequest().body("Order ID, Book ID, Price and Quantity are required.");
        }

        // Check if quantity is less than 1
        if (quantity < 1) {
            return ResponseEntity.badRequest().body("Quantity must be at least 1.");
        }
        
        System.out.println("Looking for Order with ID: " + orderId);

        // Check if the book exists
        Optional<Book> bookOptional = bookRepository.findById(bookId);
        if (!bookOptional.isPresent()) {
            return ResponseEntity.badRequest().body("Book not found.");
        }
        
        // Check if the book exists
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (!orderOptional.isPresent()) {
            return ResponseEntity.badRequest().body("order not found.");
        }

        // Create a new BookUser object
        OrderBook orderBook = new OrderBook();
        orderBook.setOrderId(orderId);
        orderBook.setBookId(bookId);
        orderBook.setQuantity(quantity);
        orderBook.setPrice(price);

        try {
            // Save the new BookUser to the repository
            OrderBook savedOrderBook = orderBookRepository.save(orderBook);

            // Return the saved BookUser
            return ResponseEntity.ok(savedOrderBook);

        } catch (DataAccessException e) {
            // Handle database exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while saving the order book: " + e.getMessage());
        }
    }
    
    @GetMapping("/order/{orderId}")
    public ResponseEntity<?> viewOrderBookByOrderId(@PathVariable("orderId") Long orderId) {
        // Cerca tutti gli OrderBook che corrispondono a orderId
        List<OrderBook> orderBooks = orderBookRepository.findByOrderId(orderId);

        if (orderBooks.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No OrderBooks found for the given orderId.");
        }

        // Restituisce la lista di OrderBook
        return ResponseEntity.ok(orderBooks);
    }

}