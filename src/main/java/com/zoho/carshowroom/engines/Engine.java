package com.zoho.carshowroom.engines;

import java.util.Map;

import javax.servlet.http.HttpServletResponse;


public abstract class Engine {
	
	//all engine class should follow this;
	
    public Map<String, Object> get() throws Exception {
        throw new UnsupportedOperationException("GET operation is not supported.");
    }

   
    public Map<String, Object> put() throws Exception {
        throw new UnsupportedOperationException("PUT operation is not supported.");
    }

   
    public Map<String, Object> delete() throws Exception {
        throw new UnsupportedOperationException("DELETE operation is not supported.");
    }

   
    public Map<String, Object> post(Object obj,HttpServletResponse response) throws Exception {
        throw new UnsupportedOperationException("POST operation is not supported.");
    }
    public Map<String, Object> post(Object obj) throws Exception {
        throw new UnsupportedOperationException("POST operation is not supported.");
    }

	
}
