package com.zoho.carshowroom.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.zoho.carshowroom.models.ZUsers;
import com.zoho.carshowroom.util.Utility;

public class RegisterAction extends ActionSupport
{

	private static final long serialVersionUID = 1L;
	private ZUsers user =new ZUsers();
	private String httpMethod;
	public void validate() {
	    if (Utility.isNull(user) && !httpMethod.equals("post")) {
	        return;
	    }

	    if (user == null) {
	        addFieldError("user", "User data is required");
	    }

	    if (user.getName() == null || user.getName().toString().trim().isEmpty()) {
	        addFieldError("name", "Name is required");
	    } else {
	        try {
	            String name = user.getName().toString();
	            Utility.checkNull(name);
	            if (name.length() < 3 || name.length() > 50) {
	                addFieldError("name", "Name must be between 3 and 50 characters");
	            }
	        } catch (IllegalArgumentException e) {
	            addFieldError("name", "Name cannot be null or empty");
	        }
	    }

	    if (user.getEmail() == null || user.getEmail().toString().trim().isEmpty()) {
	        addFieldError("email", "Email is required");
	    } else {
	        try {
	            String email = user.getEmail() .toString();
	            if (!email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
	                addFieldError("email", "Invalid email format");
	            }
	        } catch (IllegalArgumentException e) {
	            addFieldError("email", "Email cannot be null or empty");
	        }
	    }

	    if (user.getPassword()  == null || user.getPassword().toString().trim().isEmpty()) {
	        addFieldError("password", "Password is required");
	    } else {
	        try {
	            String password = user.getPassword().toString();
	            if (password.length() < 8) {
	                addFieldError("password", "Password must be at least 8 characters long");
	            }
	        } catch (IllegalArgumentException e) {
	            addFieldError("password", "Password cannot be null or empty");
	        }
	    }

	    if (user.getPhoneNo() == null || user.getPhoneNo().toString().trim().isEmpty()) {
	        addFieldError("phone_no", "Phone number is required");
	    } else {
	        try {
	            String phoneNo = user.getPhoneNo().toString();
	            if (!phoneNo.matches("\\d{10}")) {
	                addFieldError("phone_no", "Phone number must be exactly 10 digits");
	            }
	        } catch (IllegalArgumentException e) {
	            addFieldError("phone_no", "Phone number cannot be null or empty");
	        }
	    }

	    if (user.getRole() == null) {
	        addFieldError("role", "Role is required");
	    } else {
	        try {
	            Short role = Short.parseShort(user.getRole() .toString());
	            if (role < 0 || role > 3) {
	                addFieldError("role", "Role must be 0 (User), 1 (Showroom Manager), 2 (Company Admin), or 3 (Application Admin)");
	            }
	        } catch (IllegalArgumentException e) {
	            addFieldError("role", "Role is invalid");
	        }
	    }

	    if (user.getAddressId() == null) {
	        addFieldError("address_id", "Address ID is required");
	    } else {
	        try {
	            Integer addressId = Integer.parseInt(user.getAddressId() .toString());
	            if (addressId <= 0) {
	                addFieldError("address_id", "Address ID must be greater than 0");
	            }
	        } catch (IllegalArgumentException e) {
	            addFieldError("address_id", "Address ID is invalid");
	        }
	    }
	}


}
