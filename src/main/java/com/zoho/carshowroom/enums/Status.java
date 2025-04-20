package com.zoho.carshowroom.enums;

public enum Status {
	
	
	REQUESTED(0, "requested"),
	APPROVED(1, "approved"),
	DELIVERED(2,"delivered"),
	COMPLETED(2, "completed");

	private final int value;
	private final String description;

	Status(int value, String description) {
		this.value = value;
		this.description = description;
	}

	public int getValue() {
		return value;
	}

	public String getDescription() {
		return description;
	}

	public static String fromValue(int value) {
		for (Status status : Status.values()) {
			if (status.value == value) {
				return status.description;
			}
		}
		throw new IllegalArgumentException("Invalid value for Status: " + value);
	}

	public static int fromType(String type) {
		for (Status value : Status.values()) {
			if (value.description == type) {
				return value.value;
			}
		}
		throw new IllegalArgumentException("Invalid value for BookingType: " + type);
	}
}
