package com.javainuse.model;

import java.util.Date;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name = "book")
public class Book {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "author")
	private String author;
	
	@Column(name = "price")
	private String price;

	@Column(name = "picByte", length = 100000)
	private byte[] picByte;
	
	@Column(name = "discount")
	private String discount;
	
	@Column(name = "dataInizioSconto")
	private Date dataInizio;
	
	@Column(name = "dataFineSconto")
	private Date dataFine;


	public String getDiscount() {
		return discount;
	}

	public void setDiscount(String discount) {
		this.discount = discount;
	}

	public Date getDataInizio() {
		return dataInizio;
	}

	public void setDataInizio(Date dataInizio) {
		this.dataInizio = dataInizio;
	}

	public Date getDataFine() {
		return dataFine;
	}

	public void setDataFine(Date dataFine) {
		this.dataFine = dataFine;
	}
	
	private String finalPrice;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public byte[] getPicByte() {
		return picByte;
	}

	public void setPicByte(byte[] picByte) {
		this.picByte = picByte;
	}
	
	 public String getFinalPrice() {
	        return finalPrice;
	    }

	    public void setFinalPrice(String finalPrice) {
	        this.finalPrice = finalPrice;
	    }
	
	// Metodo per calcolare e aggiornare il prezzo finale
    public void updateFinalPrice() {
        try {
            double priceValue = Double.parseDouble(this.price);
            double discountValue = Double.parseDouble(this.discount);
            double finalPriceValue = priceValue - (priceValue * discountValue / 100);
            this.finalPrice = String.format("%.2f", finalPriceValue);
        } catch (NumberFormatException e) {
            this.finalPrice = "Error"; // Handle parsing errors
        }
    }

	
}