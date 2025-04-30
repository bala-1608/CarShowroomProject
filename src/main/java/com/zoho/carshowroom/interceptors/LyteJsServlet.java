package com.zoho.carshowroom.interceptors;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zoho.carshowroom.util.RolePermissions;


public class LyteJsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected synchronized void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       
		
        String role="user";
        
        String uri = request.getRequestURI().substring(request.getContextPath().length());
        
        
        
        if (uri.endsWith(".js") ) {
            if (!RolePermissions.hasAccess(role,true)) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Not authorized");
                return;
            }
        }
        InputStream in = getServletContext().getResourceAsStream(uri);
        ServletOutputStream out = response.getOutputStream();

        byte[] buffer = new byte[4096];
        int bytesRead;
        while ((bytesRead = in.read(buffer)) != -1) {
            out.write(buffer, 0, bytesRead);
        }

        in.close();
        out.flush(); 
        out.close();
    }

}
