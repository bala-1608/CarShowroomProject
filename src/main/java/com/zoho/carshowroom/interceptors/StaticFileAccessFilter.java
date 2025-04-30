package com.zoho.carshowroom.interceptors;


import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.zoho.carshowroom.util.RolePermissions;


public class StaticFileAccessFilter extends HttpFilter implements Filter {

	private static final long serialVersionUID = 1L;
	public void init(FilterConfig filterConfig) throws ServletException {
        
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        

        String uri = req.getRequestURI();
        HttpSession session = req.getSession(false);
        String role="user";
        System.out.println(uri);
        
        if (uri.endsWith(".js") ) {
        	System.out.println(" second in");
            if (session == null || session.getAttribute("user") == null) {
                res.sendError(HttpServletResponse.SC_FORBIDDEN, "Access Denied");
                return;
            }
            if (RolePermissions.hasAccess(role,true)) {
                res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Not authorized");
                return;
            }
        }

        
        chain.doFilter(request, response);
    }

    public void destroy() {
        
    }
	

}
