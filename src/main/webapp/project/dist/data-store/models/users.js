store.registerModel("users",{

  userId : Lyte.attr( "string" ,{primaryKey:true}),
  userName : Lyte.attr( "string" ),
  phoneNo : Lyte.attr( "number" ,{ minimum : 10 }),
  password : Lyte.attr( "string" , { minLength : 8 }),
  role: Lyte.attr( "string" ),
  email : Lyte.attr( "string" , { pattern : /^[a-zA-Z0-9_]([\w\-\.\+\']*)@([\w\-\.]*)(\.[a-zA-Z]{2,22}(\.[a-zA-Z]{2}){0,2})$/ }),
  address:Lyte.belongsTo("address", { serialize : "record" })
  
});

store.registerAdapter("users", {

  buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
    
    let basePath = "http://localhost:8080/CarShowroom";
    
    if(customData&&customData.resource&& type === "createRecord"){
      return `${basePath}/auth/register`;
    }
    else if (type === "deleteRecord") {
      return `${basePath}/auth/logout`;
    }
    else if (type === "findAll") {
      return `${basePath}/api/v1/users`;
    }
    else if (type === "createRecord") {
      return `${basePath}/auth/login`;
    }
    return url;
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
    return payLoad;
  }
});

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
