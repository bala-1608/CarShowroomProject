package com.zoho.carshowroom.actions;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.zoho.carshowroom.engines.LoginEngine;
import com.zoho.carshowroom.models.ZUsers;
import com.zoho.carshowroom.util.Utility;

public class LoginAction extends ActionSupport implements  ModelDriven<ZUsers> {

	private static final long serialVersionUID = 1L;
	private String httpMethod;
	private ZUsers user;
	private  String email;
	private  String password;
	
	private Map<String, Object> jsonResponse;
	
	private LoginEngine engine = new LoginEngine();

	public void setHttpMethod(String httpMethod) {
		this.httpMethod = httpMethod.toLowerCase();
	}

	public String getHttpMethod() {
		return httpMethod;
	}
	public Map<String, Object> getJsonResponse() {
        return jsonResponse;
    }
	
	public void validate() {
		
		user.setEmail(email);
		user.setPassword(password);

	    if (Utility.isNull(user) && !httpMethod.equals("post")) {
	        return;
	    }

	    if (user == null) {
	        addFieldError("user", "User data is required");
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
	    
	}

	public String execute() throws Exception {
		
		HttpServletResponse response = (HttpServletResponse) ActionContext.getContext()
	            .get(ServletActionContext.HTTP_RESPONSE);
		switch (httpMethod) {
		case "post":
			try {
				try {
					jsonResponse = engine.post(user,response);
				} catch (IllegalAccessException | NullPointerException | IOException e) {
					
					e.printStackTrace();
				}
				return SUCCESS;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		default:
			return ERROR;
		}
	}


	@Override
	public ZUsers getModel() {
		user=new ZUsers();
		return user;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
