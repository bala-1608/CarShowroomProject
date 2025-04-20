package com.zoho.carshowroom.actions;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import com.opensymphony.xwork2.ActionSupport;
import com.zoho.carshowroom.engines.ShowroomsEngine;
import com.zoho.carshowroom.models.ZShowroom;

public class ShowroomAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private String httpMethod;
	private Boolean isActive;
    private Map<String, Object> jsonResponse;
    private ZShowroom showroom;
    private ShowroomsEngine engine = new ShowroomsEngine();
    private Integer companyId;
    private Integer showroomId;

    
    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    
    public Integer getShowroomId() {
        return showroomId;
    }

    public void setShowroomId(Integer showroomId) {
        this.showroomId = showroomId;
    }
    
    public void setHttpMethod(String httpMethod) {
        this.httpMethod = httpMethod.toLowerCase();
    }
    
    public String getHttpMethod() {
        return httpMethod;
    }

    
    public ZShowroom getShowroom() {
        return showroom;
    }

    
    public Map<String, Object> getJsonResponse() {
        return jsonResponse;
    }


    public String execute() {

    	
    	System.out.println("Company ID = " + companyId);
    	System.out.println("isActive = " + isActive);
        switch (httpMethod.toUpperCase()) {
            case "GET":
			try {
				jsonResponse=engine.get(companyId,showroomId,isActive);
				return SUCCESS;
			} catch (IOException | SQLException e) {
				e.printStackTrace();
			}
			
            default:
            	
                return ERROR;
        }
    }
    public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}



}
