package com.zoho.carshowroom.actions;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import com.opensymphony.xwork2.ActionSupport;
import com.zoho.carshowroom.engines.ModelsEngine;
import com.zoho.carshowroom.models.ZModel;

public class CarModelAction extends ActionSupport{

	private static final long serialVersionUID = 1L;
	private String httpMethod;
	private Boolean isAvailable;
	private Boolean isActive;
    private Map<String, Object> jsonResponse;
    private ZModel model;
    private ModelsEngine engine = new ModelsEngine();
    private Integer companyId;
    private Integer showroomId;
    private Integer modelId;
    
    public String execute() {
    	
    	System.out.println(companyId);
    	System.out.println(showroomId);
    	System.out.println(modelId);
    	
        switch (httpMethod.toUpperCase()) {
        
            case "GET":
			try {
				setJsonResponse(engine.get(companyId,showroomId,modelId,isAvailable,isActive));
				return SUCCESS;
			} catch (IOException | SQLException e) {
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
	public ZModel getModel() {
		return model;
	}

	public Map<String, Object> getJsonResponse() {
		return jsonResponse;
	}

	public void setJsonResponse(Map<String, Object> jsonResponse) {
		this.jsonResponse = jsonResponse;
	}

}
