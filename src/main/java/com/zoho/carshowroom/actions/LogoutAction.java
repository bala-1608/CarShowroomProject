package com.zoho.carshowroom.actions;

import java.sql.SQLException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.zoho.carshowroom.engines.LogoutEngine;

public class LogoutAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private String httpMethod;
	private Map<String, Object> jsonResponse;
	private LogoutEngine engine = new LogoutEngine();

	public String execute() throws Exception {

		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext()
				.get(ServletActionContext.HTTP_REQUEST);

		HttpServletResponse response = (HttpServletResponse) ActionContext.getContext()
				.get(ServletActionContext.HTTP_RESPONSE);
		switch (httpMethod) {
		case "delete":
			try {

				setJsonResponse(engine.delete(request, response));

				return SUCCESS;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		default:
			return ERROR;
		}
	}

	public void setHttpMethod(String httpMethod) {
		this.httpMethod = httpMethod.toLowerCase();
	}

	public String getHttpMethod() {
		return httpMethod;
	}

	public Map<String, Object> getJsonResponse() {
		return jsonResponse;
	}

	public void setJsonResponse(Map<String, Object> jsonResponse) {
		this.jsonResponse = jsonResponse;
	}

}
