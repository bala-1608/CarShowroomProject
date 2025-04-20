Lyte.Component.register("user-bookings", {
_template:"<template tag-name=\"user-bookings\"> <template is=\"if\" value=\"{{isNotFound}}\"><template case=\"true\"><div class=\"not-found\"> <div class=\"not-content\"> No Bookings Available </div> </div></template><template case=\"false\"><div> <h3 class=\"details\">BOOKINGS DETAILS</h3> <card-comp> <template is=\"yield\" yield-name=\"content\"> <table class=\"company-table\"> <thead> <tr> <th>COMPANY NAME</th> <th>SHOWROOM NAME</th> <th>MODEL NAME </th> <th>MODEL COLOR</th> <th>MODEL PRICE</th> <th>BOOKING TYPE</th> <th>STATUS</th> <th>BOOKING DATE</th> </tr> </thead> <tbody is=\"for\" lyte-for=\"true\" items=\"{{bookings}}\" item=\"booking\" index=\"index\" depth=\"1\"></tbody> </table> </template> </card-comp> </div></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"registerYield","position":[0,3,1],"dynamicNodes":[{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"text","position":[0,1,1,0]},{"type":"text","position":[0,1,3,0]},{"type":"text","position":[0,1,5,0]},{"type":"text","position":[0,1,7,0]},{"type":"text","position":[0,1,9,0]},{"type":"text","position":[0,1,11,0]},{"type":"text","position":[0,1,13,0]},{"type":"text","position":[0,1,15,0]}],"actualTemplate":"<template items=\"{{bookings}}\" item=\"booking\" index=\"index\" is=\"for\" depth=\"1\"><table><tbody> <tr> <td>{{booking.showroom.company.companyName}}</td> <td>{{booking.showroom.name}}</td> <td>{{booking.model.modelName}}</td> <td>{{booking.model.color}}</td> <td>{{booking.model.price}}</td> <td>{{booking.bookingType}}</td> <td>{{booking.status}}</td> <td>{{booking.requestDate}}</td> </tr> </tbody></table></template>","tagName":"TABLE"}]},{"type":"componentDynamic","position":[0,3]}]}},"default":{}}],
_observedAttributes :["bookings","isNotFound"],

	data : function(){
		return {
			bookings:Lyte.attr("array"),
			isNotFound: Lyte.attr("boolean", { default: false })
		}		
	},
	init: function () {
		let self=this;
		self.executeMethod("fetchBookingDetails");
	},
	actions : {
		
	},
	methods : {
		fetchBookingDetails() {
			let self = this;
			 store.findAll("bookings",{},true,true)
				.then(function(response) {
					
					if (response.length === 0) {
						self.setData(self.setData('isNotFound', true));
					}
					self.setData("bookings", response);
					
				}).catch(function(error) {
					alert('Error ',error);
					 
				});
		},
	}
});
