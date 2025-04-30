package com.zoho.carshowroom.database;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.zoho.carshowroom.enums.TableMapping;
import com.zoho.carshowroom.util.Utility;

import java.lang.reflect.Field;
import java.util.*;

public class QueryBuilder {
	private StringBuilder query;
	private List<Object> params;
	private List<String> columns;
	private String tableName;

	public QueryBuilder() {
		this.query = new StringBuilder();
		this.params = createObjectList();
		this.columns = createStringList();
	}

	public QueryBuilder(String tableName) {
		Utility.checkNull(tableName);
		this.query = new StringBuilder();
		this.tableName = tableName;
		this.params = createObjectList();
		this.columns = createStringList();
	}

	public QueryBuilder insertQuery(Object obj) throws IllegalAccessException, NullPointerException {
		Utility.checkNull(obj);
		tableName = obj.getClass().getSimpleName();
		TableMapping mapping = TableMapping.getByTable(tableName);
		Map<String, String> columnMappings = mapping.getColumnMappings();
		Field[] fields = obj.getClass().getDeclaredFields();
		for (Field fd : fields) {
			fd.setAccessible(true);
			if (fd.get(obj) != null) {
//				System.out.println(fd.getName());
//				System.out.println(columnMappings.get(fd.getName()));
				columns.add(columnMappings.get(fd.getName()));
				params.add(fd.get(obj));
			}
		}
		query.append("INSERT INTO ").append(tableName).append(" (").append(String.join(", ", columns))
				.append(") VALUES (").append(String.join(", ", Collections.nCopies(columns.size(), "?"))).append(")");
		return this;
	}

	public QueryBuilder updateQuery(Object obj) throws IllegalAccessException, NullPointerException {
		Utility.checkNull(obj);
		tableName = obj.getClass().getSimpleName();
//		System.out.println(tableName);
		TableMapping mapping = TableMapping.getByTable(tableName);
		Map<String, String> columnMappings = mapping.getColumnMappings();
		Field[] fields = obj.getClass().getDeclaredFields();
		this.columns = new ArrayList<>();
		for (Field fd : fields) {
			fd.setAccessible(true);
			if (fd.get(obj) != null) {
//				System.out.println(fd.getName());
//				System.out.println(columnMappings.get(fd.getName()));
				columns.add(columnMappings.get(fd.getName()) + " =?");
				params.add(fd.get(obj));
			}
		}

		query.append("UPDATE ").append(tableName).append(" SET ").append(String.join(", ", columns));
		return this;
	}

	public QueryBuilder deleteQuery(String tableName) throws NullPointerException {
		Utility.checkNull(tableName);
		query.append("DELETE FROM ").append(tableName);
		return this;
	}

	public QueryBuilder selectQuery(String tableName, String... columns)
			throws NullPointerException {
		Utility.checkNull(tableName);
		Utility.checkNull(columns);
		query.append("SELECT ");
		if (columns.length == 0) {
			query.append("*");
		} else {
			query.append(String.join(", ", columns));
		}
		query.append(" FROM ").append(tableName);
		
		return this;
	}

	public QueryBuilder selectDistinctQuery(String tableName, String... columns)
			throws NullPointerException {
		Utility.checkNull(tableName);
		Utility.checkNull(columns);
		query.append("SELECT ");
		if (columns.length == 0) {
			query.append("*");
		} else {
			query.append("DISTINCT ").append(String.join(", ", columns));
		}
		query.append(" FROM ").append(tableName);
		
		return this;
	}

	public QueryBuilder selectAggregateQuery(String tableName, Map<String, String> aggregates,
			List<String> normalColumns) {
		Utility.checkNull(tableName);
		Utility.checkNull(aggregates);

		query.append("SELECT ");
		List<String> selections = new ArrayList<>();

		if (normalColumns != null) {
			selections.addAll(normalColumns);
		}

		for (Map.Entry<String, String> entry : aggregates.entrySet()) {
			selections.add(entry.getValue() + "(" + entry.getKey() + ") ");
		}

		query.append(String.join(", ", selections));
		query.append(" FROM ").append(tableName);
		return this;
	}

