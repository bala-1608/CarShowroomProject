Lyte.Component.register("app-admin-panel", {
	data : function(){
		return {
			companies: Lyte.attr("array"),
			isNotFound: Lyte.attr("boolean", { default: false })
		}		
	},init: function () {
		let self=this;
		self.executeMethod("fetchCompanyDetails");
	},
	actions : {
		updateCompany:function(companyId,companyName,startedYear){
			
		},
		deactivateCompany:function(companyId){
			console.log(companyId);
		},
		activateCompany:function(companyId){
			let self=this;
			let companies=self.getData('companies');
				console.log(companies);
			store.update("companies")
			  .then(function(response) {
				
				// companies.forEach(company => {
				// 	if (company.get('companyId') === companyId) {
				// 		company.set('is_active', true);  
				// 	}
				// });
				// self.setData('companies',companies);
				
			}).catch(function(error) {
				alert('failed');
			});
		},
		deleteCompany:function(companyId){
			console.log(companyId);
		}
	},
	methods : {
		fetchCompanyDetails() {
			let self = this;
			store.findAll("companies")
				.then(function(response) {
					self.setData("companies", response);
				}).catch(function(error) {
					alert('failed');
				});
		},
	}
});
