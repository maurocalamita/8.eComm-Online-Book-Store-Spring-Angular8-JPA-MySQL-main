package com.javainuse.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javainuse.db.OrderBookRepository;

@Service
public class OrderBookService {

    @Autowired
    private OrderBookRepository orderBookRepository;

    public void addBookToOrder(Long orderId, Long bookId, Integer quantity) {
        // Implementa la logica per aggiungere il libro all'ordine
        // Esempio di codice: salva l'associazione nella tabella di intersezione
    }
}
