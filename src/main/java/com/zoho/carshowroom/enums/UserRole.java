package com.zoho.carshowroom.enums;

public enum UserRole {
	
	CUSTOMER(0, "customer"),
	ADMIN(2, "admin"),
	MANAGER(1, "manager"),
	APP_ADMIN(3, "app admin");

	private final int value;
	private String role;

	UserRole(int value, String role) {
		this.value = value;
		this.role = role;
	}

	public int getValue() {
		return value;
	}

	public String getRole() {
		return role;
	}

	public static String fromValue(int value) {
		for (UserRole role : UserRole.values()) {
			if (role.value == value) {
				return role.role;
			}
		}
		throw new IllegalArgumentException("Invalid value for UserRole: " + value);
	}
}
