Lyte.Component.register("user-bookings", {
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
