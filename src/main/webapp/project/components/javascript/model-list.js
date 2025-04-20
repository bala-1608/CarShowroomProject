Lyte.Component.register("model-list", {
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
