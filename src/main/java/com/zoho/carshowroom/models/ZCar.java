package com.zoho.carshowroom.models;

import java.util.Map;

import com.zoho.carshowroom.util.Utility;

public class ZCar {
	private Integer carId;// primary key
	private Integer modelId;
	private Integer showroomId;
	private String color;
	private Boolean isAvailable;
	private Short carType;

	public Integer getId() {
		return carId;
	}

	public Integer getModelId() {
		return modelId;
	}

	public void setModelId(Integer modelId) {
		Utility.checkNull(modelId);
		this.modelId = modelId;
	}

	public Integer getShowroomId() {
		return showroomId;
	}

	public void setShowroomId(Integer showroomId) {
		Utility.checkNull(showroomId);
		this.showroomId = showroomId;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		Utility.checkNull(color);
		this.color = color;
	}

	public boolean isAvailable() {
		return isAvailable;
	}

	public void setAvailable(boolean isAvailable) {
		Utility.checkNull(isAvailable);
		this.isAvailable = isAvailable;
	}

	public Short getCarType() {
		return carType;
	}

	public void setCarType(Short carType) {
		Utility.checkNull(carType);
		this.carType = carType;
	}

	public static ZCar createCar(Map<String, Object> carData) {
		ZCar car = new ZCar();

		for (String key : carData.keySet()) {
			Object value = carData.get(key);
			Utility.checkNull(value);

			switch (key) {
			case "model_id":
				Integer modelId = (Integer) value;
				Utility.boundaryCheck(modelId);
				car.setModelId(modelId);
				break;

			case "showroom_id":
				Integer showroomId = (Integer) value;
				Utility.boundaryCheck(showroomId);
				car.setShowroomId(showroomId);
				break;

			case "color":
				String color = value.toString().trim();
				if (color.length() < 3 || color.length() > 20) {
					throw new IllegalArgumentException("Color must be between 3 and 20 characters");
				}
				car.setColor(color);
				break;

			case "is_available":
				Boolean isAvailable = (Boolean) value;
				car.setAvailable(isAvailable);
				break;

			case "car_type":
				Short carType = ((Integer) value).shortValue();
				if (carType != 0 && carType != 1) {
					throw new IllegalArgumentException("Car type must be either 'delivery' or 'testing'");
				}
				car.setCarType(carType);
				break;

			}
		}

		return car;
	}

}
