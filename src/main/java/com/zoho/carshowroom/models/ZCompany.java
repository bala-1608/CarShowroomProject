package com.zoho.carshowroom.models;

import java.text.ParseException;
import java.util.Date;
import java.util.Map;

import com.zoho.carshowroom.util.Utility;

public class ZCompany {

	private Integer brandCode;// primary key
	private String companyName;
	private Long startedYear;
	private Integer adminId;
	private Boolean isActive;

	public boolean isActive() {
		return isActive;
	}
	
	public Boolean getActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		Utility.checkNull(isActive);
		this.isActive = isActive;
	}

	public Integer getAdminId() {
		return adminId;
	}

	public void setAdminId(Integer adminId) {
		Utility.checkNull(adminId);
		this.adminId = adminId;
	}

	public Long getStartedYear() {
		return startedYear;
	}

	public void setStartedYear(Date startedYear) {
		Utility.checkNull(startedYear);
		long millis = startedYear.getTime();
		this.startedYear = millis;
	}

	public String getName() {
		return companyName;
	}

	public void setName(String name) {
		Utility.checkNull(name);
		this.companyName = name;
	}

	public Integer getBrandCode() {
		return brandCode;
	}

	public void setBrandCode(int brandCode) {
		Utility.checkNull(brandCode);
		this.brandCode = brandCode;
	}

	public static ZCompany companyCreator(Map<String, Object> companyData) throws ParseException {
		ZCompany company = new ZCompany();

		for (String key : companyData.keySet()) {
			String value = companyData.get(key).toString();
			Utility.checkNull(value);

			switch (key) {
			case "brand_code":
				Integer brandCode = Integer.parseInt(value);
				Utility.boundaryCheck(brandCode);
				company.setBrandCode(brandCode);
				break;

			case "company_name":
				String companyName = value;
				company.setName(companyName);
				break;

			case "started_year":
				Date date = Utility.convertStringToDate(value.toString());
				Utility.checkValidDate(date);
				company.setStartedYear(date);
				break;

			case "admin_id":
				Integer adminId = Integer.parseInt(value);
				Utility.boundaryCheck(adminId);
				company.setAdminId(adminId);
				break;

			case "is_active":
				Boolean isActive = Boolean.parseBoolean(value);
				company.setActive(isActive);
				break;
			}
		}
		return company;
	}

}
