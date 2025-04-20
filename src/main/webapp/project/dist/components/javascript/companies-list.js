Lyte.Component.register("companies-list", {
_template:"<template tag-name=\"companies-list\"> <template is=\"if\" value=\"{{isNotFound}}\"><template case=\"true\"><div class=\"not-found\"> <div class=\"not-content\"> No Companies Currently available </div> </div></template><template case=\"false\"><div> <div class=\"top-section\"> <lyte-button class=\"back-btn\" __click=\"{{action('goBack')}}\"> <span class=\"back-arrow\">←</span> <span class=\"back-text\">Back</span> </lyte-button> <h3>COMPANY DETAILS</h3> <lyte-button lt-prop-label=\"Sync\" class=\"sync-btn\" __click=\"{{action('syncCompanies')}}\"> <span class=\"icon\">⟳</span> <span>Sync</span> </lyte-button> </div> <card-comp> <template is=\"yield\" yield-name=\"content\"> <table class=\"company-table\"> <thead> <tr> <th>COMPANY NAME</th> <th>STARTED YEAR</th> <th>ADMIN NAME</th> <th>ACTIONS</th> </tr> </thead> <tbody is=\"for\" lyte-for=\"true\" items=\"{{companyList}}\" item=\"company\" index=\"index\" depth=\"1\"></tbody> </table> </template> </card-comp> </div></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[0,1,1]},{"type":"componentDynamic","position":[0,1,1]},{"type":"attr","position":[0,1,5]},{"type":"componentDynamic","position":[0,1,5]},{"type":"registerYield","position":[0,3,1],"dynamicNodes":[{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"text","position":[0,1,1,0]},{"type":"text","position":[0,1,3,0]},{"type":"text","position":[0,1,5,0]},{"type":"attr","position":[0,1,7,1]},{"type":"componentDynamic","position":[0,1,7,1]}],"actualTemplate":"<template items=\"{{companyList}}\" item=\"company\" index=\"index\" is=\"for\" depth=\"1\"><table><tbody> <tr> <td>{{company.companyName}}</td> <td>{{company.startedYear}}</td> <td>{{company.user.userName}}</td> <td class=\"admin-actions\"> <lyte-button class=\"view-showroom-btn\" __click=\"{{action('redirectToShowrooms',company.id)}}\"> View Showrooms </lyte-button> </td> </tr> </tbody></table></template>","tagName":"TABLE"}]},{"type":"componentDynamic","position":[0,3]}]}},"default":{}}],
_observedAttributes :["userData","companyList","isNotFound"],

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
