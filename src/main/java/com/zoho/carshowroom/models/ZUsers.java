package com.zoho.carshowroom.models;

import java.sql.Timestamp;

public class ZUsers {

	private Integer userId;
	private String name;
	private String email;
	private String password;
	private String phoneNo;
	private Short role;
	private Integer addressId;
	private Timestamp createdAt;

	public ZUsers() {
	}

	public ZUsers(String name, String email, String password, String phoneNo, Short role, Integer addressId) {
		setName(name);
		setEmail(email);
		setPassword(password);
		setPhoneNo(phoneNo);
		setRole(role);
		setAddressId(addressId);
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setEmail(String email) {
		System.out.println(" in Pojo Email: " + email);
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPassword() {
		return password;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setRole(Short role) {
		this.role = role;
	}

	public Short getRole() {
		return role;
	}

	public void setAddressId(Integer addressId) {
		this.addressId = addressId;
	}

	public Integer getAddressId() {
		return addressId;
	}

	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}

	public Timestamp getCreatedAt() {
		return createdAt;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

}
