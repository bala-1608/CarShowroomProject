package com.zoho.carshowroom.models;

import java.util.Map;

import com.zoho.carshowroom.util.Utility;

public class ZRating {
	private Short ratingId;// primary key
	private Integer customerId;
	private Integer showroomId;
	private Integer rating;

	public Short getRatingId() {
		return ratingId;
	}

	public Integer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Integer customerId) {
		Utility.checkNull(customerId);
		this.customerId = customerId;
	}

	public Integer getShowroomId() {
		return showroomId;
	}

	public void setShowroomId(Integer showroomId) {
		Utility.checkNull(showroomId);
		this.showroomId = showroomId;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		Utility.checkNull(rating);
		this.rating = rating;
	}

	public static ZRating ratingCreator(Map<String, Object> ratingData) {
		ZRating rating = new ZRating();

		for (String key : ratingData.keySet()) {
			Object value = ratingData.get(key);
			Utility.checkNull(value);

			switch (key) {
			case "customer_id":
				Integer customerId = (Integer) value;
				Utility.boundaryCheck(customerId);
				rating.setCustomerId(customerId);
				break;

			case "showroom_id":
				Integer showroomId = (Integer) value;
				Utility.boundaryCheck(showroomId);
				rating.setShowroomId(showroomId);
				break;

			case "rating":
				Integer ratingValue = (Integer) value;
				if (ratingValue < 1 || ratingValue > 5) {
					throw new IllegalArgumentException("Invalid rating (Expected: 1 to 5)");
				}
				rating.setRating(ratingValue);
				break;
			}
		}
		return rating;
	}

}
