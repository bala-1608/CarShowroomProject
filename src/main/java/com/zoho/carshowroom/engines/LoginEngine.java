
package com.zoho.carshowroom.engines;

import java.io.IOException;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import javax.servlet.http.*;

import org.json.JSONObject;

import com.zoho.carshowroom.dao.AuthenticationDAO;
import com.zoho.carshowroom.dao.DataAccessObject;
import com.zoho.carshowroom.enums.TableMapping;
import com.zoho.carshowroom.enums.UserRole;
import com.zoho.carshowroom.util.Utility;
import com.zoho.carshowroom.models.ZSession;
import com.zoho.carshowroom.models.ZUsers;

import java.util.UUID;

public class LoginEngine  {
	
	private final DataAccessObject dao= new DataAccessObject();
	private final AuthenticationDAO loginDAO = new AuthenticationDAO();


	public Map<String,Object> post( ZUsers user,HttpServletResponse response)
			throws IOException, IllegalAccessException, NullPointerException, SQLException {
		
		try {
			
			Utility.checkNull(user);
			
			// get user id,name,and role
			List<Map<String,Object>>data=loginDAO.getUserDetails(user);
			
			

			if (data == null || data.isEmpty()) {
				return Utility.jsonResponse( 200, "register first", null);
			}

			//storing user id ,password and role
			int userId = (int) data.get(0).get((TableMapping.getColumnByField(TableMapping.USER, "userId")));
			String storedPassword = (String) data.get(0)
					.get((TableMapping.getColumnByField(TableMapping.USER, "password")));
			int role = (int) data.get(0).get((TableMapping.getColumnByField(TableMapping.USER, "role")));

			if (!Utility.checkPassword(user.getPassword(), storedPassword)) {
				return Utility.jsonResponse(200, "password mismatch", null);
				
			}

			//generating sessionId with uuid
			long expiry = System.currentTimeMillis();
			String uuid = UUID.randomUUID().toString();

			ZSession ses = new ZSession(uuid, (short) role, userId, expiry);
			if (!dao.create(ses,null).isEmpty()) {
				
				addCookie(response,uuid);
				data.get(0).put(TableMapping.getColumnByField(TableMapping.USER, "role"), UserRole.fromValue(role));
				data.get(0).remove(TableMapping.getColumnByField(TableMapping.USER, "password"));
				

				return Utility.jsonResponse( 200, "success", data);
				
			} else {
				return Utility.jsonResponse( 404, "failed", null);
			}
			
		}
		catch(Exception e) {
			e.printStackTrace();
			return Utility.jsonResponse( 400, "exception thrown", null);
		}
		

	}

	

	private void addCookie(HttpServletResponse response, String sessionId) {
		
		    Cookie sessionCookie = new Cookie("sessionId", sessionId);
		    sessionCookie.setMaxAge(3600);  
		    sessionCookie.setPath("/");
		    response.addCookie(sessionCookie);
	}



}
