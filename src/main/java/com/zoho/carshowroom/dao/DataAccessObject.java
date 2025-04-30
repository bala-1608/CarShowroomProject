package com.zoho.carshowroom.dao;

import java.lang.reflect.InvocationTargetException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.zoho.carshowroom.database.QueryBuilder;
import com.zoho.carshowroom.database.QueryExecutor;
import com.zoho.carshowroom.enums.TableMapping;
import com.zoho.carshowroom.util.Utility;
import com.zoho.carshowroom.models.ZAddress;
import com.zoho.carshowroom.models.ZUsers;

public class DataAccessObject {

	QueryExecutor executor = new QueryExecutor();

	public String create(Object obj, Connection con) throws SQLException, IllegalAccessException, NullPointerException {

		Utility.checkNull(obj);
		QueryBuilder builder = new QueryBuilder();
		builder = builder.insertQuery(obj);
		return String.valueOf(executor.executeSQL(builder, con));
	}

	public int deactivate(Object obj, String column, Integer id, String returningColumn, Connection con)
			throws SQLException, NullPointerException, IllegalAccessException, IllegalArgumentException,
			InvocationTargetException, NoSuchMethodException, SecurityException {

		Utility.checkNull(column);
		Utility.checkNull(obj);
		Utility.checkNull(id);

		QueryBuilder builder = new QueryBuilder();
		if (returningColumn != null && !returningColumn.isEmpty()) {
			builder = builder.updateQuery(obj).setWhere(column, Utility.EQUAL, id).returning(returningColumn);
		} else {
			builder = builder.updateQuery(obj).setWhere(column, Utility.EQUAL, id);
		}

		return (int) executor.executeSQL(builder, con);
	}

	public int deactivate(Object obj, List<String> columns, List<String> operators, List<Object> values,
			List<String> logicalOperators, String returningColumn)
			throws SQLException, NullPointerException, IllegalAccessException, IllegalArgumentException,
			InvocationTargetException, NoSuchMethodException, SecurityException {

		Utility.checkNull(columns);
		Utility.checkNull(obj);
		Utility.checkNull(values);

		QueryBuilder builder = new QueryBuilder();
		if (returningColumn != null && !returningColumn.isEmpty()) {
			builder = builder.updateQuery(obj).setWhere(columns, operators, values, logicalOperators)
					.returning(returningColumn);
		} else {
			builder = builder.updateQuery(obj).setWhere(columns, operators, values, logicalOperators);
		}

		return (int) executor.executeSQL(builder, null);
	}

	public int delete(String tableName, String columnName, String operator, Object id, String returningColumn)
			throws SQLException, NullPointerException, IllegalAccessException {

		Utility.checkNull(tableName);
		Utility.checkNull(columnName);
		Utility.checkNull(operator);
		Utility.checkNull(id);

		QueryBuilder builder = new QueryBuilder();
		builder = builder.deleteQuery(tableName).setWhere(columnName, operator, id).returning(returningColumn);
		return (int) executor.executeSQL(builder, null);
	}

	public int delete(String tableName, List<String> whereColumns, List<String> whereOperators,
			List<Object> whereValues, List<String> whereLogicOperators,String returningColumn)
			throws SQLException, NullPointerException, IllegalAccessException {

		Utility.checkNull(tableName);
		Utility.checkNull(whereColumns);
		Utility.checkNull(whereOperators);
		Utility.checkNull(whereLogicOperators);
		Utility.checkNull(whereValues);

		QueryBuilder builder = new QueryBuilder();
		builder = builder.deleteQuery(tableName);
		if (!Utility.isNull(whereColumns) && !Utility.isNull(whereOperators) && !Utility.isNull(whereValues)
				&& !Utility.isNull(whereLogicOperators)) {
			builder.setWhere(whereColumns, whereOperators, whereValues, whereLogicOperators);
		}
		builder.returning(returningColumn);
		return (int) executor.executeSQL(builder, null);
	}

	public int downgradeToUser(int id) throws SQLException, NullPointerException, IllegalAccessException {

		Utility.checkNull(id);
		QueryBuilder builder = new QueryBuilder();
		ZUsers user = new ZUsers();
		user.setRole((short) 0);

		builder = builder.updateQuery(user).setWhere(TableMapping.getColumnByField(TableMapping.USER, "userId"),
				Utility.EQUAL, id);
		return (int) executor.executeSQL(builder, null);
	}

	public int update(Object obj, String columnName, String operator, Object id, Connection con)
			throws SQLException, NullPointerException, IllegalAccessException {

		Utility.checkNull(obj);
		Utility.checkNull(columnName);
		Utility.checkNull(operator);
		Utility.checkNull(id);

		QueryBuilder builder = new QueryBuilder();
		builder = builder.updateQuery(obj).setWhere(columnName, operator, id);
		return (int) executor.executeSQL(builder, con);
	}

