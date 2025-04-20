Lyte.Component.register("app-admin-panel", {
_template:"<template tag-name=\"app-admin-panel\"> <template is=\"if\" value=\"{{isNotFound}}\"><template case=\"true\"><div class=\"not-found\"> <div class=\"not-content\"> No Companies Currently available </div> </div></template><template case=\"false\"><div> <h3 class=\"details\">COMPANY DETAILS</h3> <card-comp> <template is=\"yield\" yield-name=\"content\"> <table class=\"company-table\"> <thead> <tr> <th>COMPANY NAME</th> <th>STARTED YEAR</th> <th>ADMIN NAME</th> <th>ACTIONS</th> </tr> </thead> <tbody is=\"for\" lyte-for=\"true\" items=\"{{companies}}\" item=\"company\" index=\"index\" depth=\"1\"></tbody> </table> </template> </card-comp> </div></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"registerYield","position":[0,3,1],"dynamicNodes":[{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"text","position":[0,1,1,0]},{"type":"text","position":[0,1,3,0]},{"type":"text","position":[0,1,5,0]},{"type":"attr","position":[0,1,7,1]},{"type":"componentDynamic","position":[0,1,7,1]},{"type":"attr","position":[0,1,7,3]},{"type":"if","position":[0,1,7,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[0,1,7,5]},{"type":"componentDynamic","position":[0,1,7,5]}],"actualTemplate":"<template items=\"{{companies}}\" item=\"company\" index=\"index\" is=\"for\" depth=\"1\"><table><tbody> <tr> <td>{{company.companyName}}</td> <td>{{company.startedYear}}</td> <td>{{company.user.userName}}</td> <td class=\"admin-actions\"> <lyte-button class=\"company-update-btn\" __click=\"{{action('updateCompany',company.id,company.companyName,company.startedYear)}}\"> EDIT </lyte-button> <template is=\"if\" value=\"{{company.isActive}}\"><template case=\"true\"><lyte-button class=\"company-deactivate-btn\" __click=\"{{action('deactivateCompany',company.id)}}\"> DEACTIVATE </lyte-button></template><template case=\"false\"><lyte-button class=\"company-activate-btn\" __click=\"{{action('activateCompany',company.id)}}\"> ACTIVATE </lyte-button></template></template> <lyte-button class=\"company-delete-btn\" __click=\"{{action('deleteCompany',company.id)}}\"> DELETE </lyte-button> </td> </tr> </tbody></table></template>","tagName":"TABLE"}]},{"type":"componentDynamic","position":[0,3]}]}},"default":{}}],
_observedAttributes :["companies","isNotFound"],

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
