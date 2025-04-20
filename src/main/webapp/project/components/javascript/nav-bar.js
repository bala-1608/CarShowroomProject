Lyte.Component.register("nav-bar", {
	data : function(){
		return {

		}		
	},
	actions : {
		logout: function () {
			var record = store.peekAll("users")[0];
			record.$.destroyRecord().then(function () {
				Lyte.Router.transitionTo('login');
			}, function () {
				alert("logout failed");
			});
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});
