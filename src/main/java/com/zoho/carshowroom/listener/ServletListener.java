package com.zoho.carshowroom.listener;

import java.sql.SQLException;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.zoho.carshowroom.dao.DataAccessObject;
import com.zoho.carshowroom.enums.TableMapping;
import com.zoho.carshowroom.util.Utility;

public class ServletListener implements ServletContextListener {
	private static final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

	public void contextInitialized(ServletContextEvent sce) {
		Runnable cleanupTask = () -> {
			try {
				try {
					deleteExpiredSessions();
				} catch (NullPointerException | IllegalAccessException e) {
					e.printStackTrace();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		};
		scheduler.scheduleAtFixedRate(cleanupTask, 0, 60, TimeUnit.MINUTES);
	}

	private static void deleteExpiredSessions() throws SQLException, NullPointerException, IllegalAccessException {
		
		DataAccessObject dao = new DataAccessObject();
		long currentTime = System.currentTimeMillis();
		int updatedRows = dao.delete(TableMapping.SESSION.getTableName(),
				TableMapping.getColumnByField(TableMapping.COMPANY, "expiryTime"), Utility.GREATER_THAN_OR_EQUAL,
				currentTime,null);
		if (updatedRows > 0) {
			System.out.println("in");
			System.out.println("Successfully deleted");
		}
	 }

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		scheduler.shutdown();
	}

}
