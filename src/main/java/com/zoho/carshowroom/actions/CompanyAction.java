package com.zoho.carshowroom.actions;

import java.io.IOException;
import java.sql.Date;
import java.sql.SQLException;
import java.util.Map;

import com.opensymphony.xwork2.ActionSupport;
import com.zoho.carshowroom.engines.CompaniesEngine;
import com.zoho.carshowroom.models.ZCompany;
import com.zoho.carshowroom.util.Utility;

public class CompanyAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private Integer companyId;
	private String httpMethod;
	private Boolean isActive;
    private Map<String, Object> jsonResponse;
    private ZCompany company;
    private CompaniesEngine engine = new CompaniesEngine();
    
    public void setHttpMethod(String httpMethod) {
        this.httpMethod = httpMethod.toLowerCase();
    }
    
    public String getHttpMethod() {
        return httpMethod;
    }

    // Getter and Setter for company
    public ZCompany getCompany() {
        return company;
    }

    public void setCompany(ZCompany company) {
        this.company = company;
    }

    @Override
    public void validate() {
    	System.out.println(httpMethod);
       if (Utility.isNull(company)&&!httpMethod.equals("post")) {
    		   return;
        }
       
        if (company == null) {
        	addFieldError("company", "Company data is required");
        }

        if (company.getBrandCode() == null) {
            addFieldError("brandCode", "Company ID is required");
        } else {
            try {
                Utility.boundaryCheck(company.getBrandCode());
            } catch (IllegalArgumentException e) {
                addFieldError("brandCode", "Company ID is invalid");
            }
        }

        if (company.getName() == null || company.getName().trim().isEmpty()) {
            addFieldError("companyName", "Company name is required");
        } else {
            try {
                Utility.checkNull(company.getName());
            } catch (IllegalArgumentException e) {
                addFieldError("companyName", "Company name cannot be null or empty");
            }
        }

        if (company.getStartedYear() == null) {
            addFieldError("startedYear", "Started year is required");
        } else {
            try {
                Date date = new Date(company.getStartedYear());  
                Utility.checkValidDate(date);
            } catch (IllegalArgumentException e) {
                addFieldError("startedYear", "Invalid started year");
            }
        }

        if (company.getAdminId() == null) {
            addFieldError("adminId", "Admin ID is required");
        } else {
            try {
                Utility.boundaryCheck(company.getAdminId());
            } catch (IllegalArgumentException e) {
                addFieldError("adminId", "Admin ID is invalid");
            }
        }
    }

    public Map<String, Object> getJsonResponse() {
        return jsonResponse;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }


    public String execute() {
    	System.out.println(companyId);
        switch (httpMethod.toUpperCase()) {
            case "GET":
			try {
				jsonResponse=engine.get(isActive,companyId);
				return SUCCESS;
			} catch (IOException | SQLException e) {
				e.printStackTrace();
			}
			
            default:
            	
                return ERROR;
        }
    }
}
