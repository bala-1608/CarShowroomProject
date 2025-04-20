package com.zoho.carshowroom.engines;

import com.zoho.carshowroom.context.SessionContext;
import com.zoho.carshowroom.dao.DataAccessObject;
import com.zoho.carshowroom.enums.BookingType;
import com.zoho.carshowroom.enums.Status;
import com.zoho.carshowroom.enums.TableMapping;
import com.zoho.carshowroom.util.Utility;
import com.zoho.carshowroom.models.ZCar;
import com.zoho.carshowroom.models.ZCarBooking;

import java.io.IOException;
import java.sql.Date;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class BookingsEngine extends Engine {

	private final DataAccessObject bookingDAO;
	private List<String> whereColumns;
	private List<String> whereOperators;
	private List<Object> whereValues;
	private List<String> columns;
	private List<String> logicalOperators;
	private List<Map<String, Object>> result;
	private List<String> joinConditions;
	private List<String> joinTables;
	private List<String> joinTypes;
	private final long threeMonth = 90L * 24 * 60 * 60 * 1000;

	public BookingsEngine() {
		this.bookingDAO = new DataAccessObject();
	}

	public Map<String, Object> get(Integer companyId,Integer showroomId,Integer userId)
			throws IOException, SQLException {
		Map<String, Object> data;
		

		if (!Utility.isNull(userId)) {
			
			data = viewUserBookings(userId);
			return data;
		} 
		else if (!Utility.isNull(companyId)&&!Utility.isNull(showroomId)) {

			data = managerViewBookings(showroomId, companyId);
			return data;
			
		} else {
			return Utility.jsonResponse(404, "endpoint not found", null);
		}

	}

	public Map<String, Object> put(Map<String, Object> inputData, Map<String, String> parts)
			throws IOException, SQLException, IllegalAccessException, NullPointerException, ParseException {
		System.out.println("---------- Updating Booking ----------");

		int bookingId = 0;
//		if (parts.containsKey("companies")) {
//			companyId = Integer.parseInt(parts.get("companies"));
//		}
//		if (parts.containsKey("showrooms")) {
//			showroomId = Integer.parseInt(parts.get("showrooms"));
//		}
		if (parts.containsKey("bookings")) {
			bookingId = Integer.parseInt(parts.get("bookings"));
		}
		System.out.println(inputData.get("booking_type"));
		if (inputData.containsKey("booking_type")) {

			inputData.put("booking_type", BookingType.fromType((String) inputData.get("booking_type")));
		}
		ZCarBooking carBooking = ZCarBooking.carBookingCreator(inputData);

		whereColumns = List.of(TableMapping.getColumnByField(TableMapping.CARBOOKING, "bookingId"));
		whereOperators = List.of(Utility.EQUAL);
		whereValues = List.of(bookingId);
		logicalOperators = List.of(Utility.AND);

		int updatedRows = 0;

		updatedRows = bookingDAO.update(carBooking, whereColumns, whereOperators, whereValues, logicalOperators);

		if (updatedRows > 0) {

			System.out.println("----------Bookings updated  ----------");
			if (carBooking.getBookingType() == 1 && !Utility.isNull(carBooking.getCompletedAt())) {
				updateAvailableStatus(carBooking.getCarId(), BookingType.fromValue(carBooking.getBookingType()), true,bookingId+"");
			}
			return Utility.jsonResponse(200, "bookings updated", null);

		} else {

			System.out.println("---------- Booking not found or update failed ----------");
			return Utility.jsonResponse(404, "booking not found or update failed", null);

		}
	}

	public Map<String, Object> delete(Map<String, String> parts)
			throws IOException, SQLException, NullPointerException, IllegalAccessException {
		System.out.println("---------- Deleting Booking ----------");

		int userId = 0, bookingId = 0;
		if (parts.containsKey("bookings") && parts.containsKey("companies")) {

			bookingId = Integer.parseInt(parts.get("bookings"));
			whereColumns = List.of(TableMapping.getColumnByField(TableMapping.CARBOOKING, "bookingId"));
			whereOperators = List.of(Utility.EQUAL);
			whereValues = List.of(bookingId);

		} else if (parts.containsKey("bookings") && parts.containsKey("users")) {

			bookingId = Integer.parseInt(parts.get("bookings"));
			userId = Integer.parseInt(parts.get("users"));
			whereColumns = List.of(TableMapping.getColumnByField(TableMapping.CARBOOKING, "customerId"),
					TableMapping.getColumnByField(TableMapping.CARBOOKING, "bookingId"));
			whereOperators = List.of(Utility.EQUAL, Utility.EQUAL);
			whereValues = List.of(userId, bookingId);
		}

		logicalOperators = List.of(Utility.AND);

		int updatedRows = bookingDAO.delete(TableMapping.CARBOOKING.getTableName(), whereColumns, whereOperators,
				whereValues, logicalOperators, null);
		if (updatedRows > 0) {
			System.out.println("---------- Booking deleted successfully ----------");
			return Utility.jsonResponse(200, "booking deleted successfully ", null);
		} else {
			System.out.println("---------- Booking not found or deletion failed ----------");
			return Utility.jsonResponse(404, "booking not found or deletion failed ", null);
		}
	}

	public Map<String, Object> managerViewBookings(int showroomId, int companyId) throws SQLException, IOException {

		StringBuilder str = new StringBuilder();
		whereColumns = new ArrayList<>();
		joinConditions = new ArrayList<>();

		str.append(TableMapping.CARBOOKING.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CARBOOKING, "carId"));

		columns = List.of("ZModel.name AS Model_name", "ZUsers.name", "booking_type", "ZCarBooking.price",
				"ZCarBooking.status", "ZCarBooking.booking_id");

		str.setLength(0);
		str.append(TableMapping.CAR.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.SHOWROOM, "showroomId"));

		whereColumns.add(str.toString());
		whereColumns.add("ZCarBooking." + TableMapping.getColumnByField(TableMapping.CARBOOKING, "status"));

		str.setLength(0);
		str.append(TableMapping.SHOWROOM.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.SHOWROOM, "companyId"));
		whereColumns.add(str.toString());
