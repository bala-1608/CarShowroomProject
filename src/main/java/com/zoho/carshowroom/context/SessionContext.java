package com.zoho.carshowroom.context;

import com.zoho.carshowroom.models.ZSession;

public class SessionContext {
	private static final ThreadLocal<ZSession> Session=new ThreadLocal<>();
	
	public static void set(ZSession session) {
		Session.set(session);
	}
	public static ZSession get() {
		return Session.get();
	}
	public static void clear() {
		Session.remove();
	}
}
