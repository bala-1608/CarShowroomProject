store.registerModel("cars",{
    
    id:Lyte.attr('string',{primaryKey : true}),
    carType:Lyte.attr('string'),
    showroom:Lyte.belongsTo('showrooms'),
    company:Lyte.belongsTo('companies'),
    modelId:Lyte.attr('string'),
    modelName:Lyte.attr("string"),
    isActive:Lyte.attr("boolean",{default:false}),
    price:Lyte.attr("number"),
    color:Lyte.attr("string"),
    status:Lyte.attr("string"),
    user:Lyte.belongsTo("users")
});

store.registerAdapter("cars", {
  buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
    let basePath = 'http://localhost:8080/CarShowroom/api/v1';
    let resource = customData.resource;

    if (type === 'findAll' && resource) {

      if(queryParams&&queryParams.is_available){
        queryParams.isAvailable=queryParams.is_available;
        delete queryParams.is_available;
      }

      let companyId = customData.companyId;
      let showroomId = customData.showroomId;
      basePath =basePath+ `/companies/${companyId}/showrooms/${showroomId}/models`;
    }
    else if (type === 'findAll') {
      let userId = store.peekAll('users')[0].userId;
      basePath = basePath+ `/users/${userId}/cars`
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
