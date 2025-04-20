
package com.zoho.carshowroom.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zoho.carshowroom.util.Utility;

public class QueryExecutor {
	private DatabaseConnection dbConnection;
	private Connection connection;
	private ResultSet rs;
	private PreparedStatement prepareStatement;

	public QueryExecutor() {
		this.dbConnection = new DatabaseConnection();
	}

	public synchronized Object executeSQL(QueryBuilder build,Connection prvCon) throws SQLException {
		Utility.checkNull(build);
		String query = build.toString();
		System.out.println(query);
		List<Object> params = build.getParams();
		System.out.println(params);

		boolean usedPrvCon = false;
		try {
		    if (prvCon != null) {
		        connection = prvCon;
		        usedPrvCon = true;
		    }

		    if (connection == null || connection.isClosed()) {
		        connection = dbConnection.getConnection();
		    }

		    prepareStatement = connection.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS);
		    Utility.checkNull(prepareStatement);

		    for (int i = 0; i < params.size(); i++) {
		        prepareStatement.setObject(i + 1, params.get(i));
		    }

		    boolean hasResultSet = prepareStatement.execute();

		    if (hasResultSet) {
		        rs = prepareStatement.getResultSet();
		        List<Map<String, Object>> resultList = new ArrayList<>();
		        ResultSetMetaData metaData = rs.getMetaData();
		        int columnCount = metaData.getColumnCount();

		        while (rs.next()) {
		            Map<String, Object> row = new HashMap<>();
		            for (int i = 1; i <= columnCount; i++) {
		                row.put(metaData.getColumnName(i), rs.getObject(i));
		            }
		            resultList.add(row);
		        }
		        return resultList;

		    } else {
		        int affectedRows = prepareStatement.getUpdateCount();

		        if (query.trim().toUpperCase().startsWith("INSERT")
		                || query.trim().toUpperCase().contains("RETURNING")) {
		            rs = prepareStatement.getGeneratedKeys();
		            if (rs != null && rs.next()) {
		                return rs.getObject(1);
		            }
		        }

		        return affectedRows;
		    }

		} finally {
			try {
		        if (rs != null) rs.close();
		        if (prepareStatement != null) prepareStatement.close();
		    } catch (Exception e) {
		        e.printStackTrace();
		    }

		    if (!usedPrvCon) {
//		        System.out.println("Closing connection by thread: " + Thread.currentThread().getName());
		        dbConnection.closeConnection(connection);
		    }
		}

//		System.out.println("--------------------------");
//
//		Utility.checkNull(build);
//		String query = build.toString();
//		System.out.println(query);
//		List<Object> params = build.getParams();
//		System.out.println(params);
//		Boolean isUsedPrv=false; 
//		try {
//			if(prvCon!=null) {
//				connection=prvCon;
//				isUsedPrv=true;
//			}
//			if (connection == null || connection.isClosed()) {
//				connection = dbConnection.getConnection();
//			}
//
//			prepareStatement = connection.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS);
//			Utility.checkNull(prepareStatement);
//
//			for (int i = 0; i < params.size(); i++) {
//				prepareStatement.setObject(i + 1, params.get(i));
//			}
//
//			boolean hasResultSet = prepareStatement.execute();
//			if (hasResultSet) {
//				rs = prepareStatement.getResultSet();
//				List<Map<String, Object>> resultList = new ArrayList<>();
//				while (rs.next()) {
//					Map<String, Object> row = new HashMap<>();
//					ResultSetMetaData metaData = rs.getMetaData();
//					int columnCount = metaData.getColumnCount();
//					for (int i = 1; i <= columnCount; i++) {
//						row.put(metaData.getColumnName(i), rs.getObject(i));
//					}
//					resultList.add(row);
//				}
//				return resultList;
//			} else {
//				int affectedRows = prepareStatement.getUpdateCount();
//				if (query.trim().toUpperCase().startsWith("INSERT")
//						|| query.trim().toUpperCase().contains("RETURNING")) {
//					rs = prepareStatement.getGeneratedKeys();
//					if (rs.next()) {
//						return rs.getObject(1);
//					}
//				}
//				return affectedRows;
//			}
//		} finally {
//			
//            if (!isUsedPrv) {
//                dbConnection.closeConnection(connection);
//            }
//			
//		}
	}
}
