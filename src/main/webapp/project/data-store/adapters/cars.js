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
    return payLoad;
  }
});

