store.registerModel("companies",{

    id: Lyte.attr('string',{primaryKey:true}), 
    companyName: Lyte.attr('string'), 
    user:Lyte.belongsTo('users'),
    isActive: Lyte.attr('boolean'), 
    startedYear: Lyte.attr('string'),
    showrooms:Lyte.hasMany('showrooms')

});

store.registerSerializer("companies", {
    serializeKey : function( modelName , type , customData , queryParams ){
        return "";
    },
    serialize : function( type , payLoad , records , customData , modelName, queryParams , gql ){
		return payLoad;
	},
    normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData, opts) {
        payLoad = payLoad.data || [];
        let array = payLoad.map(item => ({
            id: item.brand_code,
            companyName: item.company_name,
            user:{
                userName:item.name,
				userId:item.admin_id,
                role:"admin"
            },
            isActive: item.is_active,
            startedYear: item.started_year
        }));
        return {
            companies: array
        }
    }
});

store.registerAdapter("companies", {
    namespace:"CarShowroom/api/v1",
    host:"http://localhost:8080",
	buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
    if(queryParams&&queryParams.is_active){
      queryParams.isActive=queryParams.is_active;
      delete queryParams.is_active;
    }
        return url;
      },
    
      headersForRequest: function () {
        return {
          "Content-Type": "application/json"
        };
      },
    
      parseResponse: function (type, modelName, xhrObj, payLoad) {
        // if(xhrObj.status===401){
        //   Lyte.Router.transitionTo('login');
        // }
        return payLoad;
      }
});

