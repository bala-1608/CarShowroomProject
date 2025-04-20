Lyte.Component.register("companies-list", {
	data: function () {
		return {
			userData: Lyte.attr("object"),
			companyList: Lyte.attr("array"),
			isNotFound: Lyte.attr("boolean", { default: false })
		}
	},
	init: function () {
		let self=this;
		self.executeMethod("fetchCompanyDetails");
		let data=store.peekAll('users')[0];
		this.setData('userData',data);
	},
	didConnect: function () {
		
	},
	actions: {
		redirectToShowrooms:function(companyId) {
			Lyte.Router.transitionTo('tab.companies.showrooms',companyId);
		},
		goBack(){
			Lyte.Router.transitionTo('tab.home');
		}
	},
	methods: {
		fetchCompanyDetails() {
			let self = this;
			store.findAll("companies",{is_active:true})
				.then(function(response) {
					if(!self||!self.$node){
						return;
					}
					self.setData("companyList", response);
				}).catch(function(error) {
					alert('failed');
				});
		},
		
	}
});
