package com.zoho.carshowroom.enums;

import java.util.Map;

import com.zoho.carshowroom.models.*;
import com.zoho.carshowroom.util.Utility;

public enum TableMapping {
	USER("ZUsers", ZUsers.class, Utility.createMapping(ZUsers.class)),
	ADDRESS("ZAddress", ZAddress.class, Utility.createMapping(ZAddress.class)),
	RATING("ZRating", ZRating.class, Utility.createMapping(ZRating.class)),
	CARBOOKING("ZCarBooking", ZCarBooking.class, Utility.createMapping(ZCarBooking.class)),
	MODEL("ZModel", ZModel.class, Utility.createMapping(ZModel.class)),
	SHOWROOM("ZShowroom", ZShowroom.class, Utility.createMapping(ZShowroom.class)),
	COMPANY("ZCompany", ZCompany.class, Utility.createMapping(ZCompany.class)),
	CAR("ZCar", ZCar.class, Utility.createMapping(ZCar.class)),
	SESSION("ZSession", ZSession.class, Utility.createMapping(ZSession.class));

	private final String tableName;
	private final Class<?> pojoClass;
	private final Map<String, String> columnMappings;

	TableMapping(String tableName, Class<?> pojoClass, Map<String, String> columnMappings) {
		Utility.checkNull(tableName);
		Utility.checkNull(pojoClass);
		Utility.checkNull(columnMappings);
		this.tableName = tableName;
		this.pojoClass = pojoClass;
		this.columnMappings = columnMappings;
	}

	public String getTableName() {
		return tableName;
	}

	public Class<?> getPojoClass() {
		return pojoClass;
	}

	public Map<String, String> getColumnMappings() {
		return columnMappings;
	}

	public static TableMapping getByTable(String tableName) {
		Utility.checkNull(tableName);
		for (TableMapping mapping : values()) {
			if (mapping.getTableName().equalsIgnoreCase(tableName)) {
				return mapping;
			}
		}
		throw new IllegalArgumentException("No mapping found for table: " + tableName);
	}

	public static String getColumnByField(TableMapping tableName, String fieldName) {
		Utility.checkNull(tableName);
		Utility.checkNull(fieldName);
		Map<String, String> map = tableName.getColumnMappings();
		if (map.containsKey(fieldName)) {
			return map.get(fieldName);
		}
		throw new IllegalArgumentException("No mapping found for table: " + tableName);
	}

}