	public int update(Object obj, List<String> whereColumns, List<String> whereOperators, List<Object> whereValues,
			List<String> whereLogicOperators) throws IllegalAccessException, NullPointerException, SQLException {
		Utility.checkNull(obj);

		QueryBuilder builder = new QueryBuilder();
		builder = builder.updateQuery(obj);

		if (!Utility.isNull(whereColumns) && !Utility.isNull(whereOperators) && !Utility.isNull(whereValues)
				&& !Utility.isNull(whereLogicOperators)) {
			builder.setWhere(whereColumns, whereOperators, whereValues, whereLogicOperators);
		} else {
			builder.setWhere(whereColumns.get(0), whereOperators.get(0), whereValues.get(0));
		}

		return (int) executor.executeSQL(builder, null);
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getAdminAddressId(ZAddress address) throws SQLException {

		QueryBuilder builder = new QueryBuilder();

		List<String> whereColumns = List.of(TableMapping.getColumnByField(TableMapping.ADDRESS, "doorNo"),
				TableMapping.getColumnByField(TableMapping.ADDRESS, "street"),
				TableMapping.getColumnByField(TableMapping.ADDRESS, "city"),
				TableMapping.getColumnByField(TableMapping.ADDRESS, "postalCode"));
		List<String> logicOperators = List.of(Utility.AND, Utility.AND, Utility.AND);
		List<String> whereOperators = List.of(Utility.EQUAL, Utility.EQUAL, Utility.EQUAL, Utility.EQUAL);
		List<Object> whereValues = List.of(address.getDoorNo(), address.getStreet(), address.getCity(),
				address.getPostalCode());

		builder.selectQuery(TableMapping.ADDRESS.getTableName(),null,null,
				TableMapping.getColumnByField(TableMapping.ADDRESS, "addressId"));
		builder.setWhere(whereColumns, whereOperators, whereValues, logicOperators);

		return (List<Map<String, Object>>) executor.executeSQL(builder, null);

	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> fetchRecords(String tableName, Map<String, String> aggregates,
			List<String> columns, List<String> joinTables, List<String> joinConditions, List<String> joinTypes,
			List<String> whereColumns, List<String> whereOperators, List<Object> whereValues,
			List<String> whereLogicOperators, List<String> groupByColumns, String havingCondition,
			List<String> orderByColumns, boolean orderDirection, Integer limit) throws SQLException {

		QueryBuilder builder = new QueryBuilder();

		Utility.onlyCheckNull(builder);
		if (columns.isEmpty()) {
			columns.add(Utility.ALL_COLUMNS);
		}
		if (!Utility.isNull(aggregates) && !aggregates.isEmpty()) {
			builder = builder.selectAggregateQuery(tableName, aggregates, columns);
		} else {
			builder = builder.selectQuery(tableName, columns.toArray(new String[0]));
		}

		if (!Utility.isNull(joinTables) && !Utility.isNull(joinConditions) && !Utility.isNull(joinTypes)) {
			for (int i = 0; i < joinTables.size(); i++) {
				builder.setJoin(joinTypes.get(i), joinTables.get(i), joinConditions.get(i));
			}
		}
		if (!Utility.isNull(whereLogicOperators)) {
			if (!Utility.isNull(whereColumns) && !Utility.isNull(whereOperators) && !Utility.isNull(whereValues)) {
				builder.setWhere(whereColumns, whereOperators, whereValues, whereLogicOperators);
			}
		} else {
			if (!Utility.isNull(whereColumns) && !Utility.isNull(whereOperators) && !Utility.isNull(whereValues)) {
				builder.setWhere(whereColumns.get(0), whereOperators.get(0), whereValues.get(0));
			}

		}

		if (!Utility.isNull(groupByColumns)) {
			builder.setGroup(groupByColumns.toArray(new String[0]));
		}

		if (!Utility.isNull(havingCondition)) {
			builder.setHaving(havingCondition);
		}

		if (!Utility.isNull(orderByColumns)) {
			builder.setOrder(orderDirection, orderByColumns.toArray(new String[0]));
		}

		Utility.boundaryCheck(limit);
		

		return (List<Map<String, Object>>) executor.executeSQL(builder, null);
	}

	@SuppressWarnings("unchecked")
	public  Map<String, Object>  getSessionFromDB(String sessionId) {
		QueryBuilder builder = new QueryBuilder();

		try {

			builder.selectQuery(TableMapping.SESSION.getTableName(),null,null, Utility.ALL_COLUMNS).setWhere(
					TableMapping.getColumnByField(TableMapping.SESSION, "sessionId"), Utility.EQUAL, sessionId);
			List<Map<String, Object>> data = (List<Map<String, Object>>) executor.executeSQL(builder, null);
			if (data == null || data.isEmpty()) {
				return null;
			}
			return data.get(0);
			
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}

}