	public QueryBuilder setWhere(String column, String operator, Object value) throws NullPointerException {
		Utility.checkNull(column);
		Utility.checkNull(operator);
		Utility.checkNull(value);
		query.append(" WHERE ").append(column).append(" ").append(operator).append("?");
		params.add(value);
		return this;
	}

	public QueryBuilder setWhere(List<String> columns, List<String> operators, List<Object> values,
			List<String> logicalOperators) throws NullPointerException {
		Utility.checkNull(columns);
		Utility.checkNull(operators);
		Utility.checkNull(values);
		for (int i = 0; i < columns.size(); i++) {
			if (i == 0) {
				query.append(" WHERE ").append(columns.get(i)).append(" ").append(operators.get(i)).append("?");
			} else {
				if (!Utility.isNull(logicalOperators)) {
					query.append(" ").append(logicalOperators.get(i - 1)).append(" ").append(columns.get(i)).append(" ")
							.append(operators.get(i)).append("?");
				}
			}
		}
		params.addAll(values);
		return this;
	}

	public QueryBuilder setLogicalWhere(String logical, String column, String operator, Object value)
			throws NullPointerException {
		Utility.checkNull(logical);
		Utility.checkNull(column);
		Utility.checkNull(operator);
		Utility.checkNull(value);
		query.append(" ").append(logical).append(" ").append(column).append(" ").append(operator).append("?");
		params.add(value);
		return this;
	}

	public QueryBuilder setWhereLike(String column, String pattern) throws NullPointerException {
		Utility.checkNull(column);
		Utility.checkNull(pattern);
		query.append(" WHERE ").append(column).append(" LIKE ?");
		params.add(pattern);
		return this;
	}

	public QueryBuilder setWhereBetween(String column, Object start, String operator, Object end)
			throws NullPointerException {
		Utility.checkNull(start);
		Utility.checkNull(column);
		Utility.checkNull(operator);
		Utility.checkNull(end);
		query.append(" WHERE ").append(column).append(" BETWEEN ? ").append(operator).append(" ?");
		params.add(start);
		params.add(end);
		return this;
	}

	public QueryBuilder setValues(String column, String operator, Object value) throws NullPointerException {
		query.append(" SET ").append(column).append(" ").append(operator).append(" ").append(value);
		return this;
	}

	public QueryBuilder setJoin(String joinType, String table, String condition) {
		query.append(joinType).append(" JOIN ").append(table).append(" ON ").append(condition);
		return this;
	}

	public QueryBuilder setGroup(String... col) throws NullPointerException {
		Utility.checkNull(col);
		query.append(" GROUP BY ").append(String.join(",", col));
		return this;
	}

	public QueryBuilder setHaving(String condition) throws NullPointerException {
		Utility.checkNull(condition);
		query.append(" HAVING ").append(condition);
		return this;
	}

	public QueryBuilder setOrder(boolean ascending, String... column) throws NullPointerException {
		Utility.checkNull(ascending);
		Utility.checkNull(column);
		query.append(" ORDER BY ").append(String.join(",", column)).append(ascending ? " ASC" : " DESC");
		return this;
	}

	public QueryBuilder setLimitAndOffset(int count,int offset) throws NullPointerException {
		
		Utility.checkNull(count);
		Utility.checkNull(offset);
		int size=offset;
		offset=(count-1)*offset;
		
		query.append(" LIMIT ").append(size);
		query.append(" Offset ").append(offset);
		return this;
	}

	public QueryBuilder returning(String columnName) {
		if (columnName != null)
			query.append(" RETURNING ").append(columnName);
		return this;
	}

	public String toString() {
		return query.toString();
	}

	public List<Object> getParams() {
		return params;
	}

	public void clearAll() {
		this.params.clear();
		this.columns.clear();
		this.query = new StringBuilder();
		this.tableName = "";
	}

	private List<Object> createObjectList() {
		return new ArrayList<>();
	}

	private List<String> createStringList() {
		return new ArrayList<>();
	}

}
