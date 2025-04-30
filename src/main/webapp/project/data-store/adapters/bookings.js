store.registerAdapter("bookings", {

  buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
    let basePath = 'http://localhost:8080/CarShowroom/api/v1';
    let user = store.peekAll('users')[0];

    if (type === 'createRecord') {

      let companyId = customData.companyId;
      let showroomId = customData.showroomId;
      let modelId = customData.modelId;
      
      basePath = basePath+`/companies/${companyId}/showrooms/${showroomId}/models/${modelId}/bookings`;

    }
    else if(customData&&customData.companyId&&type==='findAll'){
      let companyId = user.company.id;
      let showroomId = user.showroom.id;
      basePath = basePath+`/companies/${companyId}/showrooms/${showroomId}/bookings`;

    }

    else if (type === 'findAll') {
      let userId=user.userId;
      basePath =  basePath+`/users/${userId}/bookings`
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

