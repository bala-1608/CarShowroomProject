package com.zoho.carshowroom.engines;

import com.zoho.carshowroom.dao.DataAccessObject;
import com.zoho.carshowroom.enums.BookingType;
import com.zoho.carshowroom.enums.CarType;
import com.zoho.carshowroom.enums.Status;
import com.zoho.carshowroom.enums.TableMapping;
import com.zoho.carshowroom.util.Utility;
import com.zoho.carshowroom.models.ZCar;

import java.io.IOException;
import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class CarsEngine extends Engine {
	private final DataAccessObject carDAO;
	private List<String> columns;
	private List<String> whereColumns;
	private List<String> whereOperators;
	private List<Object> whereValues;
	private List<String> logicalOperators;
	private List<Map<String, Object>> data;

	public CarsEngine() {
		this.carDAO = new DataAccessObject();
	}

	public Map<String, Object> get(Integer companyId,Integer showroomId,Integer modelId,Integer userId,Integer carId,Boolean isAvailable)
			throws IOException, SQLException {

		if (!Utility.isNull(userId)) {
			Map<String, Object> data = viewUserCars(userId);
			return data;
		}

		whereColumns = new ArrayList<>();
		whereOperators = new ArrayList<>();
		whereValues = new ArrayList<>();
		logicalOperators = new ArrayList<>();


		if (!Utility.isNull(carId)) {
			whereColumns.add(TableMapping.getColumnByField(TableMapping.CAR, "carId"));
			whereValues.add(carId);
		}

		StringBuilder str = new StringBuilder();

		str.append(TableMapping.CAR.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CAR, "carId"));

		columns = List.of(str.toString());

		List<String> joinTypes = List.of("");

		str.setLength(0);
		str.append(TableMapping.SHOWROOM.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.SHOWROOM, "showroomId")).append(Utility.EQUAL)
				.append(TableMapping.CAR.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CAR, "showroomId"));

		List<String> joinConditions = List.of(str.toString());
		List<String> joinTables = List.of(TableMapping.SHOWROOM.getTableName());

		str.setLength(0);
		str.append(TableMapping.SHOWROOM.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.SHOWROOM, "companyId"));
		whereColumns.add(str.toString());

		str.setLength(0);
		str.append(TableMapping.CAR.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CAR, "modelId"));
		whereColumns.add(str.toString());

		str.setLength(0);
		str.append(TableMapping.CAR.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CAR, "showroomId"));
		whereColumns.add(str.toString());

		List<String> whereOperators = new ArrayList<>(Collections.nCopies(whereColumns.size(), Utility.EQUAL));
		whereValues.add(companyId);
		whereValues.add(modelId);
		whereValues.add(showroomId);
