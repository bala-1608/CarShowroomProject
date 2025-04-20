package com.zoho.carshowroom.models;

import java.util.Map;

import com.zoho.carshowroom.util.Utility;

public class ZShowroom {
	private Integer showroomId;// primary key
	private Integer addressId;
	private String name;
	private Short rating;
	private Integer companyId;
	private Integer managerId;
	private Boolean isActive;

	public boolean isActive() {
		return isActive;
	}

	private void setShowroomId(Integer showroomId) {
		this.showroomId = showroomId;
	}

	public void setActive(boolean isActive) {
		Utility.checkNull(isActive);
		this.isActive = isActive;
	}

	public Integer getManagerId() {
		return managerId;
	}

	public void setManagerId(Integer managerId) {
		Utility.checkNull(managerId);
		this.managerId = managerId;
	}

	public Integer getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Integer companyId) {
		Utility.checkNull(companyId);
		this.companyId = companyId;
	}

	public Short getRating() {
		return rating;
	}

	public void setRating(Short rating) {
		Utility.checkNull(rating);
		this.rating = rating;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		Utility.checkNull(name);
		this.name = name;
	}

	public Integer getAddressId() {
		return addressId;
	}

	public void setAddressId(Integer addressId) {
		Utility.checkNull(addressId);
		this.addressId = addressId;
	}

	public Integer getShowroomId() {
		return showroomId;
	}

	public static ZShowroom showroomCreator(Map<String, Object> showroomData) {
		ZShowroom showroom = new ZShowroom();

		for (String key : showroomData.keySet()) {
			Object value = showroomData.get(key);
			Utility.checkNull(value);

			switch (key) {
			case "showroom_id":
				Integer showroomId = (Integer) value;
				Utility.boundaryCheck(showroomId);
				showroom.setShowroomId(showroomId);
				break;

			case "address_id":
				Integer addressId = (Integer) value;
				Utility.boundaryCheck(addressId);
				showroom.setAddressId(addressId);
				break;

			case "name":
				String name = (String) value;
				showroom.setName(name);
				break;

			case "rating":
				Short rating = ((Integer) value).shortValue();
				if (rating < 0 || rating > 5) {
					throw new IllegalArgumentException("Invalid rating (Expected: 0 to 5)");
				} else {
					showroom.setRating(rating);
				}
				break;

			case "company_id":
				Integer companyId = (Integer) value;
				Utility.boundaryCheck(companyId);
				showroom.setCompanyId(companyId);
				break;

			case "manager_id":
				Integer managerId = (Integer) value;
				Utility.boundaryCheck(managerId);
				showroom.setManagerId(managerId);
				break;

			case "is_active":
				Boolean isActive = (Boolean) value;
				showroom.setActive(isActive);
				break;
			}
		}
		return showroom;
	}

}
