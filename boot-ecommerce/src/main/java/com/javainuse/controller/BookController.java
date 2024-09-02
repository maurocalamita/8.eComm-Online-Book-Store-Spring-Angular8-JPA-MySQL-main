package com.javainuse.controller;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.javainuse.db.BookRepository;
import com.javainuse.model.Book;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "books")
public class BookController {
	
	private byte[] bytes;

	@Autowired
	private BookRepository bookRepository;
	
	@GetMapping("/get" )
    public ResponseEntity<Object> getBooks(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "10") int size,
            @RequestParam(name = "sort", required = false, defaultValue = "id") String sort,
            @RequestParam(name = "order", required = false, defaultValue = "DESC") String order) {

        Sort.Direction sortDirection = "DESC".equalsIgnoreCase(order) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sort));
        Page<Book> pageResult = bookRepository.findAll(pageable);

        Map<String, Object> responseBody = new LinkedHashMap<>();
        if (pageResult.hasContent()) {
            responseBody.put("books", pageResult.getContent());
            responseBody.put("currentPage", pageResult.getNumber());
            responseBody.put("totalItems", pageResult.getTotalElements());
            responseBody.put("totalPages", pageResult.getTotalPages());
            return new ResponseEntity<>(responseBody, HttpStatus.OK);
        } else {
            responseBody.put("message", "No books found");
            return new ResponseEntity<>(responseBody, HttpStatus.NOT_FOUND);
        }
    }
	
	@PostMapping("/upload")
	public void uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
		this.bytes = file.getBytes();
	}

	@PostMapping("/add")
	public void createBook(@RequestBody Book book) throws IOException {
		book.setPicByte(this.bytes);
		bookRepository.save(book);
		this.bytes = null;
	}
	
	@DeleteMapping(path = { "/{id}" })
	public Book deleteBook(@PathVariable("id") long id) {
		//deprecated: Book book = bookRepository.getOne(id);
		Book book = bookRepository.getReferenceById(id);
		bookRepository.deleteById(id);
		return book;
	}
	
	@PutMapping("/update")
	public ResponseEntity<Book> updateBook(@RequestBody Book book) {
	    if (this.bytes != null) {
	        book.setPicByte(this.bytes);
	        this.bytes = null;  // Reset the byte array after updating the image
	    } else {
	        // Keep the existing image if no new image is uploaded
	        Book existingBook = bookRepository.findById(book.getId()).orElse(null);
	        if (existingBook != null) {
	            book.setPicByte(existingBook.getPicByte());
	        }
	    }
	    Book updatedBook = bookRepository.save(book);
	    return new ResponseEntity<>(updatedBook, HttpStatus.OK);
	}

	
	@GetMapping("/search")
    public List<Book> searchBooks(@RequestParam("query") String query) {
        // Cerca per query parziale in nome o autore
        return bookRepository.findByNameOrAuthor(query);
    }
	//INTERSEZIONE
	 /*@PostMapping("/{orderId}/books/{bookId}")
	    public ResponseEntity<String> addBookToOrder(
	            @PathVariable Long orderId,
	            @PathVariable Long bookId,
	            @RequestParam Integer quantity) {

	        orderBookService.addBookToOrder(orderId, bookId, quantity);
	        return ResponseEntity.ok("Product added to order successfully");
	    }
	    */
}