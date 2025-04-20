package com.zoho.carshowroom.actions;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import com.opensymphony.xwork2.ActionSupport;
import com.zoho.carshowroom.engines.BookingsEngine;
import com.zoho.carshowroom.models.ZCarBooking;

public class BookingAction extends ActionSupport {

	
	private static final long serialVersionUID = 1L;
	private String httpMethod;
	private Boolean isAvailable;
	private Boolean isActive;
    private Map<String, Object> jsonResponse;
    private ZCarBooking booking;
    private BookingsEngine engine = new BookingsEngine();
    private Integer companyId;
    private Integer userId;
    private Integer showroomId;
    private Integer modelId;
    private Integer carId;
    
    
    public String execute() {
    	
    	
    	
        switch (httpMethod.toUpperCase()) {
        
            case "GET":
			try {
				setJsonResponse(engine.get(companyId,showroomId,userId));
				return SUCCESS;
			} catch (IOException | SQLException e) {
				e.printStackTrace();
			}
            case "POST":
    			try {
    				setJsonResponse(engine.post(booking,companyId,showroomId,modelId,userId,carId));
    				return SUCCESS;
    			} catch (Exception e) {
    				e.printStackTrace();
    			}
            default:
            	
                return ERROR;
        }
    }
    
    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
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
    public Boolean getIsAvailable() {
		return isAvailable;
	}

	public void setIsAvailable(Boolean isActive) {
		this.isAvailable = isActive;
	}
	public ZCarBooking getModel() {
		return booking;
	}

	public Map<String, Object> getJsonResponse() {
		return jsonResponse;
	}
	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public void setJsonResponse(Map<String, Object> jsonResponse) {
		this.jsonResponse = jsonResponse;
	}
	public Integer getModelId() {
        return userId;
    }

    public void setModelId(Integer companyId) {
        this.companyId = companyId;
    }

	public Integer getCarId() {
		return carId;
	}

	public void setCarId(Integer carId) {
		this.carId = carId;
	}
}
