Lyte.Component.register("card-comp", {
	data : function(){
		return {

			isNotFound:Lyte.attr('boolean',{default:false}),
			notFound:Lyte.attr('string'),
			name:Lyte.attr('string'),
			isCompany:Lyte.attr('boolean',{default:false}),
			isShowroom:Lyte.attr('boolean',{default:false}),
			isModel:Lyte.attr('boolean',{default:false}),
			isBooking:Lyte.attr('boolean',{default:false}),
			isOwnedCars:Lyte.attr('boolean',{default:false}),
			isAppAdminPanel:Lyte.attr('boolean',{default:false}),
			fields:Lyte.attr('array'),
			userData: Lyte.attr("object"),
			isOnly:Lyte.attr('boolean',{default:false}),
			companyId:Lyte.attr('string'),
			showroomId:Lyte.attr('string')
		}		

	},
	init:function(){

		let self=this;

		let currentRoute=Lyte.Router.getRouteInstance().routeName;

		

		let data=store.peekAll('users')[0];
		self.setData('userData',data);

		if(currentRoute==='showrooms'){
			self.setData('notFound','No Showrooms currently available'
			);
			self.setData('name','SHOWROOM'
			);
			self.setData('isShowroom',true
			);
			let companyId = self.data.companyId;
			self.executeMethod("fetchShowroomDetails",companyId);

		}
		else if(currentRoute==='companies'){
			self.setData('notFound','No Companies currently available'
			);
			self.setData('name','COMPANY'
			);
			self.setData('isCompany',true
			);
		    self.executeMethod("fetchCompanyDetails");
		}
		else if(currentRoute==='models'){
			self.setData('notFound','No Models currently available'
			);
			self.setData('name','MODELS'
			);
			self.setData('isModel',true
			);
			let companyId = self.data.companyId;
			let showroomId = self.data.showroomId;
			self.setData('companyId',companyId);
			self.setData('showroomId',showroomId);
			self.executeMethod("fetchModelDetails",companyId,showroomId);
		}
		else if(currentRoute==='user-bookings'){
			self.setData('notFound','No Bookings made yet'
			);
			self.setData('name','BOOKINGS'
			);
			self.setData('isBooking',true
			);
			self.setData('isOnly',true
			);
			self.executeMethod("fetchBookingDetails");
		}
		else if(currentRoute==='user-cars'){
			self.setData('notFound','No Cars buyed yet'
			);
			self.setData('name','CARS'
			);
			self.setData('isOwnedCars',true
			);
			self.setData('isOnly',true
			);
			self.executeMethod("fetchCarDetails");
		}
		else if(currentRoute==='app-admin-panel'){
			self.setData('notFound','No Companies currently available'
			);
			self.setData('name','COMPANIES'
			);
			self.setData('isCompany',true
			);
			self.setData('isAppAdminPanel',true
			);
			self.setData('isOnly',true
			);
			self.executeMethod("fetchCompanyDetails",true);
		}



	},
	actions : {
		goBackToHome:function(){
			Lyte.Router.transitionTo('tab.home');
		},
		goBackToShowrooms:function(){
			Lyte.Router.transitionTo('tab.companies.showrooms',this.getData('companyId'));
		},
		goBackToCompanies:function(){
			Lyte.Router.transitionTo('tab.companies');
		},
		redirectToShowrooms:function(companyId) {
			Lyte.Router.transitionTo('tab.companies.showrooms',companyId);
		},
		redirectToModels: function (companyId, showroomId) {
			Lyte.Router.transitionTo('tab.companies.showrooms.models', companyId, showroomId);
		},
		syncCompanies(){
			store.unloadAll('companies');
			this.executeMethod('fetchCompanyDetails');
		},
		syncShowrooms(){
			store.unloadAll('showrooms');
			this.executeMethod('fetchShowroomDetails');
		},
		syncModels(){
			store.unloadAll('models');
			this.executeMethod('fetchModelDetails');
		},
		bookDelivery: function (companyId,showroomId,modelId, modelPrice) {
			let bookingData = {
				status: '0',
				bookingType: '0',
				price: modelPrice
			}
			let record = store.createRecord('bookings', bookingData);
			record.$.save(
				{
					companyId: companyId,
					showroomId: showroomId,
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
		fetchCompanyDetails(isAppAdminPanel = false) {
			let self = this;
			store.findAll("companies")
				.then(function(response) {
					//if (!self || !self.$node) {
					//	return;
					//}
					if (isAppAdminPanel) {
						self.setData("fields", response);
					}
					else {
						response = response.filter(company => company.isActive === true);
						self.setData("fields", response);
					}
				}).catch(function(error) {
					alert('failed');
				});
		},
		fetchShowroomDetails(companyId) {
			let self = this;
			if(!companyId){
				return;
			}
			
			store.findAll("showrooms", {is_active:true}, false, true, { companyId: companyId })
				.then(function (response) {
					if (response.length === 0) {
						self.setData('isNotFound', true);
					}
					self.setData("fields", response);
				}).catch(function (error) {
					if (error.status === 404) {
						alert('Not Found');
					}
				});
		},
		fetchModelDetails(companyId,showroomId) {
			let self = this;
			if(!companyId||!showroomId){
				return;
			}
			 store.findAll("cars",{is_available:true},false,true,
				{ 
					resource:'carModels',
			      companyId:companyId,
				  showroomId:showroomId
			})
				.then(function(response) {
					if (response.length === 0) {
						self.setData('isNotFound', true);
					}
					self.setData("fields", response);
				}).catch(function(error) {
					alert('failed');
				});
		},
		fetchBookingDetails() {
			let self = this;
			 store.findAll("bookings",{},true,true)
				.then(function(response) {
					
					if (response.length === 0) {
						self.setData('isNotFound', true);
					}
					self.setData("fields", response);
					
				}).catch(function(error) {
					alert('Error ',error);
					 
				});
		},
		fetchCarDetails() {
			let self = this;
			store.findAll("cars",{},true,true,{})
			.then(function(response) {
				if (response.length === 0) {
					self.setData('isNotFound', true);
				}
				self.setData("fields", response);
				
			}).catch(function(error) {
				alert('Error ',error);
				 
			});
		},
		
	}
});
