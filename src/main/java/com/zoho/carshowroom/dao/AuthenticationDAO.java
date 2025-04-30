package com.zoho.carshowroom.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.zoho.carshowroom.database.QueryBuilder;
import com.zoho.carshowroom.database.QueryExecutor;
import com.zoho.carshowroom.enums.TableMapping;
import com.zoho.carshowroom.util.Utility;
import com.zoho.carshowroom.models.ZUsers;

public class AuthenticationDAO {

	private QueryExecutor executor = new QueryExecutor();

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getUserDetails(ZUsers user) throws SQLException {
		QueryBuilder builder = new QueryBuilder();
//
//		StringBuilder str = new StringBuilder();
//
//		str.append(TableMapping.USER.getTableName()).append(".")
//				.append(TableMapping.getColumnByField(TableMapping.USER, "userId")).append(Utility.EQUAL)
//				.append(TableMapping.SESSION.getTableName()).append(".")
//				.append((TableMapping.getColumnByField(TableMapping.SESSION, "userId")));
		List<String> whereColumns = List.of(TableMapping.getColumnByField(TableMapping.USER, "email"));
		List<String> whereOperators = List.of(Utility.EQUAL, Utility.EQUAL);
		List<String> logicalOperators = List.of(Utility.AND);
		List<Object> whereValues = List.of(user.getEmail());

		builder.selectQuery(TableMapping.USER.getTableName(),TableMapping.getColumnByField(TableMapping.USER, "userId"),
				TableMapping.getColumnByField(TableMapping.USER, "name"),
				TableMapping.getColumnByField(TableMapping.USER, "password"),
				TableMapping.getColumnByField(TableMapping.USER, "role"),
				TableMapping.getColumnByField(TableMapping.USER, "email"))
				.setWhere(whereColumns, whereOperators, whereValues, logicalOperators);
		List<Map<String, Object>> data = (List<Map<String, Object>>) executor.executeSQL(builder, null);
		return data;

	}

}
