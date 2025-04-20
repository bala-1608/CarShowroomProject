package com.zoho.carshowroom.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import com.zoho.carshowroom.util.Utility;

public class DatabaseConnection {

	private Connection con;
	private final String URL = "jdbc:postgresql://localhost:5432/carshowroom";
	private final String USER = "postgres";
	private final String PASS = "postgres";

	public Connection getConnection() {
		try {
			Class.forName("org.postgresql.Driver");
			con = DriverManager.getConnection(URL, USER, PASS);
		} catch (ClassNotFoundException e) {
			System.err.println("PostgreSQL Driver not found.");
			e.printStackTrace();
		} catch (SQLException e) {
			System.err.println("Error occured while making a database connection:");
			e.printStackTrace();
		}
		return con;
	}
	public void closeConnection(Connection con) {
		try {
			Utility.checkNull(con);
			if (!con.isClosed()) {
				con.close();
			}
		} catch (SQLException e) {
			System.err.println("Error occured while closing a connection:");
			e.printStackTrace();
		}
	}

}
