package com.zoho.carshowroom.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.zoho.carshowroom.database.QueryBuilder;
import com.zoho.carshowroom.database.QueryExecutor;
import com.zoho.carshowroom.enums.TableMapping;
import com.zoho.carshowroom.util.Utility;

public class ShowroomDAO {
	private QueryExecutor executor = new QueryExecutor();

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getShowrooms(int companyId,Integer showroomId, Boolean isActive) throws SQLException {

		QueryBuilder builder = new QueryBuilder();
		StringBuilder str = new StringBuilder();
		
	  String managerName=str.append(TableMapping.USER.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.USER, "name")).toString();
	  
	  str.setLength(0);
	  String companyName=str.append(TableMapping.COMPANY.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.COMPANY, "companyName")).toString();

		builder.selectQuery(TableMapping.SHOWROOM.getTableName(),
				TableMapping.getColumnByField(TableMapping.SHOWROOM, "showroomId"),
				"ZShowroom."+TableMapping.getColumnByField(TableMapping.SHOWROOM, "name")+" AS showroom_name",
				"ZShowroom."+TableMapping.getColumnByField(TableMapping.SHOWROOM, "isActive")
				, managerName,companyName,"company_id","manager_id");

		

		str.setLength(0);
		String joinUserTable=str.append(TableMapping.SHOWROOM.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.SHOWROOM, "managerId")).append(Utility.EQUAL)
				.append(TableMapping.USER.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.USER, "userId")).toString();
		
		str.setLength(0);
		String joinCompanyTable=str.append(TableMapping.SHOWROOM.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.SHOWROOM, "companyId")).append(Utility.EQUAL)
				.append(TableMapping.COMPANY.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.COMPANY, "brandCode")).toString();
		
		builder.setJoin("", TableMapping.USER.getTableName(), joinUserTable);
		builder.setJoin("", TableMapping.COMPANY.getTableName(), joinCompanyTable);

		if (!Utility.isNull(showroomId)) {
			builder.setWhere(TableMapping.getColumnByField(TableMapping.SHOWROOM, "showroomId"), Utility.EQUAL,
					showroomId);
			builder.setLogicalWhere(Utility.AND,TableMapping.getColumnByField(TableMapping.SHOWROOM, "companyId"), Utility.EQUAL,
					companyId);
			if (!Utility.isNull(isActive) && isActive) {
				builder.setLogicalWhere(Utility.AND,"ZShowroom."+TableMapping.getColumnByField(TableMapping.SHOWROOM, "isActive"), Utility.EQUAL, isActive);
			}
		}
		else if (!Utility.isNull(isActive) && isActive) {
			builder.setWhere("ZShowroom."+TableMapping.getColumnByField(TableMapping.SHOWROOM, "isActive"), Utility.EQUAL, isActive);
			builder.setLogicalWhere(Utility.AND,TableMapping.getColumnByField(TableMapping.SHOWROOM, "companyId"), Utility.EQUAL,
					companyId);
		}
		else {
			builder.setWhere(TableMapping.getColumnByField(TableMapping.SHOWROOM, "companyId"), Utility.EQUAL,
					companyId);
		}
		
		
		List<Map<String, Object>> data = (List<Map<String, Object>>) executor.executeSQL(builder, null);
		return data;
		
	}
	
	
	
}
