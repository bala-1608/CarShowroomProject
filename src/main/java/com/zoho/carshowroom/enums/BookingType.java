package com.zoho.carshowroom.enums;

public enum BookingType {
	
	//constants or predefined values
	DELIVERY(0, "delivery"), 
	TESTING(1, "testing"), 
	SERVICE(2, "service");

	private final int value;
	private final String type;

	BookingType(int value, String type) {
		this.value = value;
		this.type = type;
	}

	public int getValue() {
		return value;
	}

	public String getType() {
		return type;
	}

	public static String fromValue(int value) {
		for (BookingType type : BookingType.values()) {
			if (type.value == value) {
				return type.type;
			}
		}
		throw new IllegalArgumentException("Invalid value for BookingType: " + value);
	}

	public static int fromType(String type) {
		for (BookingType value : BookingType.values()) {
			if (value.type.equals(type)) {
				return value.value;
			}
		}
		throw new IllegalArgumentException("Invalid value for BookingType: " + type);
	}
}
