package com.zoho.carshowroom.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.zoho.carshowroom.database.QueryBuilder;
import com.zoho.carshowroom.database.QueryExecutor;
import com.zoho.carshowroom.enums.TableMapping;
import com.zoho.carshowroom.util.Utility;

@SuppressWarnings("unchecked")
public class CompanyDAO {
	private QueryExecutor executor = new QueryExecutor();

	public List<Map<String, Object>> getCompanies(Integer companyId, Boolean isActive,int pageNumber, int pageSize) throws SQLException {

		QueryBuilder builder = new QueryBuilder();
		StringBuilder str = new StringBuilder();
		str.append(TableMapping.USER.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.USER, "name"));

		builder.selectQuery(TableMapping.COMPANY.getTableName(),
				TableMapping.getColumnByField(TableMapping.COMPANY, "adminId"),
				TableMapping.getColumnByField(TableMapping.COMPANY, "brandCode"),
				TableMapping.getColumnByField(TableMapping.COMPANY, "companyName"),
				TableMapping.getColumnByField(TableMapping.COMPANY, "startedYear"),
				TableMapping.getColumnByField(TableMapping.COMPANY, "isActive"), str.toString()
				);

		

		str.setLength(0);
		str.append(TableMapping.COMPANY.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.COMPANY, "adminId")).append(Utility.EQUAL)
				.append(TableMapping.USER.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.USER, "userId"));
		
		builder.setJoin("", TableMapping.USER.getTableName(), str.toString()).setLimitAndOffset(pageNumber, pageSize);

		if (!Utility.isNull(companyId)) {
			builder.setWhere(TableMapping.getColumnByField(TableMapping.COMPANY, "brandCode"), Utility.EQUAL,
					companyId);
		}
		if (!Utility.isNull(isActive)&&isActive) {
			builder.setWhere(TableMapping.getColumnByField(TableMapping.MODEL, "isActive"), Utility.EQUAL, isActive);
		}
		List<Map<String, Object>> data = (List<Map<String, Object>>) executor.executeSQL(builder, null);
		return data;
	}

}
