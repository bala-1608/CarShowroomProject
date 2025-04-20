package com.zoho.carshowroom.actions;

import java.sql.SQLException;
import java.util.Map;

import com.opensymphony.xwork2.ActionSupport;
import com.zoho.carshowroom.engines.UsersEngine;

public class UserAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private String httpMethod;
	private Map<String, Object> jsonResponse;

	private UsersEngine engine = new UsersEngine();

	public void setHttpMethod(String httpMethod) {
		this.httpMethod = httpMethod.toLowerCase();
	}

	public String getHttpMethod() {
		return httpMethod;
	}

	public Map<String, Object> getJsonResponse() {
		return jsonResponse;
	}

	public String execute() {
		switch (httpMethod.toUpperCase()) {
		case "GET":
			try {
				jsonResponse = engine.get();
				return SUCCESS;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		default:
			return ERROR;
		}
	}
}
