package com.ppmtool.ppmtool.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice //it gives global exception handler for controller
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler
	public final ResponseEntity<Object> handleProectIdException(ProjectIdException ex, WebRequest req)
	{
		ProjectIdExceptionResponse exceptionResponse = new ProjectIdExceptionResponse(ex.getMessage());
		return new ResponseEntity(exceptionResponse,HttpStatus.BAD_REQUEST);
	}
	

	 @ExceptionHandler
	    public final ResponseEntity<Object> handleProjectNotFoundException(ProjectNotFoundException ex, WebRequest request){
	       ProjectNotFoundExceptionResponse exceptionResponse = new ProjectNotFoundExceptionResponse(ex.getMessage());
	        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
	    }
	 
	 @ExceptionHandler
	    public final ResponseEntity<Object> handleUserNameAlreadyExists(UserNameAlreadyExistsException ex, WebRequest request){
	       UserNameAlreadyExistsResponse exceptionResponse = new  UserNameAlreadyExistsResponse(ex.getMessage());
	        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
	    }
	 
	 
	 
}
