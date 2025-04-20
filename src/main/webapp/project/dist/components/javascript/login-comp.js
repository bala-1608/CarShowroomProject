Lyte.Component.register("login-comp", {
_template:"<template tag-name=\"login-comp\"> <div class=\"container type2\"> <div class=\"box\"> <div class=\"left-section\"></div> <div class=\"right-section\"> <div class=\"in-box\"> <div class=\"authentication-form\"> <div class=\"login-form\"> <h2>Login into Your Account</h2> <div class=\"input-group\"> <lyte-input lt-prop-id=\"email\" lt-prop-type=\"text\" class=\"input-field\" lt-prop-placeholder=\"Email\" lt-prop-value=\"{{lbind(email)}}\"></lyte-input> <template is=\"if\" value=\"{{emailError}}\"><template case=\"true\"><div class=\"error\"> {{emailError}}</div></template></template> </div> <div class=\"input-group\"> <lyte-input lt-prop-id=\"password\" lt-prop-type=\"password\" class=\"input-field\" lt-prop-maxlength=\"8\" lt-prop-password-icon=\"true\" lt-prop-placeholder=\"Password\" lt-prop-value=\"{{lbind(password)}}\"></lyte-input> <template is=\"if\" value=\"{{passwordError}}\"><template case=\"true\"><div class=\"error\"> {{passwordError}} </div></template></template> </div> <lyte-button class=\"btn\" __click=\"{{action('newLogin')}}\">Sign In</lyte-button> <p class=\"link-text\"> Don't have an account? <a href=\"register\">Sign up</a> </p> </div> </div> </div> </div> </div> </div> </template>\n<style>\n* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n    font-family: 'Poppins', sans-serif;\n}\n.container {\n    height: 100vh;\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background: gainsboro;\n}\n.box {\n    display: flex;\n    flex-direction: row;\n    width: 75%;\n    height: 80vh;\n    border-radius: 20px;\n    overflow: hidden;\n    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);\n    background: gainsboro;\n    box-shadow:\n\t\t  2.8px 2.8px 8px rgba(0, 0, 0, 0.02),\n\t\t  6.7px 6.7px 19.2px rgba(0, 0, 0, 0.028),\n\t\t  12.5px 12.5px 36.2px rgba(0, 0, 0, 0.035),\n\t\t  22.3px 22.3px 64.6px rgba(0, 0, 0, 0.042),\n\t\t  41.8px 41.8px 120.7px rgba(0, 0, 0, 0.05),\n\t\t  100px 100px 289px rgba(0, 0, 0, 0.07); \n}\n.left-section {\n    flex: 1.2;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background:white;\n}\n.left-section img {\n    width: 100%;\n    height: 100%;\n    box-shadow:\n\t\t  2.8px 2.8px 8px rgba(0, 0, 0, 0.02),\n\t\t  6.7px 6.7px 19.2px rgba(0, 0, 0, 0.028),\n\t\t  12.5px 12.5px 36.2px rgba(0, 0, 0, 0.035),\n\t\t  22.3px 22.3px 64.6px rgba(0, 0, 0, 0.042),\n\t\t  41.8px 41.8px 120.7px rgba(0, 0, 0, 0.05),\n\t\t  100px 100px 289px rgba(0, 0, 0, 0.07); \n\n}\n.right-section {\n    flex: 1;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: white;\n    padding: 40px;\n    background: #141e30;\n}\n\n.in-box{\n    width: 100%;\n    height: 100%;\n    border-radius: 20px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: rgba(255, 255, 255, 0.1);\n}\n.authentication-form {\n    width: 80%;\n    height: 100%;\n    text-align: center;\n    \n}\n.authentication-form h2 {\n    font-size: 24px;\n    margin-bottom: 20px;\n    margin-top: 15px;\n}\n.login-form{\n  margin-top: 40%;\n}\n.login-form h2{\n    margin-bottom: 40px;\n    color: #ff7eb3;\n    font-weight: 300;\n}\n.register-form{\n  height: 100%;\n}\n.input-group {\n    width: 100%;\n    \n}\n.register-input-field{\n  width: 70%;\n  padding: 8px;\n  border: none;\n  border-radius: 20px;\n  font-size: 14px;\n  margin-bottom: 12px;\n  background: rgba(255, 255, 255, 0.2);\n  color: white;\n  outline: none;\n  transition:  width 0.2s ease,heigth 0.2s ease;\n  z-index: 1000;\n}\n.register-input-field input,.input-field input{\n background: transparent ;\n padding: 0%;\n color: #f3f3f3;\n box-sizing: content-box;\n \n}\nlyte-button button{\n    padding: 0%;\n}\n.input-field {\n    width: 70%;\n    padding: 12px;\n    border: none;\n    border-radius: 20px;\n    font-size: 16px;\n    margin-bottom: 15px;\n    background: rgba(255, 255, 255, 0.2);\n    color: white; \n    outline: none;\n    transition:  width 0.2s ease,heigth 0.2s ease;\n    z-index: 1000;\n}\n.input-field{\n    margin-bottom: 15px;\n}\n.input-field:hover {\n    background: rgba(255, 255, 255, 0.3);\n    width: 75%;\n    height: 100%;\n    transform: scale(1.02);\n}\n.input-field::placeholder,.register-input-field::placeholder {\n    color: rgba(255, 255, 255, 0.7);\n\n}\n.btn {\n    width: 70%;\n    margin-top: 15px;\n    padding: 12px;\n    background: #ff7eb3;\n    border: none;\n    border-radius: 20px;\n    font-size: 16px;\n    color: white;\n    cursor: pointer;\n    transition: width 0.2s ease,height 0.2s ease;\n}\n.btn:hover {\n    background: #ff4d8c;\n    width:75%;\n    transform: scale(1.02);\n}\n.link-text {\n    margin-top: 25px;\n    font-size: 14px;\n    margin-bottom: 20px;\n\n}\n.forgot{\n    margin-left: 210px;\n    color: rgba(255, 255, 255, 0.7);\n    text-decoration: underline;\n    color: #ff4d8c;\n    \n}\n.forgot:hover{\n    color: white;\n    text-decoration: none;\n}\n.link-text a {\n    color: #ff7eb3;\n    text-decoration: none;\n}\n.link-text a:hover {\n    color: #ff4d8c;\n}\n \n.error {\n    margin-top: -8px; \n    margin-left: 80px;\n    padding: 0;\n    text-align: left;\n    color: red;\n    font-size: 14px;\n}\n\n  .container {\n    width: 100%;\n  }\n\n  \n  \n  \n  .user-list-container {\n    width: 80%;\n    margin: 20px auto;\n    background: white;\n    padding: 20px;\n    border-radius: 10px;\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n  }\n  \n  \n  .delete-btn {\n    background: #e63946;\n    border: none;\n    padding: 5px 10px;\n    border-radius: 5px;\n    color: white;\n    cursor: pointer;\n  }\n  \n  .contact-info {\n    position: fixed;\n    bottom: 10px;\n    right: 10px;\n    background: navy;\n    color: white;\n    padding: 15px;\n    border-radius: 10px;\n  }\n  .admin-panel {\n    font-family: Arial, sans-serif;\n  }\n  \n \n  \n  .logo {\n    font-size: 30px;\n    font-weight: bold;\n  }\n  \n  .logo i {\n    margin-right: 8px;\n    color: blue;\n  }\n  \n  .actions button {\n    margin-left: 10px;\n    padding: 8px 12px;\n    border: none;\n    border-radius: 5px;\n    cursor: pointer;\n  }\n  \n  .btn-create {\n    background: blue;\n    color: white;\n  }\n  \n  .btn-profile {\n    background: #f3f3f3;\n    color: black;\n  }\n  \n  .register-input-field._popup{\n    width: 100%;\n    background-color: #141e30;\n  }\n  .buttons {\n    display: flex;\n    flex-direction: row;\n  }\n  \n  .btn {\n    padding: 10px 10px;\n    margin: 5px;\n    border: none;\n    border-radius: 20px;\n    cursor: pointer;\n  }\n  \n\n\n  </style>",
_dynamicNodes : [{"type":"attr","position":[1,1,3,1,1,1,3,1]},{"type":"componentDynamic","position":[1,1,3,1,1,1,3,1]},{"type":"attr","position":[1,1,3,1,1,1,3,3]},{"type":"if","position":[1,1,3,1,1,1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,1,3,1,1,1,5,1]},{"type":"componentDynamic","position":[1,1,3,1,1,1,5,1]},{"type":"attr","position":[1,1,3,1,1,1,5,3]},{"type":"if","position":[1,1,3,1,1,1,5,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,1,3,1,1,1,7]},{"type":"componentDynamic","position":[1,1,3,1,1,1,7]}],
_observedAttributes :["emailError","passwordError","email","password"],

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
