package com.zoho.carshowroom.models;

import java.util.Map;

import com.zoho.carshowroom.util.Utility;

public class ZSession {

	private String sessionId;// primary key
	private Integer userId;
	private long expiryTime;
	private Short roleId;

	public ZSession() {
	}

	public ZSession(String string, Short roleId, Integer userId, long expiryTime) {
		Utility.checkNull(string);
		Utility.checkNull(expiryTime);
		Utility.checkNull(userId);
		Utility.checkNull(roleId);
		this.roleId = roleId;
		this.sessionId = string;
		this.userId = userId;
		this.expiryTime = expiryTime;
	}

	private void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}

	public long getExpiryTime() {
		return expiryTime;
	}

	public void setExpiryTime(long expiryTime) {
		Utility.checkNull(expiryTime);
		this.expiryTime = expiryTime;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		Utility.checkNull(userId);
		this.userId = userId;
	}

	public String getSessionId() {
		return sessionId;
	}

	public static ZSession sessionCreator(Map<String, Object> sessionData) {
		ZSession session = new ZSession();
		for (String key : sessionData.keySet()) {
			String value = sessionData.get(key).toString();
			Utility.checkNull(value);

			switch (key) {
			case "session_id":
				String sessionId = value;
				session.setSessionId(sessionId);
				break;

			case "user_id":
				Integer userId = Integer.parseInt(value);
				Utility.boundaryCheck(userId);
				session.setUserId(userId);
				break;

			case "expiry_time":
				Long expiryTime = Long.parseLong(value);
				Utility.boundaryCheck(expiryTime);
				session.setExpiryTime(expiryTime);
				break;

			case "role_id":
				Short roleId = Short.parseShort(value);
				Utility.boundaryCheck(roleId);
				session.setRoleId(roleId);
				break;

			}

		}

		return session;
	}

	public Short getRoleId() {
		return roleId;
	}

	public void setRoleId(Short roleId) {
		this.roleId = roleId;
	}

}
