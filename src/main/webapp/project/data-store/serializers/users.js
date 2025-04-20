store.registerSerializer("users", {
	serializeKey: function (modelName, type, customData, queryParams) {
		return "";
	},
	serialize: function (type, payLoad, records, customData, modelName, queryParams, gql) {
		if(type==='deleteRecord'){
			payLoad={};
		}
		let address = payLoad.address;
		if (!address) {
			return payLoad;
		}

		payLoad = {
			email: payLoad.email,
			password: payLoad.password,
			name: payLoad.userName,
			phone_no: payLoad.phoneNo,
			door_no: address.doorNo,
			street: address.street,
			city: address.city,
			postal_code: address.postalCode
		};
		return payLoad;
	},
	normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData, opts) {
		
		
		payLoad=payLoad.data||[];
		let array = payLoad.map(item => ({
			userId: item.user_id,
			userName: item.name,
			role: item.role,
			email: item.email,
			password: item.password,
			address: {
				id: item.address_id
			}
		}));
		let response = {
			users: array[0]
		}
		return response;
	}
});
