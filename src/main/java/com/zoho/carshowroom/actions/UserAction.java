package com.zoho.carshowroom.actions;

import java.sql.SQLException;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.zoho.carshowroom.engines.UsersEngine;
import com.zoho.carshowroom.util.Utility;

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

	public String execute() throws InterruptedException {
		HttpServletResponse res = ServletActionContext.getResponse();
		switch (httpMethod.toUpperCase()) {
		case "GET":
			try {
				jsonResponse = engine.get();
//				Thread.sleep(2000);
				Utility.sendResponse(res, jsonResponse);
				return SUCCESS;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		default:
			return ERROR;
		}
	}
}
