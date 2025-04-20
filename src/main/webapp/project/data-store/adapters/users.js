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
