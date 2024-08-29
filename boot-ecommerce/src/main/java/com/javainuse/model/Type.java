package com.javainuse.model;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "type")
public class Type {

    @Id
    @Column(name = "cod")
    private String cod;

    @Column(name = "name_cod", nullable = false)
    private String nameCod;

	public String getCod() {
		return cod;
	}

	public void setCod(String cod) {
		this.cod = cod;
	}

	public String getNameCod() {
		return nameCod;
	}

	public void setNameCod(String nameCod) {
		this.nameCod = nameCod;
	}

}