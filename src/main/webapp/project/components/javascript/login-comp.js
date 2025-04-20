Lyte.Component.register("login-comp", {
	data: function () {
		return {
			emailError: Lyte.attr("string", { default: "" }),
			passwordError: Lyte.attr("string", { default: "" }),
			email: Lyte.attr("string", { default: "" }),
			password: Lyte.attr("string", { default: "" }),

		}
	},
	init : function(){
		
		
	  },
	actions: {

		newLogin: function () {
			let loginData = {
				email: this.getData('email'),
				password: this.getData('password')
			}
			var record = store.createRecord("users",loginData);
			record.$.save()
				.then(function (data) {
					alert('login Successfully');
					Lyte.Router.replaceWith('tab.home'); 
				}, function () {
					alert('Failed');
				});
				this.setData("email", "");
				this.setData("password", "");
		}
	},
	methods: {
		
	}
});
