package com.user.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.user.dao.UserDao;
import com.user.dto.UserRegisterDto;
import com.user.entity.User;
import com.user.service.UserService;

import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserDao userDao;
	
	@Override
	public ResponseEntity<?> registerUser(UserRegisterDto userRegisterDetails) {
		boolean existsByEmail = userDao.existsByEmail(userRegisterDetails.getEmail());
		if(!existsByEmail) {
			User user = new User();
			mapToEntity(userRegisterDetails, user);
			return ResponseEntity.status(HttpStatus.OK).body("Registered Successfully");	
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email Already Exists");
		
	}

	@Override
	public ResponseEntity<?> getAllUsers() {
		return ResponseEntity.status(HttpStatus.OK).body(userDao.findAll());
	}

	@Override
	public ResponseEntity<?> updateUser(UserRegisterDto userUpdateDetails) {
	    User user = userDao.findById(userUpdateDetails.getUserId()).orElse(null); // Using orElse(null) to handle non-existing user

	    if (user != null) {
	        boolean emailAlreadyExists = userDao.existsByEmailAndUserIdNot(userUpdateDetails.getEmail(), user.getUserId());

	        if (!emailAlreadyExists) {
	            mapToEntity(userUpdateDetails, user);
	            return ResponseEntity.status(HttpStatus.OK).body("Updated Successfully");
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email Already Exists");
	        }
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
	    }
	}

	@Override
	@Transactional
	public ResponseEntity<?> deleteUserById(long userId) {
		boolean existingUser = userDao.existsById(userId);
		if(existingUser) {
			userDao.deleteById(userId);
			return ResponseEntity.status(HttpStatus.OK).body("User Deleted");	
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Doesn't Exists");
	}
	
	public User mapToEntity(UserRegisterDto userRegisterRequest, User user) {
		user.setFullName(userRegisterRequest.getFullName());
		user.setEmail(userRegisterRequest.getEmail());
		user.setMobileNumber(userRegisterRequest.getMobileNumber());
		user.setPassword(userRegisterRequest.getPassword());
		user.setRole(userRegisterRequest.getRole());
		return userDao.save(user);
	}
}
