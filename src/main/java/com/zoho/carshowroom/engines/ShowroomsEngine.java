package com.zoho.carshowroom.engines;



import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;
import com.zoho.carshowroom.dao.DataAccessObject;
import com.zoho.carshowroom.dao.ShowroomDAO;
import com.zoho.carshowroom.enums.TableMapping;
import com.zoho.carshowroom.util.Utility;
import com.zoho.carshowroom.models.ZAddress;
import com.zoho.carshowroom.models.ZShowroom;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public class ShowroomsEngine  extends Engine{
	private final DataAccessObject dao;
	private final ShowroomDAO showroomDAO;
	private List<String> whereColumns;
	private List<String> whereOperators;
	private List<Object> whereValues;
	private List<String> columns;
	private List<String> logicalOperators;
	private List<Map<String, Object>> data;

	public ShowroomsEngine() {
		this.showroomDAO = new ShowroomDAO();
		this.dao = new DataAccessObject();
	}

	public Map<String,Object> get(int companyId,Integer showroomId,Boolean isActive) throws IOException, SQLException {

		// get showrooms
		List<Map<String, Object>> data = showroomDAO.getShowrooms(companyId,showroomId, isActive);
		
		if (!data.isEmpty()) {
			return Utility.jsonResponse( 200, "success", data);
		} else {
			return Utility.jsonResponse( 204, "not found", null);
		}
		
		
	}

	public Map<String,Object> delete( Map<String, String> parts)
			throws IOException, NullPointerException, IllegalAccessException, IllegalArgumentException,
			InvocationTargetException, NoSuchMethodException, SecurityException, SQLException {
		int showroomId = 0, companyId=0;
		
		
		if(parts.containsKey("companies")) {
			companyId=Integer.parseInt(parts.get("companies"));
		}
		if (parts.containsKey("showrooms")) {
			showroomId = Integer.parseInt(parts.get("showrooms"));
		}


		ZShowroom showroom = new ZShowroom();
		showroom.setActive(false);

		whereColumns = List.of(TableMapping.getColumnByField(TableMapping.SHOWROOM, "showroomId"),
				TableMapping.getColumnByField(TableMapping.SHOWROOM, "companyId"));
		whereOperators = List.of(Utility.EQUAL, Utility.EQUAL);
		whereValues = List.of(showroomId, companyId);
		logicalOperators = List.of(Utility.AND);

		int managerId = dao.delete(TableMapping.SHOWROOM.getTableName(), whereColumns, whereOperators, whereValues, logicalOperators,
				TableMapping.getColumnByField(TableMapping.SHOWROOM, "managerId"));

		if (managerId == 0) {
			return Utility.jsonResponse( 200, "error occured while deleting showroom", null);
		}

		int rowsAffected = dao.downgradeToUser(managerId);
		if (rowsAffected > 0) {
			System.out.println("Showroom manager successfully turned into user");
			System.out.println("Showroom deleted successfully");
			return Utility.jsonResponse( 200, "showroom deleted successfully", rowsAffected);

		} else {
			return Utility.jsonResponse( 500, "error updating  manager role", null);
		}

	}



	public Map<String,Object> put(Map<String, Object> inputData, Map<String, String> parts) throws JsonSyntaxException,
			JsonIOException, IOException, IllegalAccessException, NullPointerException, SQLException {

		
		int showroomId = 0,companyId=0;
		
		
		if(parts.containsKey("companies")) {
			companyId=Integer.parseInt(parts.get("companies"));
		}
		
		if (parts.containsKey("showrooms")) {
			showroomId = Integer.parseInt(parts.get("showrooms"));
		}

		ZShowroom showroom = ZShowroom.showroomCreator(inputData);
		

		whereColumns = List.of(TableMapping.getColumnByField(TableMapping.SHOWROOM, "showroomId"),
				TableMapping.getColumnByField(TableMapping.SHOWROOM, "companyId"));
		whereOperators = List.of(Utility.EQUAL, Utility.EQUAL);
		whereValues = List.of(showroomId, companyId);
		logicalOperators = List.of(Utility.AND);

		int rowsAffected = dao.update(showroom, whereColumns, whereOperators, whereValues, logicalOperators);

		if (rowsAffected > 0) {
			System.out.println("Showroom updated successfully");
			return Utility.jsonResponse( 200, "showroom updated successfully", null);
		} else {
			System.out.println("Error updating showroom");
			return Utility.jsonResponse( 500, "error updating showroom", null);
		}
	}

	public int createAddress(Map<String, Object> inputData)
			throws SQLException, NumberFormatException, IllegalAccessException, NullPointerException {
		ZAddress address = ZAddress.addressCreator(inputData);
		int addressId;

		columns = List.of(TableMapping.getColumnByField(TableMapping.ADDRESS, "addressId"));
		whereColumns = List.of(TableMapping.getColumnByField(TableMapping.ADDRESS, "doorNo"),
				TableMapping.getColumnByField(TableMapping.ADDRESS, "street"),
				TableMapping.getColumnByField(TableMapping.ADDRESS, "city"),
				TableMapping.getColumnByField(TableMapping.ADDRESS, "postalCode"));
		logicalOperators = List.of(Utility.AND, Utility.AND, Utility.AND);
		whereOperators = List.of(Utility.EQUAL, Utility.EQUAL, Utility.EQUAL, Utility.EQUAL);
		whereValues = List.of(address.getDoorNo(), address.getStreet(), address.getCity(), address.getPostalCode());

		data = (List<Map<String, Object>>) dao.fetchRecords(address.getClass().getSimpleName(), null, columns,
				null, null, null, whereColumns, whereOperators, whereValues, logicalOperators, null, null, null, false,
				null);
		if (data.isEmpty()) {
			addressId = Integer.parseInt(dao.create(address,null));
		} else {
			addressId = (int) data.get(0).get(TableMapping.getColumnByField(TableMapping.ADDRESS, "addressId"));
		}
		return addressId;
	}

	
}