//		whereValues = List.of(companyId, modelId, showroomId);

		if (Utility.isNull("isAvailable")) {
			whereColumns.add(TableMapping.getColumnByField(TableMapping.CAR, "isAvailable"));
			whereOperators.add(Utility.EQUAL);
			whereValues.add(true);
		}

		logicalOperators = new ArrayList<>(Collections.nCopies(whereColumns.size() - 1, Utility.AND));

		data = carDAO.fetchRecords(TableMapping.CAR.getTableName(), null, columns, joinTables, joinConditions,
				joinTypes, whereColumns, whereOperators, whereValues, logicalOperators, null, null, null, false, null);

		if (!data.isEmpty()) {
			return Utility.jsonResponse(200, "success", data);
		} else {
			return Utility.jsonResponse(404, "not found", null);
		}
	}

	public Map<String, Object> post(Map<String, Object> inputData, Map<String, String> parts) throws Exception {

		int showroomId = 0, modelId = 0;

		if (parts.containsKey("showrooms")) {
			showroomId = Integer.parseInt(parts.get("showrooms"));
		}
		if (parts.containsKey("models")) {
			modelId = Integer.parseInt(parts.get("models"));
		}

		int count = 0, rowsAffected = 0;

		if (inputData.containsKey("quantity")) {
			count = (int) inputData.get("quantity");
			if (count < 0 || count > 20) {
				System.out.println("Quantity is less than 0 or greater than 20");
				return Utility.jsonResponse(200, count + " quantity is less than 0 or greater than 20", rowsAffected);

			}
		}

		if (inputData.containsKey("car_type")) {
			inputData.put("car_type", CarType.fromType((String) inputData.get("car_type")));
		}

		ZCar car = ZCar.createCar(inputData);
		car.setShowroomId(showroomId);
		car.setModelId(modelId);

		for (int i = 0; i < count; i++) {
			rowsAffected = Integer.parseInt(carDAO.create(car, null));
		}

		if (rowsAffected > 0) {
			return Utility.jsonResponse(200, count + " cars successfully added", rowsAffected);
		} else {
			return Utility.jsonResponse(400, "car not added", null);
		}
	}

	public Map<String, Object> delete(Map<String, String> parts) throws Exception {

		System.out.println("---------- Deleting Car ----------");

		int showroomId = 0, modelId = 0, companyId = 0, carId = 0;

		if (parts.containsKey("companies")) {
			companyId = Integer.parseInt(parts.get("companies"));
		}
		if (parts.containsKey("showrooms")) {
			showroomId = Integer.parseInt(parts.get("showrooms"));
		}
		if (parts.containsKey("models")) {
			modelId = Integer.parseInt(parts.get("models"));
		}
		if (parts.containsKey("cars")) {
			carId = Integer.parseInt(parts.get("cars"));
		}

		ZCar car = new ZCar();
		car.setAvailable(false);

		whereColumns = List.of(TableMapping.getColumnByField(TableMapping.CAR, "showroomId"),
				TableMapping.getColumnByField(TableMapping.CAR, "carId"),
				TableMapping.getColumnByField(TableMapping.CAR, "modelId"));

		whereOperators = List.of(Utility.EQUAL, Utility.EQUAL, Utility.EQUAL);
		whereValues = List.of(showroomId, carId, modelId);
		logicalOperators = List.of(Utility.AND, Utility.AND);

		int updatedRows = carDAO.deactivate(car, whereColumns, whereOperators, whereValues, logicalOperators, null);

		if (updatedRows > 0) {
			System.out.println("Car deactivated successfully");
			return Utility.jsonResponse(200, "Car deleted successfully", null);
		} else {
			System.out.println("Car not found");
			return Utility.jsonResponse(404, "car not found", null);
		}
	}

	public Map<String, Object> put(Map<String, Object> inputData, Map<String, String> parts)
			throws IOException, IllegalAccessException, NullPointerException, SQLException {

		int showroomId = 0, modelId = 0, companyId = 0, carId = 0;

		if (parts.containsKey("companies")) {
			companyId = Integer.parseInt(parts.get("companies"));
		}
		if (parts.containsKey("showrooms")) {
			showroomId = Integer.parseInt(parts.get("showrooms"));
		}
		if (parts.containsKey("models")) {
			modelId = Integer.parseInt(parts.get("models"));
		}
		if (parts.containsKey("cars")) {
			carId = Integer.parseInt(parts.get("cars"));
		}
		ZCar car = ZCar.createCar(inputData);

		whereColumns = List.of(TableMapping.getColumnByField(TableMapping.CAR, "showroomId"),
				TableMapping.getColumnByField(TableMapping.CAR, "carId"),
				TableMapping.getColumnByField(TableMapping.CAR, "modelId"));

		whereOperators = List.of(Utility.EQUAL, Utility.EQUAL, Utility.EQUAL);
		whereValues = List.of(showroomId, carId, modelId);
		logicalOperators = List.of(Utility.AND, Utility.AND);

		int rowsAffected = carDAO.update(car, whereColumns, whereOperators, whereValues, logicalOperators);
		if (rowsAffected > 0) {
			return Utility.jsonResponse(200, "car updated successfully", null);
		} else {
			return Utility.jsonResponse(404, "car not found", null);
		}
	}

	public Map<String, Object> viewUserCars(int userId) throws SQLException, IOException {

		List<String> columns = List.of("ZModel.model_id","ZShowroom.company_id","ZShowroom.showroom_id","ZCarBooking.car_id","ZCarBooking.completed_at","color","status", "ZCarBooking.price AS model_price", "ZModel.name AS model_name", "ZShowroom.name As showroom_name","ZCompany.company_name ");

		whereColumns = List.of(TableMapping.getColumnByField(TableMapping.CARBOOKING, "customerId"),
				TableMapping.getColumnByField(TableMapping.CARBOOKING, "status"),
				TableMapping.getColumnByField(TableMapping.CARBOOKING, "bookingType"));
		whereOperators = List.of(Utility.EQUAL, Utility.EQUAL, Utility.EQUAL);
		whereValues = List.of(userId, Status.fromType("delivered"), BookingType.fromType("delivery"));
		List<String> logicalOperators = List.of(Utility.AND, Utility.AND, Utility.AND);

		List<String> joinTypes = List.of("", "", "","");
		List<String> joinConditions = List.of("ZCar.car_id=ZCarBooking.car_id",
				"ZShowroom.showroom_id=ZCar.showroom_id", "ZModel.model_id=ZCar.model_id",
				"ZCompany.brand_code=ZShowroom.company_id");
		List<String> joinTables = List.of(TableMapping.CAR.getTableName(), TableMapping.SHOWROOM.getTableName(),
				TableMapping.MODEL.getTableName(), TableMapping.COMPANY.getTableName());

		List<Map<String, Object>> result = carDAO.fetchRecords(TableMapping.CARBOOKING.getTableName(), null, columns,
				joinTables, joinConditions, joinTypes, whereColumns, whereOperators, whereValues, logicalOperators,
				null, null, null, false, null);

		if (!result.isEmpty()) {

			for (int i = 0; i < result.size(); i++) {
				int status = (int) result.get(i).get("status");
				long completedAt=(long) result.get(i).get("completed_at");
				Date date = new Date(completedAt);
				
				result.get(i).put("completed_at",date );
				result.get(i).put("status", Status.fromValue(status));
			}

			return Utility.jsonResponse(200, "success", result);
		} else {
			System.out.println("---------- No cars found ----------");
			return Utility.jsonResponse(204, "no car found", null);
		}
	}

}
