package com.zoho.carshowroom.enums;

public enum CarType {
	
	DELIVERY(0, "delivery"),
	TESTING(1, "testing");

	private final short value;
	private String type;

	CarType(int value, String type) {
		this.value = (short) value;
		this.type = type;
	}

	public int getValue() {
		return value;
	}

	public String getCarType() {
		return type;
	}

	public static int fromType(String type) {
		for (CarType value : CarType.values()) {
			if (value.type.equals(type)) {
				return value.value;
			}
		}
		throw new IllegalArgumentException("Invalid CarType for value: " + type);
	}
}
