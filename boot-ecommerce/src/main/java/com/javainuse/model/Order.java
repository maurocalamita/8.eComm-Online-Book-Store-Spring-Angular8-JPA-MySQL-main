package com.javainuse.model;

import jakarta.persistence.*;

@Entity
@Table(name = "orders") 
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    
    @Column(name = "name", nullable = false)
    private Long name;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Long getName() {
		return name;
	}


	public void setName(Long name) {
		this.name = name;
	}

}
