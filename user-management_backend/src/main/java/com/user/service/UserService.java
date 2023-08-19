package com.user.service;

import org.springframework.http.ResponseEntity;

import com.user.dto.UserRegisterDto;

public interface UserService {

	ResponseEntity<?> registerUser(UserRegisterDto userRegisterDetails);

	ResponseEntity<?> getAllUsers();

	ResponseEntity<?> updateUser(UserRegisterDto userUpdateDetails);

	ResponseEntity<?> deleteUserById(long userId);

}
