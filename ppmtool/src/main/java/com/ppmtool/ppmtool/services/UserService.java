package com.ppmtool.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ppmtool.ppmtool.domain.User;
import com.ppmtool.ppmtool.exceptions.UserNameAlreadyExistsException;
import com.ppmtool.ppmtool.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	public User saveUser(User newUser) {
		
		 
		try {
			
			newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
			//Username must be unique (exception)
			newUser.setUsername(newUser.getUsername());
			
			newUser.setConfirmPassword("");
			 	
			
			return userRepository.save(newUser);
			
		} catch (Exception e) {
			throw new UserNameAlreadyExistsException("Username "+ newUser.getUsername()+" already exists");
		}
		
	}

}
