store.registerModel("showrooms",{
    id:Lyte.attr('number', { primaryKey : true }),
    showroomName:Lyte.attr('string'),
    user:Lyte.belongsTo('users'),
    isActive:Lyte.attr('boolean'),
    company:Lyte.belongsTo('companies'),
    cars:Lyte.hasMany('cars')
});

store.registerAdapter("showrooms", {
    
	buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
    let companyId = customData.companyId;
    if(queryParams&&queryParams.is_active){
      queryParams.isActive=queryParams.is_active;
      delete queryParams.is_active;
    }
    
    let basePath = `http://localhost:8080/CarShowroom/api/v1/companies/${companyId}/showrooms`;

    return basePath;
  },
    
      headersForRequest: function () {
        return {
          "Content-Type": "application/json"
        };
      },
    
      parseResponse: function (type, modelName, xhrObj, payLoad) {
        if(xhrObj.status===401){
          Lyte.Router.transitionTo('login');
        }
        return payLoad;
      }
});


store.registerSerializer("showrooms",{
    serializeKey : function( modelName , type , customData , queryParams ){
        return "";
    },
    serialize : function( type , payLoad , records , customData , modelName, queryParams , gql ){
        console.log(payLoad);
		return payLoad;
	},
    normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData, opts) {
        let data= payLoad.data || [];
		if(status===204){
			return {
				showrooms:[]
			}
		}
        let array = data.map(item => ({
            id: item.showroom_id,
            showroomName: item.showroom_name,
            user:{
                userId:item.manager_id,
                userName: item.name,
                role:"manager"
            },
            isActive: item.is_active,
            company:{
                id:item.company_id,
                companyName:item.company_name
            }
            
        }));
        return {
            showrooms: array
        }
    }
});
