Lyte.Component.register("user-cars", {
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
