package com.zoho.carshowroom.actions;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.zoho.carshowroom.engines.BookingsEngine;
import com.zoho.carshowroom.models.ZCarBooking;
import com.zoho.carshowroom.util.Utility;

public class BookingAction extends ActionSupport {

	
	private static final long serialVersionUID = 1L;
	private String httpMethod;
	private Boolean isAvailable;
	private Boolean isActive;
    private Map<String, Object> jsonResponse;
    private ZCarBooking booking=new ZCarBooking();
    private BookingsEngine engine = new BookingsEngine();
    private Integer companyId;
    private Integer userId;
    private Integer showroomId;
    private Integer modelId;
    private Integer carId;
    private Short bookingType;
	private Short status;
	private Integer price;
    
    
    public String execute() throws IOException {
    	
    	
    	
//    	
//    	System.out.println("-----------------------");
//    	System.out.println(bookingType);
//    	System.out.println(price);
//    	System.out.println(status);
//    	System.out.println("comapnyId: "+companyId);
//    	System.out.println("showroomId: "+showroomId);
//    	System.out.println("modelId: "+modelId);
//    	System.out.println("-----------------------");
    	
    	
    	HttpServletResponse res = ServletActionContext.getResponse();
        switch (httpMethod.toUpperCase()) {
        
            case "GET":
			try {
				setJsonResponse(engine.get(companyId,showroomId,userId));
				Utility.sendResponse(res, jsonResponse);
				return SUCCESS;
			} catch (IOException | SQLException e) {
				e.printStackTrace();
			}
            case "POST":
    			try {
    				booking.setBookingType(bookingType);
    		    	booking.setPrice(price);
    		    	booking.setStatus(status);
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


	public void setBookingType(Short bookingType) {
		System.out.print("in");
		this.bookingType = bookingType;
	}

	public Short getBookingType() {
		return bookingType;
	}
	

	public void setPrice(Integer price) {
		this.price = price;
	}


	public void setStatus(Short status) {
		this.status = status;
	}
}