//		whereColumns = List.of(str.toString(), TableMapping.getColumnByField(TableMapping.CARBOOKING, "status")),;

		whereOperators = List.of(Utility.EQUAL, Utility.EQUAL, Utility.EQUAL);
		whereValues = List.of(showroomId, 0, companyId);

		logicalOperators = List.of(Utility.AND, Utility.AND);

		joinTypes = List.of("", "", "", "");
		str.setLength(0);

		str.append(TableMapping.CAR.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CAR, "carId")).append(Utility.EQUAL)
				.append(TableMapping.CARBOOKING.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CARBOOKING, "carId"));

		joinConditions.add(str.toString());

		str.setLength(0);
		str.append(TableMapping.SHOWROOM.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.SHOWROOM, "showroomId")).append(Utility.EQUAL)
				.append(TableMapping.CAR.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CAR, "showroomId"));

		joinConditions.add(str.toString());
		joinConditions.add("ZCarBooking.customer_id=ZUsers.user_id");
		joinConditions.add("ZCar.model_id=ZModel.model_id");
		joinTables = List.of(TableMapping.CAR.getTableName(), TableMapping.SHOWROOM.getTableName(),
				TableMapping.USER.getTableName(), TableMapping.MODEL.getTableName());

		result = bookingDAO.fetchRecords(TableMapping.CARBOOKING.getTableName(), null, columns, joinTables,
				joinConditions, joinTypes, whereColumns, whereOperators, whereValues, logicalOperators, null, null,
				null, false, null);

		if (!result.isEmpty()) {
			for (int i = 0; i < result.size(); i++) {
				if (result.get(i).containsKey(TableMapping.getColumnByField(TableMapping.CARBOOKING, "status"))) {
					int status = (int) result.get(i)
							.get(TableMapping.getColumnByField(TableMapping.CARBOOKING, "status"));
					result.get(i).put(TableMapping.getColumnByField(TableMapping.CARBOOKING, "status"),
							Status.fromValue(status));
				}
				if (result.get(i).containsKey(TableMapping.getColumnByField(TableMapping.CARBOOKING, "bookingType"))) {
					int type = (int) result.get(i)
							.get(TableMapping.getColumnByField(TableMapping.CARBOOKING, "bookingType"));
					result.get(i).put(TableMapping.getColumnByField(TableMapping.CARBOOKING, "bookingType"),
							BookingType.fromValue(type));
				}
			}

			return Utility.jsonResponse(200, "success", result);
		} else {
			return Utility.jsonResponse(404, "no booking found", null);
		}
	}

	public Map<String, Object> viewUserBookings(int userId) throws SQLException, IOException {

		StringBuilder str = new StringBuilder();
		whereColumns = new ArrayList<>();
		joinConditions = new ArrayList<>();

		str.append(TableMapping.CARBOOKING.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CARBOOKING, "carId"));

		columns = List.of("ZModel.model_id","ZShowroom.showroom_id","ZShowroom.name AS showroom_name","ZShowroom.company_id", "ZCompany.company_name ", "ZModel.name AS Model_name",
				"booking_type", "ZCarBooking.price", "ZCarBooking.status", "ZCarBooking.booking_id","ZCar.color","ZCarBooking.request_date");

		whereColumns = List.of(TableMapping.getColumnByField(TableMapping.CARBOOKING, "customerId"),
				TableMapping.getColumnByField(TableMapping.CARBOOKING, "status"));
		whereOperators = List.of(Utility.EQUAL, Utility.NOT_EQUAL);
		whereValues = List.of(userId, Status.fromType("delivered"));

		logicalOperators = List.of(Utility.AND, Utility.AND);

		joinTypes = List.of("", "", "", "");
		str.setLength(0);

		str.append(TableMapping.CAR.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CAR, "carId")).append(Utility.EQUAL)
				.append(TableMapping.CARBOOKING.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CARBOOKING, "carId"));

		joinConditions.add(str.toString());

		str.setLength(0);
		str.append(TableMapping.SHOWROOM.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.SHOWROOM, "showroomId")).append(Utility.EQUAL)
				.append(TableMapping.CAR.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CAR, "showroomId"));

		joinConditions.add(str.toString());
		joinConditions.add("ZCar.model_id=ZModel.model_id");
		joinConditions.add("ZShowroom.company_id=ZCompany.brand_code");
		joinTables = List.of(TableMapping.CAR.getTableName(), TableMapping.SHOWROOM.getTableName(),
				TableMapping.MODEL.getTableName(), TableMapping.COMPANY.getTableName());

		result = bookingDAO.fetchRecords(TableMapping.CARBOOKING.getTableName(), null, columns, joinTables,
				joinConditions, joinTypes, whereColumns, whereOperators, whereValues, logicalOperators, null, null,
				null, false, null);

		if (!result.isEmpty()) {
			for (int i = 0; i < result.size(); i++) {
				if (result.get(i).containsKey(TableMapping.getColumnByField(TableMapping.CARBOOKING, "status"))) {
					int status = (int) result.get(i)
							.get(TableMapping.getColumnByField(TableMapping.CARBOOKING, "status"));
					result.get(i).put(TableMapping.getColumnByField(TableMapping.CARBOOKING, "status"),
							Status.fromValue(status));
				}
				if (result.get(i).containsKey(TableMapping.getColumnByField(TableMapping.CARBOOKING, "bookingType"))) {
					int type = (int) result.get(i)
							.get(TableMapping.getColumnByField(TableMapping.CARBOOKING, "bookingType"));
					result.get(i).put(TableMapping.getColumnByField(TableMapping.CARBOOKING, "bookingType"),
							BookingType.fromValue(type));
				}
				Date date=new Date((long) result.get(i).get("request_date"));
				result.get(i).put("request_date",date);
			}

			return Utility.jsonResponse(200, "success", result);
		} else {
			return Utility.jsonResponse(204, "no booking found", null);
		}

	}

	public Map<String, Object> post(ZCarBooking booking,Integer companyId,Integer showroomId,Integer modelId,Integer carId,Integer userId) throws Exception {

		
		long current = System.currentTimeMillis();
		System.out.println(current);
		booking.setRequestDate(current);
		if (Utility.isNull(userId)) {

			booking.setCustomerId(SessionContext.get().getUserId());

			joinTypes = List.of("");
			StringBuilder str = new StringBuilder();
			whereColumns = new ArrayList<>();

			str.setLength(0);
			str.append(TableMapping.CAR.getTableName()).append(".")
					.append(TableMapping.getColumnByField(TableMapping.CAR, "showroomId")).append(Utility.EQUAL)
					.append(TableMapping.SHOWROOM.getTableName()).append(".")
					.append(TableMapping.getColumnByField(TableMapping.SHOWROOM, "showroomId"));

			joinConditions = List.of(str.toString());
			joinTables = List.of(TableMapping.SHOWROOM.getTableName());

			columns = List.of(TableMapping.getColumnByField(TableMapping.CAR, "carId"));

			whereColumns.add(TableMapping.getColumnByField(TableMapping.CAR, "carType"));
			whereColumns.add(TableMapping.getColumnByField(TableMapping.CAR, "isAvailable"));
			whereColumns.add(TableMapping.getColumnByField(TableMapping.CAR, "modelId"));

			str.setLength(0);
			str.append(TableMapping.SHOWROOM.getTableName()).append(".")
					.append(TableMapping.getColumnByField(TableMapping.SHOWROOM, "isActive"));
			whereColumns.add(str.toString());

			str.setLength(0);
			str.append(TableMapping.CAR.getTableName()).append(".")
					.append(TableMapping.getColumnByField(TableMapping.SHOWROOM, "showroomId"));
			whereColumns.add(str.toString());

			str.setLength(0);
			str.append(TableMapping.SHOWROOM.getTableName()).append(".")
					.append(TableMapping.getColumnByField(TableMapping.SHOWROOM, "companyId"));
			whereColumns.add(str.toString());

			whereOperators = List.of(Utility.EQUAL, Utility.EQUAL, Utility.EQUAL, Utility.EQUAL, Utility.EQUAL,
					Utility.EQUAL);
			whereValues = List.of(booking.getBookingType(), true, modelId, true, showroomId, companyId);
			logicalOperators = List.of(Utility.AND, Utility.AND, Utility.AND, Utility.AND, Utility.AND);

			result = bookingDAO.fetchRecords(TableMapping.CAR.getTableName(), null, columns, joinTables, joinConditions,
					joinTypes, whereColumns, whereOperators, whereValues, logicalOperators, null, null, null, false,
					null);

			if (result.isEmpty()) {
				return Utility.jsonResponse(204, "car not available", null);
			}

			carId = (int) result.get(0).get(TableMapping.getColumnByField(TableMapping.CARBOOKING, "carId"));
			booking.setCarId(carId);

			return requestBooking(booking);

		} else if (!Utility.isNull(userId)) {
			

			booking.setCustomerId(userId);
			if (!isDeliveredCar(carId, userId)) {
				System.out.println("Car is not yet delivered or invalid car owner");
				return Utility.jsonResponse(404, "car is not yet delivered or invalid car owner", null);
			}

			int price = 0;
			int val = isFreeServiceAllowed(carId, userId);
			if (val == 1) {
				price = 0;
			} else if (val == -1) {
				return Utility.jsonResponse(500, "can't provide service becoz previous service is not yet completed",
						null);
			} else {
				price = getServicePrice(carId);
			}

			booking.setCarId(carId);
			booking.setPrice(price);

			return requestBooking(booking);

		} else {
			System.out.println("Endpoint not found");
			return Utility.jsonResponse(404, "endpoint not found", null);
		}

	}

	private Map<String, Object> requestBooking(ZCarBooking booking) throws Exception {

		String bookingId = bookingDAO.create(booking, null);
		String bookingType = BookingType.fromValue(booking.getBookingType());
		if (bookingId == null) {
			System.out.println(bookingType + ": booking failed");
			return Utility.jsonResponse(400, bookingType + ": booking failed", null);
		}

		int carId = booking.getCarId();
		return updateAvailableStatus(carId, bookingType, false,bookingId);

	}

	private boolean isDeliveredCar(int carId, int customerId) throws SQLException {

		columns = List.of(TableMapping.getColumnByField(TableMapping.CARBOOKING, "status"));
		whereColumns = List.of(TableMapping.getColumnByField(TableMapping.CARBOOKING, "carId"),
				TableMapping.getColumnByField(TableMapping.CARBOOKING, "bookingType"),
				TableMapping.getColumnByField(TableMapping.CARBOOKING, "customerId"));
		whereOperators = List.of(Utility.EQUAL, Utility.EQUAL, Utility.EQUAL);
		whereValues = List.of(carId, BookingType.fromType("delivery"), customerId);
		logicalOperators = List.of(Utility.AND, Utility.AND);

		result = bookingDAO.fetchRecords(TableMapping.CARBOOKING.getTableName(), null, columns, null, null, null,
				whereColumns, whereOperators, whereValues, logicalOperators, null, null, null, false, null);
		if (result.isEmpty()) {
			return false;
		}
		int status = (int) result.get(0).get(TableMapping.getColumnByField(TableMapping.CARBOOKING, "status"));
		return status == 2;
	}

	private Map<String, Object> updateAvailableStatus(int carId, String bookingType, boolean active,String bookingId)
			throws NullPointerException, IllegalAccessException, SQLException, IOException {

		ZCar booking = new ZCar();

		booking.setAvailable(active);
		int rowsAffected = bookingDAO.update(booking, TableMapping.getColumnByField(TableMapping.CARBOOKING, "carId"),
				Utility.EQUAL, carId, null);

		if (rowsAffected > 0) {
			System.out.println(bookingType + " booked successfully");
			
			List<Map<String, Object>> bookingData = new ArrayList<>(List.of(Map.of("booking_id", bookingId)));
			
			return Utility.jsonResponse(200, bookingType + " booked successfully", bookingData);

		} else {
			System.out.println("Problem Occured while changing car available status");
			return Utility.jsonResponse(201, bookingType + " problem occured while changing car available status",
					null);
		}

	}

	private int isFreeServiceAllowed(int carId, int customerId) throws SQLException {

		columns = List.of(TableMapping.getColumnByField(TableMapping.CARBOOKING, "completedAt"));
		whereColumns = List.of(TableMapping.getColumnByField(TableMapping.CARBOOKING, "carId"),
				TableMapping.getColumnByField(TableMapping.CARBOOKING, "bookingType"),
				TableMapping.getColumnByField(TableMapping.CARBOOKING, "price"),
				TableMapping.getColumnByField(TableMapping.CARBOOKING, "customerId"));
		whereOperators = List.of(Utility.EQUAL, Utility.EQUAL, Utility.EQUAL, Utility.EQUAL);
		whereValues = List.of(carId, 2, 0, customerId);
		logicalOperators = List.of(Utility.AND, Utility.AND, Utility.AND);

		List<String> order = List.of(TableMapping.getColumnByField(TableMapping.CARBOOKING, "completedAt"));
		int limit = 1;

		result = bookingDAO.fetchRecords(TableMapping.CARBOOKING.getTableName(), null, columns, null, null, null,
				whereColumns, whereOperators, whereValues, logicalOperators, null, null, order, false, limit);

		if (!result.isEmpty()) {
			if (result.size() < 3) {
				if (Utility.isNull(
						result.get(0).get(TableMapping.getColumnByField(TableMapping.CARBOOKING, "completedAt")))) {
					return -1;
				}
				Long deliveredTime = (long) result.get(0)
						.get(TableMapping.getColumnByField(TableMapping.CARBOOKING, "completedAt"));

				long today = System.currentTimeMillis();
				long monthsSinceLastService = (today - deliveredTime);
				if (monthsSinceLastService < threeMonth) {
					return 0; // Service requested too soon
				}
			}

		}
		return 1;
//		builder.clearAll();
//		builder = builder
//				.selectQuery(TableMapping.CARBOOKING.getTableName(),
//						TableMapping.getColumnByField(TableMapping.CARBOOKING, "completedAt"))
//				.setWhere(TableMapping.getColumnByField(TableMapping.CARBOOKING, "carId"), Utility.EQUAL, carId)
//				.setLogicalWhere(Utility.AND, TableMapping.getColumnByField(TableMapping.CARBOOKING, "bookingType"),
//						Utility.EQUAL, 0)
//				.setOrder(false, TableMapping.getColumnByField(TableMapping.CARBOOKING, "completedAt")).setLimit(1);
//		@SuppressWarnings("unchecked")
//		List<Map<String, Object>> result2 = (List<Map<String, Object>>) executor.executeSQL(builder);
//		Utility.checkNull(result2);
//		long deliveredTime = (long) result2.get(0)
//				.get(TableMapping.getColumnByField(TableMapping.CARBOOKING, "completedAt"));
//		long today = System.currentTimeMillis();
//		long monthsSinceLastService = (today - );
//		if (monthsSinceLastService < threeMonth) {
//			return false; // Service requested too soon
//		}
//		return true;

	}

	private int getServicePrice(int carId) throws SQLException {

		joinTypes = List.of("", "");
		StringBuilder str = new StringBuilder();

		columns = List.of(TableMapping.getColumnByField(TableMapping.MODEL, "servicePrice"));
		str.setLength(0);
		str.append(TableMapping.MODEL.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.MODEL, "modelId")).append(Utility.EQUAL)
				.append(TableMapping.CAR.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CAR, "modelId"));
		joinConditions = List.of(str.toString());

		joinTables = List.of(TableMapping.CAR.getTableName());

		str.setLength(0);
		str.append(TableMapping.CAR.getTableName()).append(".")
				.append(TableMapping.getColumnByField(TableMapping.CAR, "carId"));
		whereColumns = List.of(str.toString());
		whereOperators = List.of(Utility.EQUAL);
		whereValues = List.of(carId);

		result = bookingDAO.fetchRecords(TableMapping.MODEL.getTableName(), null, columns, joinTables, joinConditions,
				joinTypes, whereColumns, whereOperators, whereValues, null, null, null, null, false, null);
		if (result.isEmpty()) {
			return -1;
		}
		return (int) result.get(0).get(TableMapping.getColumnByField(TableMapping.MODEL, "servicePrice"));

	}
}
