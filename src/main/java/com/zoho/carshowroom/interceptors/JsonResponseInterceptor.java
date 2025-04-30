package com.zoho.carshowroom.interceptors;

import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class JsonResponseInterceptor extends AbstractInterceptor {
	private static final long serialVersionUID = 1L;

	@SuppressWarnings("unchecked")
	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
	    String result = invocation.invoke();

	    Object action = invocation.getAction();
	    HttpServletResponse res = ServletActionContext.getResponse();

	    if (action instanceof ActionSupport) {
	        ActionSupport actionSupport = (ActionSupport) action;
	       
	        Map<String, Object> jsonResponse =  (Map<String, Object>) actionSupport.getClass()
	            .getMethod("getJsonResponse").invoke(actionSupport);
	        
	        
	        if (actionSupport.hasFieldErrors()) {
	            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
	        } else if (jsonResponse != null && jsonResponse.get("status") instanceof Integer) {
	            int status = (int) jsonResponse.get("status");
	            invocation.addPreResultListener((inv, resultCode) -> {
	            	
	                res.setStatus(status);
	                System.out.println(" get Status: " + res.getStatus());
	            });

	            System.out.println("Committed: " + res.isCommitted());
	            res.setStatus(status);
	            
	            if (status == HttpServletResponse.SC_NO_CONTENT) {
	                res.setContentLength(0);
	                return Action.NONE; 
	            }
	        }
	    }

	    return result; 
	}

}
