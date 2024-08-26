package com.javainuse.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.javainuse.model.Book;

@Repository
public interface OrderBookRepository extends JpaRepository<Book, Long> {
    // Aggiungi metodi personalizzati qui se necessario
}
