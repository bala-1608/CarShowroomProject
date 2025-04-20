Lyte.Component.register("model-list", {
_template:"<template tag-name=\"model-list\"> <template is=\"if\" value=\"{{isNotFound}}\"><template case=\"true\"><div class=\"not-found\"> <div class=\"not-content\"> No Models Currently available </div> </div></template><template case=\"false\"><div> <div class=\"top-section\"> <lyte-button class=\"back-btn\" __click=\"{{action('goBack')}}\"> <span class=\"back-arrow\">←</span> <span class=\"back-text\">Back</span> </lyte-button> <h3>MODELS DETAILS</h3> <lyte-button class=\"sync-btn\" __click=\"{{action('syncModels')}}\"> <span class=\"icon\">⟳</span> <span>Sync</span> </lyte-button> </div> <card-comp> <template is=\"yield\" yield-name=\"content\"> <table class=\"company-table\"> <thead> <tr> <th>COMPANY NAME</th> <th>MODEL NAME</th> <th>MODEL PRICE</th> <th>MODEL COLOR</th> <th>ACTIONS</th> </tr> </thead> <tbody is=\"for\" lyte-for=\"true\" items=\"{{modelList}}\" item=\"model\" index=\"index\" depth=\"1\"></tbody> </table> </template> </card-comp> </div></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[0,1,1]},{"type":"componentDynamic","position":[0,1,1]},{"type":"attr","position":[0,1,5]},{"type":"componentDynamic","position":[0,1,5]},{"type":"registerYield","position":[0,3,1],"dynamicNodes":[{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"text","position":[0,1,1,0]},{"type":"text","position":[0,1,3,0]},{"type":"text","position":[0,1,5,0]},{"type":"text","position":[0,1,7,0]},{"type":"attr","position":[0,1,9,1]},{"type":"componentDynamic","position":[0,1,9,1]}],"actualTemplate":"<template items=\"{{modelList}}\" item=\"model\" index=\"index\" is=\"for\" depth=\"1\"><table><tbody> <tr> <td>{{model.showroom.company.companyName}}</td> <td>{{model.modelName}}</td> <td>{{model.price}}</td> <td>{{model.color}}</td> <td class=\"admin-actions\"> <lyte-button class=\"view-showroom-btn\" __click=\"{{action('bookDelivery',model.id,model.price)}}\"> BOOK </lyte-button> </td> </tr> </tbody></table></template>","tagName":"TABLE"}]},{"type":"componentDynamic","position":[0,3]}]}},"default":{}}],
_observedAttributes :["modelList","userData","isNotFound","companyId","showroomId"],

	data : function(){
		return {
			modelList:Lyte.attr("array"),
			userData: Lyte.attr("object"),
			isNotFound: Lyte.attr("boolean", { default: false }),
			companyId:Lyte.attr("number"),
			showroomId:Lyte.attr("number"),
		}		
	},
	init: function () {
		let self=this;
		
		self.setData('showroomId',this.data.showroomId) ;
		self.setData('companyId',this.data.companyId);

		self.executeMethod("fetchModelDetails");

		let data=store.peekAll('users')[0];
		this.setData('userData',data);
	},
	actions : {
		
		goBack(){
			Lyte.Router.transitionTo('tab.companies.showrooms',this.getData('companyId'));
		},
		bookDelivery: function (modelId, modelPrice) {
			let bookingData = {
				status: '0',
				bookingType: '0',
				price: modelPrice
			}
			let record = store.createRecord('bookings', bookingData);
			
			record.$.save(
				{
					companyId: this.getData('companyId'),
					showroomId: this.getData('showroomId'),
					modelId:modelId
				}
			)
				.then(function (data) {
					if(data.bookings.status===204){
						alert('Car not available');
					}
					else{
						alert('Delivery Booked Successfully');
					}
					store.unloadAll("bookings");
				}, function () {
					alert('Failed');
				});

		}
	},
	methods : {
		fetchModelDetails() {
			let self = this;
			 store.findAll("cars",{is_available:true},false,true,
				{ 
					resource:'carModels',
			      companyId:this.getData('companyId'),
				  showroomId:this.getData('showroomId')
			})
				.then(function(response) {
					if (response.length === 0) {
						self.setData(self.setData('isNotFound', true));
					}
					self.setData("modelList", response);
				}).catch(function(error) {
					alert('failed');
				});
		},
	}
});
