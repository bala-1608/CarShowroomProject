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

