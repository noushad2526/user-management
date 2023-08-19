package com.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.user.dto.UserRegisterDto;
import com.user.service.UserService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService userService;
		
	@PostMapping("registerUser")
	public ResponseEntity<?> registerUser(@RequestBody UserRegisterDto userRegisterDetails){
		return userService.registerUser(userRegisterDetails);
	}
	
	@GetMapping("getAllUsers")
	public ResponseEntity<?> getAllUsers() {
		return userService.getAllUsers();
	}
	
	@PutMapping("updateUser")
	public ResponseEntity<?> updateUser(@RequestBody UserRegisterDto userUpdateDetails) {
		return userService.updateUser(userUpdateDetails);
	}
	
	@DeleteMapping("deleteUserById/{userId}")
	public ResponseEntity<?> deleteUser(@PathVariable long userId) {
		return userService.deleteUserById(userId);
	}
}
