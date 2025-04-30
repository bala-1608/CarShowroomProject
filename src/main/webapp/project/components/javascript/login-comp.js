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
		hideEmailError(){
			if(this.getData('emailError')){
				
				this.setData('emailError',"");
			}
			
		},
		hidePasswordError(){
			if(this.getData('passwordError')){
				this.setData('passwordError',"");
			}
		},

		newLogin: function () {
			let loginData = {
				email: this.getData('email'),
				password: this.getData('password')
			}
			var record = store.createRecord("users",loginData);
			if(record.$.isError){
				let emailError=record.$.error.email;
				let passwordError=record.$.error.password;
				if(emailError&&passwordError){

					if(emailError.code==='ERR08'){
						this.setData('emailError',
							"Invalid email format"
						)
						this.setData("email", "");
					}
					else if(emailError.code==='ERR02'){
						this.setData('emailError',
							"Email is required"
						)
						this.setData("email", "");
	
					}
					if(passwordError.code==='ERR07'){
						this.setData('passwordError',
							"password must be 8 characters"
						)
						this.setData("password", "");
					}
					this.setData("email", "");
					this.setData("password", "");
				}

				if(emailError&&emailError.code==='ERR08'){
					this.setData('emailError',
						"Invalid email format"
					)
					this.setData("email", "");
				}
				else if(emailError&&emailError.code==='ERR02'){
					this.setData('emailError',
						"Email is required"
					)
					this.setData("email", "");

				}
				else if(passwordError&&passwordError.code==='ERR07'){
					this.setData('passwordError',
						"password must be 8 characters"
					)
					this.setData("password", "");
				}
				return;
		    }
			record.$.save()
				.then(function (data) {
					alert('login Successfully');
					Lyte.Router.replaceWith('tab.home'); 
				}, function (data) {
					if(data.message&&data.message==='password mismatch'){
						this.setData('passwordError',data.message);
					}
					else if(data.message&&data.message==='register first'){
						this.setData('emailError','user already exists');
					}
					else{
						alert('Failed');
					}
				});
				this.setData("email", "");
				this.setData("password", "");
		}
	},
	methods: {
		
	}
});
