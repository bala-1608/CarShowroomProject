package com.zoho.carshowroom.interceptors;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class HttpMethodInterceptor extends AbstractInterceptor  {

	
	private static final long serialVersionUID = 1L;

	public String intercept(ActionInvocation invocation) throws Exception {
		
		Object action = invocation.getAction();
		HttpServletRequest request = ServletActionContext.getRequest();
		
        String method = request.getMethod().toUpperCase();
        
        try {
            
            Method setHttpMethod = action.getClass().getMethod("setHttpMethod", String.class);
            setHttpMethod.invoke(action, method);
            
        } catch (NoSuchMethodException e) {
           
        }
        return   invocation.invoke();

        
        
	}

}
