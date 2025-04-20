Lyte.Component.register("register-comp", {
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
