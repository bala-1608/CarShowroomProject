Lyte.Component.register("showroom-list", {
_template:"<template tag-name=\"showroom-list\"> <template is=\"if\" value=\"{{isNotFound}}\"><template case=\"true\"><div class=\"not-found\"> <div class=\"not-content\"> No Showrooms Currently available </div> </div></template><template case=\"false\"><div> <div class=\"top-section\"> <lyte-button class=\"back-btn\" __click=\"{{action('goBack')}}\"> <span class=\"back-arrow\">←</span> <span class=\"back-text\">Back</span> </lyte-button> <h3>SHOWROOM DETAILS</h3> <lyte-button class=\"sync-btn\" __click=\"{{action('syncShowrooms')}}\"> <span class=\"icon\">⟳</span> <span>Sync</span> </lyte-button> </div> <card-comp> <template is=\"yield\" yield-name=\"content\"> <table class=\"company-table\"> <thead> <tr> <th>SHOWROOM NAME</th> <th>COMPANY NAME</th> <th>MANAGER NAME</th> <th>ACTIONS</th> </tr> </thead> <tbody is=\"for\" lyte-for=\"true\" items=\"{{showrooms}}\" item=\"showroom\" index=\"index\" depth=\"1\"></tbody> </table> </template> </card-comp> </div></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[0,1,1]},{"type":"componentDynamic","position":[0,1,1]},{"type":"attr","position":[0,1,5]},{"type":"componentDynamic","position":[0,1,5]},{"type":"registerYield","position":[0,3,1],"dynamicNodes":[{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"text","position":[0,1,1,0]},{"type":"text","position":[0,1,3,0]},{"type":"text","position":[0,1,5,0]},{"type":"attr","position":[0,1,7,1]},{"type":"if","position":[0,1,7,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}],"actualTemplate":"<template items=\"{{showrooms}}\" item=\"showroom\" index=\"index\" is=\"for\" depth=\"1\"><table><tbody> <tr> <td>{{showroom.showroomName}}</td> <td>{{showroom.company.companyName}}</td> <td>{{showroom.user.userName}}</td> <td class=\"admin-actions\"> <template is=\"if\" value=\"{{isAdmin}}\"><template case=\"true\"><div> <template is=\"if\" value=\"{{showroom.isActive}}\"><template case=\"true\"><lyte-button class=\"company-update-btn\"> EDIT </lyte-button></template></template> <template is=\"if\" value=\"{{showroom.isActive}}\"><template case=\"true\"><lyte-button class=\"company-deactivate-btn\"> DEACTIVATE </lyte-button></template><template case=\"false\"><lyte-button class=\"company-activate-btn\"> ACTIVATE </lyte-button></template></template> <template is=\"if\" value=\"{{showroom.isActive}}\"><template case=\"true\"><lyte-button class=\"company-delete-btn\"> DELETE </lyte-button></template></template> </div></template><template case=\"false\"><lyte-button class=\"view-showroom-btn\" __click=\"{{action('redirectToModels',showroom.company.id,showroom.id)}}\"> View Models </lyte-button></template></template> </td> </tr> </tbody></table></template>","tagName":"TABLE"}]},{"type":"componentDynamic","position":[0,3]}]}},"default":{}}],
_observedAttributes :["userData","showrooms","isNotFound"],

	data: function () {
		return {
			userData: Lyte.attr("object"),
			showrooms: Lyte.attr('array'),
			isNotFound: Lyte.attr("boolean", { default: false })


		}
	},
	init: function () {

		let self = this;
		let companyId = this.data.companyId;
		self.executeMethod("fetchShowroomDetails", companyId);
		let data = store.peekAll('users')[0];
		this.setData('userData', data);
	}
	,
	didConnect: function () {


	},
	actions: {
		redirectToModels: function (companyId, showroomId) {
			Lyte.Router.transitionTo('tab.companies.showrooms.models', companyId, showroomId);
		},
		goBack(){
			Lyte.Router.transitionTo('tab.companies');
		}

	},
	methods: {
		fetchShowroomDetails(companyId) {
			let self = this;
			store.findAll("showrooms", {isActive:true}, false, true, { companyId: companyId })
				.then(function (response) {
					if (response.length === 0) {
						self.setData(self.setData('isNotFound', true));
					}
					self.setData("showrooms", response);
				}).catch(function (error) {
					if (error.status === 404) {
						alert('Not Found');
					}
				});
		},
	}
});
