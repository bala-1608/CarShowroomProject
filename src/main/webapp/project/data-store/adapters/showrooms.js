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

