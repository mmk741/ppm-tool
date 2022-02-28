 package com.ppmtool.ppmtool.security;

import java.security.SignatureException;



import com.ppmtool.ppmtool.domain.User;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;



@Component
public class JwtTokenProvider {

	//Generate the Token
	
	public String generateToken(Authentication authentication)
	{
		User user=(User)authentication.getPrincipal();
		
		Date now =new Date(System.currentTimeMillis());
		
		Date expiryDate=new Date(now.getTime()+SecurityConstants.EXPIRATION_TIME); 
		
		String userId=Long.toString(user.getId());
		
		
		Map <String,Object> claims=new HashMap();
		claims.put("id", (Long.toString(user.getId())));
		claims.put("username", user.getUsername());
		claims.put("fullName", user.getFullName());
		
		
		
		
		
		
		return Jwts.builder()
				.setSubject(userId)
				.setClaims(claims)
				.setIssuedAt(now)
				.setExpiration(expiryDate)
				.signWith(SignatureAlgorithm.HS512 ,SecurityConstants.SECERET)
				.compact();
		
	}
	
	
	
	 //Validate the token
    public boolean validateToken(String token){
        try{
            Jwts.parser().setSigningKey(SecurityConstants.SECERET).parseClaimsJws(token);
            return true;
        }catch (MalformedJwtException ex){
            System.out.println("Invalid JWT Token");
        }catch (ExpiredJwtException ex){
            System.out.println("Expired JWT token");
        }catch (UnsupportedJwtException ex){
            System.out.println("Unsupported JWT token");
        }catch (IllegalArgumentException ex){
            System.out.println("JWT claims string is empty");
        }
        return false;
    }


    //Get user Id from token

    public Long getUserIdFromJWT(String token){
        Claims claims = Jwts.parser().setSigningKey(SecurityConstants.SECERET).parseClaimsJws(token).getBody();
        String id = (String)claims.get("id");

        return Long.parseLong(id);
    }
	
	
	
}
