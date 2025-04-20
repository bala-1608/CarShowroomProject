Lyte.Component.register("user-cars", {
_template:"<template tag-name=\"user-cars\"> <template is=\"if\" value=\"{{isNotFound}}\"><template case=\"true\"><div class=\"not-found\"> <div class=\"not-content\"> No Owned Cars yet </div> </div></template><template case=\"false\"><div> <h3 class=\"details\">CARS DETAILS</h3> <card-comp> <template is=\"yield\" yield-name=\"content\"> <table class=\"company-table\"> <thead> <tr> <th>COMPANY NAME</th> <th>SHOWROOM NAME</th> <th>MODEL NAME </th> <th>MODEL COLOR</th> <th>MODEL PRICE</th> <th>DELIVERED DATE</th> </tr> </thead> <tbody is=\"for\" lyte-for=\"true\" items=\"{{cars}}\" item=\"car\" index=\"index\" depth=\"1\"></tbody> </table> </template> </card-comp> </div></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"registerYield","position":[0,3,1],"dynamicNodes":[{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"text","position":[0,1,1,0]},{"type":"text","position":[0,1,3,0]},{"type":"text","position":[0,1,5,0]},{"type":"text","position":[0,1,7,0]},{"type":"text","position":[0,1,9,0]},{"type":"text","position":[0,1,11,0]}],"actualTemplate":"<template items=\"{{cars}}\" item=\"car\" index=\"index\" is=\"for\" depth=\"1\"><table><tbody> <tr> <td>{{car.showroom.company.companyName}}</td> <td>{{car.showroom.name}}</td> <td>{{car.modelName}}</td> <td>{{car.color}}</td> <td>{{car.price}}</td> <td>{{car.completedAt}}</td> </tr> </tbody></table></template>","tagName":"TABLE"}]},{"type":"componentDynamic","position":[0,3]}]}},"default":{}}],
_observedAttributes :["cars","isNotFound"],

	data : function(){
		return {
			cars:Lyte.attr("array"),
			isNotFound: Lyte.attr("boolean", { default: false })
		}		
	},
	init: function () {
		let self=this;
		self.executeMethod("fetchCarDetails");
		
	},
	actions : {
	},
	methods : {
		fetchCarDetails() {
			let self = this;
			store.findAll("cars",{},true,true,{})
			.then(function(response) {
				if (response.length === 0) {
					self.setData(self.setData('isNotFound', true));
				}
				self.setData("cars", response);
				
			}).catch(function(error) {
				alert('Error ',error);
				 
			});
		},
	}
});
