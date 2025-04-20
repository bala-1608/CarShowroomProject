store.registerSerializer("cars",{
	serializeKey: function (modelName, type, customData, queryParams) {
        return "";
    },
    serialize: function (type, payLoad, records, customData, modelName, queryParams, gql) {
        
        return payLoad;
    },
    normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData, opts) {
        
        payLoad = payLoad.data || [];
		if (status === 204) {
			return {
				cars: []
			}

		}
		if (customData.resource === 'carModels') {
			payLoad = payLoad.map(item => ({
				id: item.model_id,
				showroom:{
					id:item.showroom_id,
					name:item.showroom_name,
					company:{
						id: item.company_id,
						companyName: item.company_name
					}

				},
				modelName: item.name,
				color: item.color,
				price: item.model_price,
				isActive: item.is_active,
				completedAt: item.completed_at

			}));
		}
		else {
			payLoad = payLoad.map(item => ({
				id: item.car_id,
				showroom: {
					id: item.showroom_id,
					name: item.showroom_name,

					company: {
						id: item.company_id,
						companyName: item.company_name
					},
				},

				company: {
					id: item.company_id,
					companyName: item.company_name
				},
				modelId: item.model_id,
				modelName: item.model_name,
				color: item.color,
				price: item.model_price,
				isActive: item.is_active,
				completedAt: item.completed_at

			}));
		}
		return {
			cars: payLoad
		}

	}
});
