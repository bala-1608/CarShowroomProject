package com.zoho.carshowroom.models;

import java.util.Map;

import com.zoho.carshowroom.util.Utility;

public class ZModel {
	private Integer modelId;// primary key
	private Integer companyId;
	private String name;
	private Integer modelPrice;
	private Integer servicePrice;

	private Boolean isActive;

	public int getModelId() {
		return modelId;
	}

	public Integer getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Integer companyId) {
		Utility.checkNull(companyId);
		this.companyId = companyId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		Utility.checkNull(name);
		this.name = name;
	}

	public Integer getModelPrice() {
		return modelPrice;
	}

	public void setModelPrice(Integer modelPrice) {
		Utility.checkNull(modelPrice);
		this.modelPrice = modelPrice;
	}

	public Integer getServicePrice() {
		return servicePrice;
	}

	public void setServicePrice(Integer servicePrice) {
		Utility.checkNull(servicePrice);
		this.servicePrice = servicePrice;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		Utility.checkNull(isActive);
		this.isActive = isActive;
	}

	public static ZModel modelCreator(Map<String, Object> modelData) {
		ZModel model = new ZModel();

		for (String key : modelData.keySet()) {
			Object value = modelData.get(key);
			Utility.checkNull(value);

			switch (key) {
			case "company_id":
				Integer companyId = (Integer) value;
				Utility.boundaryCheck(companyId);
				model.setCompanyId(companyId);
				break;

			case "name":
				String name = value.toString();
				if (name.length() < 2 || name.length() > 20) {
					throw new IllegalArgumentException("Model name must be between 2 and 20 characters");
				}
				model.setName(name);
				break;

			case "model_price":
				Integer modelPrice = (Integer) value;
				Utility.boundaryCheck(modelPrice);
				model.setModelPrice(modelPrice);
				break;

			case "service_price":
				Integer servicePrice = (Integer) value;
				Utility.boundaryCheck(servicePrice);
				model.setServicePrice(servicePrice);
				break;

			case "is_active":
				Boolean isActive = (Boolean) value;
				model.setActive(isActive);
				break;

			}
		}

		return model;
	}

}
