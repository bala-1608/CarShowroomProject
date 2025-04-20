package com.zoho.carshowroom.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.zoho.carshowroom.database.QueryBuilder;
import com.zoho.carshowroom.database.QueryExecutor;
import com.zoho.carshowroom.enums.TableMapping;
import com.zoho.carshowroom.util.Utility;

public class ModelDAO {

	
	private QueryExecutor executor = new QueryExecutor();

	public List<Map<String, Object>> getModels(int companyId,Integer modelId, Boolean isActive,int showroomId,Boolean isAvailable) throws SQLException {

		QueryBuilder builder = new QueryBuilder();
		StringBuilder str = new StringBuilder();
		
	  
	  String companyName=str.append(TableMapping.COMPANY.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.COMPANY, "companyName")).toString();

		builder.selectDistinctQuery(TableMapping.MODEL.getTableName(),
				"ZShowroom.showroom_id","ZShowroom.name as showroom_name",
				"ZModel.company_id",
				"ZModel."+TableMapping.getColumnByField(TableMapping.MODEL, "modelId"),
				TableMapping.getColumnByField(TableMapping.MODEL, "modelPrice"),
				"ZModel."+TableMapping.getColumnByField(TableMapping.MODEL, "name"),
				"ZModel."+TableMapping.getColumnByField(TableMapping.MODEL, "isActive"), companyName,"ZCar.color");
		
		str.setLength(0);
		String joinCompanyTable=str.append(TableMapping.MODEL.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.MODEL, "companyId")).append(Utility.EQUAL)
				.append(TableMapping.COMPANY.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.COMPANY, "brandCode")).toString();
		
		builder.setJoin("", TableMapping.COMPANY.getTableName(), joinCompanyTable);
		
		str.setLength(0);
		String joinCarTable=str.append(TableMapping.CAR.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CAR, "modelId")).append(Utility.EQUAL)
				.append(TableMapping.MODEL.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.MODEL, "modelId")).toString();
		builder.setJoin("", TableMapping.CAR.getTableName(), joinCarTable);
		
		str.setLength(0);
		String joinShowroomTable=str.append(TableMapping.CAR.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CAR, "showroomId")).append(Utility.EQUAL)
				.append(TableMapping.SHOWROOM.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.SHOWROOM, "showroomId")).toString();
		builder.setJoin("", TableMapping.SHOWROOM.getTableName(), joinShowroomTable);

		if (!Utility.isNull(modelId)) {
			builder.setWhere(TableMapping.getColumnByField(TableMapping.MODEL, "modelId"), Utility.EQUAL,
					modelId);
		}
		if (!Utility.isNull(isActive) && isActive) {
			builder.setWhere("ZModel."+TableMapping.getColumnByField(TableMapping.MODEL, "isActive"), Utility.EQUAL, isActive);
		}
		if (!Utility.isNull(isAvailable) && isAvailable) {
			builder.setWhere("ZCar."+TableMapping.getColumnByField(TableMapping.CAR, "isAvailable"), Utility.EQUAL, isAvailable);
		}
		
		builder.setLogicalWhere(Utility.AND,"ZCompany."+TableMapping.getColumnByField(TableMapping.COMPANY, "brandCode"), Utility.EQUAL,
				companyId);
		builder.setLogicalWhere(Utility.AND,"ZShowroom."+TableMapping.getColumnByField(TableMapping.SHOWROOM, "showroomId"), Utility.EQUAL,
				showroomId);
		builder.setLogicalWhere(Utility.AND,"ZCar."+TableMapping.getColumnByField(TableMapping.CAR, "carType"), Utility.EQUAL,0);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> data = (List<Map<String, Object>>) executor.executeSQL(builder, null);
		return data;
	}
	
	
}
