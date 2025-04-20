package com.zoho.carshowroom.engines;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import javax.servlet.http.*;
import javax.servlet.http.Cookie;

import com.zoho.carshowroom.dao.DataAccessObject;
import com.zoho.carshowroom.enums.TableMapping;
import com.zoho.carshowroom.util.Utility;

public class LogoutEngine {

	private DataAccessObject logoutDAO;

	public LogoutEngine() {
		this.logoutDAO = new DataAccessObject();
	}

	public Map<String,Object> delete(HttpServletRequest request, HttpServletResponse response)
			throws IOException, SQLException, NullPointerException, IllegalAccessException {

		String sessionId = deleteCookie(request, response, "sessionId");
		if(sessionId==null) {
			return Utility.jsonResponse( 404, "failed", null);
		}

		int rowsAffected = logoutDAO.delete(TableMapping.SESSION.getTableName(),
				TableMapping.getColumnByField(TableMapping.SESSION, "sessionId"), Utility.EQUAL, sessionId,null);

		if (rowsAffected > 0) {
			return Utility.jsonResponse( 200, "success", null);
		} else {
			return Utility.jsonResponse( 404, "failed", null);

		}

	}

	private String deleteCookie(HttpServletRequest request, HttpServletResponse response, String cookieName) {
		String sessionId = null;
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals(cookieName)) {
					sessionId = cookie.getValue();
					cookie.setValue(""); // Clear cookie value
					cookie.setPath("/"); // Ensure correct path
					cookie.setMaxAge(0); // Expire the cookie immediately
					response.addCookie(cookie); // Add to response
				}
			}
		}
		return sessionId;
	}

}
