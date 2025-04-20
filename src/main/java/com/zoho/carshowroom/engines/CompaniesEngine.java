
//
//	

package com.zoho.carshowroom.engines;

import org.json.JSONObject;
import org.postgresql.util.PSQLException;

import com.zoho.carshowroom.dao.CompanyDAO;
import com.zoho.carshowroom.dao.DataAccessObject;
import com.zoho.carshowroom.database.DatabaseConnection;
import com.zoho.carshowroom.enums.TableMapping;
import com.zoho.carshowroom.util.Utility;
import com.zoho.carshowroom.models.ZAddress;
import com.zoho.carshowroom.models.ZCompany;
import com.zoho.carshowroom.models.ZUsers;

import java.io.IOException;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.*;

public class CompaniesEngine extends Engine {
	private final CompanyDAO companyDAO = new CompanyDAO();
	private final DataAccessObject dao = new DataAccessObject();

	public Map<String, Object> get(Boolean isActive, Integer companyId) throws IOException, SQLException {
		
		System.out.println("--------------------------");

		List<Map<String, Object>> data = companyDAO.getCompanies(companyId, isActive);
		if (!data.isEmpty()) {
			
			data.forEach(record -> {
				
				long timestamp = (long) record.get(TableMapping.getColumnByField(TableMapping.COMPANY, "startedYear"));
				record.put(TableMapping.getColumnByField(TableMapping.COMPANY, "startedYear"),
						new Date(timestamp).toString());
			});
			
			return Utility.jsonResponse(200, "success", data);
			 
			
		} else {
			
			return Utility.jsonResponse(200, "not found", null);
		}

	}

	//public Map<String, Object> post(Map<String, Object> inputData, Map<String, String> parts) throws Exception {

//		int userId = 0, addressId = 0;
//		DatabaseConnection dbConnection = new DatabaseConnection();
//		Connection con = null;
//
//		try {
//
//			con = dbConnection.getConnection();
//			con.setAutoCommit(false);
//			System.out.println("--------------------------");
//
//			Object obj = inputData.get("companyData");
//
//			// separating company and admin data from payload
//			Map<String, Object> companyData;
//			Map<String, Object> adminData;
//			if (obj instanceof JSONObject) {
//				companyData = Utility.fromJsonToMap(obj.toString());
//			} else {
//				return Utility.jsonResponse(400, "Invalid companyData format", null);
//			}
//			obj = inputData.get("adminData");
//			if (obj instanceof JSONObject) {
//				adminData = Utility.fromJsonToMap(obj.toString());
//			} else {
//				return Utility.jsonResponse(400, "Invalid companyData format", null);
//			}
//
//			System.out.println(adminData);
//			ZAddress address = ZAddress.addressCreator(adminData);
//			address.setStreet(Utility.format(address.getStreet()));
//			address.setCity(Utility.format(address.getCity()));
//
//			// searching address already available
//			List<Map<String, Object>> data = dao.getAdminAddressId(address);
//			if (data.isEmpty()) {
//				addressId = Integer.parseInt(dao.create(address, null));
//			} else {
//				addressId = (int) data.get(0).get(TableMapping.getColumnByField(TableMapping.ADDRESS, "addressId"));
//			}
//
//			// creating user
////			ZUsers user = ZUsers.userCreater(adminData);
//			user.setAddressId(addressId);
//			user.setPassword(Utility.HashPassword(user.getPassword()));
//
//			userId = Integer.parseInt(dao.create(user, con));
//			if (userId <= 0) {
//				Utility.jsonResponse(204, "failed", null);
//				System.out.println("failed");
//			}
//
//			// creating company
//			ZCompany company = ZCompany.companyCreator(companyData);
//			company.setAdminId(userId);
//
//			int rowsAffected = Integer.parseInt(dao.create(company, con));
//			if (rowsAffected <= 0) {
//				con.rollback();
//				return Utility.jsonResponse(204, "failed", null);
//			}
//
//			// only commit both queries works successfully
//			con.commit();
//			return Utility.jsonResponse(200, "success", rowsAffected);
//
//		} catch (PSQLException e) {
//
//			con.rollback();
//			e.printStackTrace();
//			System.out.println(e.getErrorCode());
//			return Utility.jsonResponse(403, "email exist", null);
//
//		} finally {
//			dbConnection.closeConnection(con);
//		}
	//}

	public Map<String, Object> delete(Map<String, String> parts) throws Exception {

		System.out.println("--------------------------");

		int brandCode = 0;
		if (parts.containsKey("companies")) {
			brandCode = Integer.parseInt(parts.get("companies"));
		} else {
			return Utility.jsonResponse(404, "company id null", null);
		}

		int adminId = dao.delete(TableMapping.COMPANY.getTableName(),
				TableMapping.getColumnByField(TableMapping.COMPANY, "brandCode"), Utility.EQUAL, brandCode,
				TableMapping.getColumnByField(TableMapping.COMPANY, "adminId"));

		if (adminId == 0) {
			return Utility.jsonResponse(404, "manager not converted to user", null);

		}

		if (dao.downgradeToUser(adminId) > 0) {

			System.out.println("company admin succesfully turned into user");
			System.out.println("Company deleted successfully");
			return Utility.jsonResponse(200, "success", adminId);

		} else {
			System.out.println("Error updating admin role");
			return Utility.jsonResponse(500, "error updating admin role", null);
		}

	}

	public Map<String, Object> put(Map<String, Object> inputData, Map<String, String> parts) throws Exception {
		System.out.println("--------------------------");

		// retrieving company id from URL path
		int brandCode = 0, rowsAffected = 0;
		if (parts.containsKey("companies")) {
			brandCode = Integer.parseInt(parts.get("companies"));
		} else {
			return Utility.jsonResponse(404, "company id null", null);
		}

		try {

			System.out.println("--------------------------");

			ZCompany company = ZCompany.companyCreator(inputData);

//			if (!company.isActive()) {
//				rowsAffected = dao.deactivate(company, TableMapping.getColumnByField(TableMapping.COMPANY, "brandCode"),
//						brandCode, null,null);
//			}

			rowsAffected = dao.update(company, TableMapping.getColumnByField(TableMapping.COMPANY, "brandCode"),
					Utility.EQUAL, brandCode, null);

			if (rowsAffected > 0) {
				System.out.println("Company updated successfully");
				return Utility.jsonResponse(200, "success", rowsAffected);
			} else {
				System.out.println("Error updating company");
				return Utility.jsonResponse(404, "not found", rowsAffected);
			}

		} catch (PSQLException e) {
			e.printStackTrace();
			return Utility.jsonResponse(405, "name used", null);
		} catch (IllegalArgumentException e) {
			return Utility.jsonResponse(405, "invalid started year", e);
		} catch (NullPointerException e) {
			return Utility.jsonResponse(400, "null", null);
		}
	}
}