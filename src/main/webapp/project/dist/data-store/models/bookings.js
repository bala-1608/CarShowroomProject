store.registerModel("bookings",{

    bookingId:Lyte.attr('string',{primaryKey : true}),
    bookingType:Lyte.attr('string'),
    status:Lyte.attr('string'),
    price:Lyte.attr('number'),
    requestDate:Lyte.attr('string'),
    showroom:Lyte.belongsTo('showrooms'),
    model:Lyte.belongsTo('cars'),
    
});

store.registerAdapter("bookings", {

  buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
    let basePath = 'http://localhost:8080/CarShowroom/api/v1';
    if (type === 'createRecord') {

      let companyId = customData.companyId;
      let showroomId = customData.showroomId;
      let modelId = customData.modelId;
      
      basePath = basePath+`/companies/${companyId}/showrooms/${showroomId}/models/${modelId}/bookings`;

    }

    else if (type === 'findAll') {
      let userId = store.peekAll('users')[0].userId;
      basePath =  basePath+`/users/${userId}/bookings`
    }

    return basePath;
  },

  headersForRequest: function () {
    return {
      "Content-Type": "application/json"
    };
  },

  parseResponse: function (type, modelName, xhrObj, payLoad) {
    if (xhrObj.status === 401) {
      Lyte.Router.transitionTo('login');
    }
    payLoad.status = xhrObj.status;
    return payLoad;
  }
});


store.registerSerializer("bookings", {
    serializeKey: function (modelName, type, customData, queryParams) {
        return "";
    },
    serialize: function (type, payLoad, records, customData, modelName, queryParams, gql) {
        if(type==='createRecord'){
            payLoad.booking_type = payLoad.bookingType;
            delete payLoad.bookingType;
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
