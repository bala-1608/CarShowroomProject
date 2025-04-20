package com.zoho.carshowroom.models;

import java.text.ParseException;
import java.util.Date;
import java.util.Map;
import com.zoho.carshowroom.util.Utility;

public class ZCarBooking {

	public ZCarBooking() {
	}

	public ZCarBooking(Integer carId, Integer customerId, Short bookingType, Short status, Long requestDate,
			Integer price) {
		Utility.checkNull(bookingType);
		Utility.checkNull(status);
		Utility.checkNull(carId);
		Utility.checkNull(requestDate);
		Utility.checkNull(price);
		this.carId = carId;
		this.customerId = customerId;
		this.bookingType = bookingType;
		this.status = status;
		this.requestDate = requestDate;
		this.price = price;
	}

	private Integer bookingId;
	private Integer carId;
	private Integer customerId;
	private Short bookingType;
	private Short status;
	private Long requestDate;
	private Integer price;
	private Long completedAt;

	// Getters and Setters
	public Integer getBookingId() {
		return bookingId;
	}

	public void setBookingId(int bookingId) {
		this.bookingId = bookingId;
	}

	public Integer getCarId() {
		return carId;
	}

	public void setCarId(Integer carId) {
		Utility.checkNull(carId);
		this.carId = carId;
	}

	public Integer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Integer customerId) {
		Utility.checkNull(customerId);
		this.customerId = customerId;
	}

	public Short getBookingType() {
		return bookingType;
	}

	public void setBookingType(Short bookingType) {
		Utility.checkNull(bookingType);
		this.bookingType = bookingType;
	}

	public Short getStatus() {
		return status;
	}

	public void setStatus(Short status) {
		Utility.checkNull(status);
		this.status = status;
	}

	public long getRequestDate() {
		return requestDate;
	}

	public void setRequestDate(Long requestDate) {
		this.requestDate = requestDate;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		Utility.checkNull(price);
		this.price = price;
	}

	public long getCompletedAt() {
		return completedAt;
	}

	public void setCompletedAt(Date completedAt) {
		Utility.checkNull(completedAt);
		long millis = completedAt.getTime();
		this.completedAt = millis;
	}

	public static ZCarBooking carBookingCreator(Map<String, Object> bookingData) throws ParseException {
		ZCarBooking booking = new ZCarBooking();

		for (String key : bookingData.keySet()) {
			String value = bookingData.get(key).toString();
			Utility.checkNull(value);

			switch (key) {
			case "car_id":
				Integer carId = Integer.parseInt(value);
				Utility.boundaryCheck(carId);
				booking.setCarId(carId);
				break;

			case "customer_id":
				Integer customerId = Integer.parseInt(value);
				Utility.boundaryCheck(customerId);
				booking.setCustomerId(customerId);
				break;

			case "booking_type":
				Short bookingType = Short.parseShort(value);
				if (bookingType < 0 || bookingType > 2) {
					throw new IllegalArgumentException("Invalid booking type (Expected: 0, 1, or 2)");
				} else {
					booking.setBookingType(bookingType);
				}
				break;

			case "status":
				Short status = Short.parseShort(value);
				if (status < 0 || status > 3) {
					throw new IllegalArgumentException("Invalid status (Expected: 0 to 3)");
				} else {
					booking.setStatus(status);
				}
				break;

			case "request_date":
				Date date = Utility.convertStringToDate(value.toString());
				Utility.checkValidDate(date);
				booking.setRequestDate(date.getTime());
				break;

			case "price":
				Integer price = Integer.parseInt(value);
				Utility.boundaryCheck(price);
				booking.setPrice(price);
				break;

			case "completed_at":
				Date date1 = Utility.convertStringToDate(value.toString());
				Utility.checkValidDate(date1);
				booking.setCompletedAt(date1);
				break;

			}
		}
		return booking;
	}

}
