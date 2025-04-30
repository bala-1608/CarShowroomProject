Lyte.Router.registerRoute("tab", {
	beforeModel: function (paramsObject) {

		let prevTrans = Lyte.Router.getRouteInstance().transition._processed.prevTrans;
		if(prevTrans&&prevTrans.target&&prevTrans.target==='login'){
            window.location.reload();
		}
		
		let value =  document.cookie;
			let index = value.indexOf("=");
			let sessionId=value.substring(index+1,value.length);
			if(!sessionId){
				this.transitionTo("login");
			}

	},
	model: function (paramsObject) {
		let data = store.peekAll("users")[0];
		if (!data) {
			return store.findAll("users",{},true,true)
			.then(function (response) {
				return response;
			}, function (response) {
				if (response.status === 401) {
					document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
					Lyte.Router.transitionTo('login');
				}
				return [];

			});
		}
	},
	
	renderTemplate: function (model, paramsObject) {
		return {
			outlet: "#outlet",
			component: "tab-comp",
			model: model
		}
	}
});