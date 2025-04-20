Lyte.Component.register("register-comp", {
_template:"<template tag-name=\"register-comp\"> <div class=\"container type2\"> <div class=\"box\"> <div class=\"left-section\"></div> <div class=\"right-section\"> <div class=\"in-box\"> <div class=\"authentication-form\"> <div class=\"register-form\"> <h2>Sign Up</h2> <template items=\"{{content}}\" item=\"field\" index=\"index\" is=\"for\"><div class=\"input-group\"> <lyte-input lt-prop-id=\"{{index}}\" lt-prop-type=\"{{field.type}}\" class=\"register-input-field\" lt-prop-placeholder=\"{{field.placeholder}}\" lt-prop-value=\"{{lbind(field.value)}}\"></lyte-input> <template is=\"if\" value=\"{{field.errorKey}}\"><template case=\"true\"><div class=\"error\">{{field.errorKey}}</div></template></template> </div></template> <lyte-button class=\"btn\" __click=\" {{action('register')}} \">Submit</lyte-button> <p class=\"link-text\"> Already have an account? <a href=\"login\">Sign in</a> </p> </div> </div> </div> </div> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1,3,1,1,1,3]},{"type":"for","position":[1,1,3,1,1,1,3],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}}]},{"type":"attr","position":[1,1,3,1,1,1,5]},{"type":"componentDynamic","position":[1,1,3,1,1,1,5]}],
_observedAttributes :["content"],

	data: function () {
		return {
			    

			content: Lyte.attr("array",
				{default:
				[{ value: '', type: 'text', placeholder: 'Email', errorKey: '' },
				{ value: '', type: 'password', placeholder: 'Password', errorKey: '' },
				{ value: '', type: 'text', placeholder: 'Full value', errorKey: '' },
				{ value: '', type: 'text', placeholder: 'Phone Number', errorKey: '' },
				{ value: '', type: 'text', placeholder: 'Door No', errorKey: '' },
				{ value: '', type: 'text', placeholder: 'Street', errorKey: '' },
				{ value: '', type: 'text', placeholder: 'City', errorKey: '' },
				{ value: '', type: 'text', placeholder: 'Postal Code', errorKey: '' },
				],
			}),
				
		}
	},
	actions: {
		register:function(){
			let userData = {
				email: this.getData('content')[0].value,
				password: this.getData('content')[1].value,
				userName: this.getData('content')[2].value,
				phoneNo: +this.getData('content')[3].value,
				address: {
					street: this.getData('content')[5].value,
					city: this.getData('content')[6].value,
					postalCode: +this.getData('content')[7].value,
					doorNo: this.getData('content')[4].value,
				}
			};
				var record = store.createRecord("users",userData);
				record.$.save(
					{
						resource:true
					}
				)
					.then(function (data) {
						alert('register Successfully');
						store.unloadRecord("users",store.peekAll('users')[0].userId);
						store.unloadRecord("address",store.peekAll('address')[0].id);
						Lyte.Router.transitionTo('login'); 
					}, function () {
						alert('Failed');
					});
		}
	},
	methods: {
		
	}
});
