package com.zoho.carshowroom.engines;

import com.zoho.carshowroom.dao.DataAccessObject;
import com.zoho.carshowroom.enums.TableMapping;
import com.zoho.carshowroom.util.Utility;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class ReportsEngine extends Engine {
	private final DataAccessObject reportsDAO;

	public ReportsEngine() {
		this.reportsDAO = new DataAccessObject();
	}

	public Map<String,Object> get(Map<String, String> parts, Map<String, Object> queryParams) throws IOException, SQLException {

		
		int showroomId=0;
		if (parts.containsKey("showrooms")) {
			showroomId = Integer.parseInt(parts.get("showrooms"));
		}

		// Extract time filter from query parameters
//	    String startTime = req.getParameter("start_time");
//	    String endTime = req.getParameter("end_time");

		// Select columns: Car model and count of sold cars
		StringBuilder str = new StringBuilder();
		StringBuilder sb = new StringBuilder();

		str.append(TableMapping.CARBOOKING.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CARBOOKING, "carId"));

		Map<String, String> aggregates = Map.of(str.toString(), "COUNT");

		str.setLength(0);
		str.append(TableMapping.CAR.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CAR, "modelId"));

		List<String> columns = List.of(str.toString());

		str.setLength(0);
		str.append(TableMapping.CAR.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.SHOWROOM, "showroomId"));

		sb.append(TableMapping.CARBOOKING.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CARBOOKING, "status"));

		List<String> whereColumns = List.of(str.toString(), sb.toString());
		List<String> whereOperators = List.of(Utility.EQUAL, Utility.EQUAL);
		List<Object> whereValues = List.of(showroomId, 2); // 2 = "completed" status (sold cars)

		// Add time filter if provided
//	    if (startTime != null && endTime != null) {
//	        whereColumns.add(TableMapping.CARBOOKING.getTableName() + "." + TableMapping.getColumnByField(TableMapping.CARBOOKING, "completedAt"));
//	        whereOperators.add(Utility.AND);
//	        whereValues.add(List.of(Long.parseLong(startTime), Long.parseLong(endTime))); // BETWEEN start_time AND end_time
//	    }

		// Logical operators
		List<String> logicalOperators = new ArrayList<>(Collections.nCopies(whereColumns.size() - 1, Utility.AND));

		str.setLength(0);
		str.append(TableMapping.CAR.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CAR, "carId")).append(Utility.EQUAL)
				.append(TableMapping.CARBOOKING.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CARBOOKING, "carId")); // Convert to String if needed

		List<String> joinConditions = List.of(str.toString());
		List<String> joinTables = List.of(TableMapping.CAR.getTableName());
		List<String> joinTypes = List.of(""); // Default JOIN

		// Group by car model
		str.setLength(0);
		str.append(TableMapping.CAR.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CAR, "modelId"));
		List<String> groupBy = List.of(str.toString());

		List<Map<String, Object>> result = reportsDAO.fetchRecords(TableMapping.CARBOOKING.getTableName(), aggregates,
				columns, joinTables, joinConditions, joinTypes, whereColumns, whereOperators, whereValues,
				logicalOperators, groupBy, null, // Order by
				null, // Limit
				false, null);

		if (!result.isEmpty()) {
			return Utility.jsonResponse( 200, "success", result);
		} else {
			System.out.println("---------- No Reports Found ----------");
			return Utility.jsonResponse( 404, "no report found", null);
		}
	}


}
