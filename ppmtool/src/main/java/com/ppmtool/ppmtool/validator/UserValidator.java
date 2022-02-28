package com.ppmtool.ppmtool.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.ppmtool.ppmtool.domain.User;

@Component
public class UserValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		
		return User.class.equals(clazz); //we are supporting this user class here in our domain , we are using it to 
		                                  //further validate that we have correct object here
	}

	@Override
	public void validate(Object target, Errors errors) {
		User user=(User) target;
		
		if(user.getPassword().length()<6)
		{
			errors.rejectValue("password" ,"length","Password must be at least 6 charecters");
		}
		
		if(!user.getPassword().equals(user.getConfirmPassword()))
			errors.rejectValue("password" ,"match","Password must match");
		
		//confirmPassword
		
	}

}
