package com.zoho.carshowroom.models;

import java.util.Map;

import com.zoho.carshowroom.util.Utility;

public class ZAddress {
	private Integer addressId;
	private String doorNo;// Primary key
	private String street;
	private String city;
	private Integer postalCode;

	public ZAddress(String street, String city, Integer postalCode) {
		setStreet(street);
		setCity(city);
		setPostalCode(postalCode);
	}

	public ZAddress() {
		// Default constructor
	}

	public void setAddressId(Integer addressId) {
		this.addressId = addressId;
	}

	public Integer getAddressId() {
		return addressId;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {

		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Integer getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(Integer postalCode) {
		this.postalCode = postalCode;
	}

	public String getDoorNo() {
		return doorNo;
	}

	public void setDoorNo(String doorNo) {
		this.doorNo = doorNo;
	}

	public static ZAddress addressCreator(Map<String, Object> addressData) {
		ZAddress address = new ZAddress();

		for (String key : addressData.keySet()) {
			String value = addressData.get(key).toString();
			Utility.checkNull(value);

			switch (key) {
			case "address_id":
				Integer addressId = Integer.parseInt(value);
				Utility.boundaryCheck(addressId);
				address.setAddressId(addressId);
				break;

			case "door_no":
				String doorNo = value;
				address.setDoorNo(doorNo);
				break;

			case "street":
				String street = value;
				address.setStreet(street);
				break;

			case "city":
				String city = value;
				address.setCity(city);
				break;

			case "postal_code":
				Integer postalCode = Integer.parseInt(value);
				Utility.boundaryCheck(postalCode);
				address.setPostalCode(postalCode);
				break;

			}
		}

		return address;
	}

}
