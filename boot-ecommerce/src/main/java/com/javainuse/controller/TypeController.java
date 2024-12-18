package com.javainuse.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javainuse.db.TypeRepository;
import com.javainuse.model.Type;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "type")
public class TypeController {

	@Autowired
	private TypeRepository typeRepository;
	
	@GetMapping("/get")
	public List<Type> getType() {
		return typeRepository.findAll();
	}

}