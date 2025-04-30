store.registerSerializer("bookings", {
    serializeKey: function (modelName, type, customData, queryParams) {
        return "";
    },
    serialize: function (type, payLoad, records, customData, modelName, queryParams, gql) {
        if(type==='createRecord'){
            // payLoad.booking_type = payLoad.bookingType;
            // delete payLoad.bookingType;
        }
		
        return payLoad;
    },
    normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData, opts) {
        if (status == 204) {
			return {
				bookings: []
			}
		};
		payLoad = payLoad.data || [];
		payLoad = payLoad.map(item => ({
			bookingId: item.booking_id,
			price: item.price,
			status: item.status,
			bookingType: item.booking_type,

			showroom: {

				id: item.showroom_id,
				name: item.showroom_name,
				company: {
					id: item.company_id,
					companyName: item.company_name
				}
			},
			model: {
				id: item.model_id,
				modelName: item.model_name,
				color: item.color,
				price: item.price

			},
			user:{
				userId:item.customer_id,
				userName:item.name

			},
			requestDate: item.request_date
		}));

		if (type === 'createRecord') {
			return {
				bookings: payLoad[0],
				status: status
			}
		}
		return {
			bookings: payLoad
		}
	}
});
