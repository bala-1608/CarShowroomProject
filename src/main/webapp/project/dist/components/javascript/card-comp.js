Lyte.Component.register("card-comp", {
_template:"<template tag-name=\"card-comp\"> <div class=\"top-section\"> <template is=\"if\" value=\"{{isOnly}}\"><template case=\"true\"> <h3>{{name}} DETAILS</h3> </template><template case=\"false\"> <template is=\"if\" value=\"{{isCompany}}\"><template case=\"true\"><lyte-button class=\"back-btn\" __click=\"{{action('goBackToHome')}}\"> <span class=\"material-symbols-outlined\">arrow_back_ios</span> <span class=\"back-text\">Back</span> </lyte-button></template></template> <template is=\"if\" value=\"{{isShowroom}}\"><template case=\"true\"><lyte-button class=\"back-btn\" __click=\"{{action('goBackToCompanies')}}\"> <span class=\"material-symbols-outlined\">arrow_back_ios </span> <span class=\"back-text\">Back</span> </lyte-button></template></template> <template is=\"if\" value=\"{{isModel}}\"><template case=\"true\"><lyte-button class=\"back-btn\" __click=\"{{action('goBackToShowrooms')}}\"> <span class=\"material-symbols-outlined\">arrow_back_ios</span> <span class=\"back-text\">Back</span> </lyte-button></template></template> <h3 class=\"page-text\">{{name}} DETAILS</h3> <template is=\"if\" value=\"{{isCompany}}\"><template case=\"true\"><lyte-button lt-prop-label=\"Sync\" class=\"sync-btn\" __click=\"{{action('syncCompanies')}}\"> <span class=\"material-symbols-outlined\">refresh</span> <span>Sync</span> </lyte-button></template></template> <template is=\"if\" value=\"{{isShowroom}}\"><template case=\"true\"><lyte-button lt-prop-label=\"Sync\" class=\"sync-btn\" __click=\"{{action('syncShowrooms')}}\"> <span class=\"material-symbols-outlined\">refresh</span> <span>Sync</span> </lyte-button></template></template> <template is=\"if\" value=\"{{isModel}}\"><template case=\"true\"><lyte-button lt-prop-label=\"Sync\" class=\"sync-btn\" __click=\"{{action('syncModels')}}\"> <span class=\"material-symbols-outlined\">refresh</span> <span>Sync</span> </lyte-button></template></template> </template></template> </div> <template is=\"if\" value=\"{{isNotFound}}\"><template case=\"true\"><div class=\"not-found\"> <div class=\"not-content\"> {{notFound}} </div> </div></template><template case=\"false\"><div> <table class=\"company-table\"> <thead> <tr is=\"if\" lyte-if=\"true\" value=\"{{isCompany}}\"></tr> <tr is=\"if\" lyte-if=\"true\" value=\"{{isShowroom}}\"></tr> <tr is=\"if\" lyte-if=\"true\" value=\"{{isModel}}\"></tr> <tr is=\"if\" lyte-if=\"true\" value=\"{{isBooking}}\"></tr> <tr is=\"if\" lyte-if=\"true\" value=\"{{isOwnedCars}}\"></tr> </thead> <tbody is=\"for\" lyte-for=\"true\" items=\"{{fields}}\" item=\"field\" index=\"index\" depth=\"1\"></tbody> </table> </div></template></template> </template>\n<style>\n/* .details {\n    position: relative;\n    top: 100px;\n    left: 250px;\n    font-size: 32px;\n    font-weight: bold;\n    color: #1d2939;\n    text-transform: uppercase;\n    letter-spacing: 1px;\n    z-index: -1;\n    width: 30%;\n} */\n\n\n.company-table {\n    margin-left: 250px;\n    margin-top: 130px;\n    width: 80%;\n    border-collapse: collapse;\n    font-size: 16px;\n    text-align: center;\n    border-radius: 2px;\n    overflow: hidden;\n    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);\n}\n\n.company-table th, \n.company-table td {\n    border: 1px solid #ddd;\n    color: #1d2939;\n    padding: 12px;\n    height: 75px;\n    transition: background-color 0.3s ease-in-out;\n}\n\n.company-table th {\n    background-color: #f4f4f4;\n    color: #1d2939;\n    font-weight: bold;\n    text-transform: uppercase;\n    letter-spacing: 1px;\n}\n\n.company-table tr:nth-child(even) {\n    background-color: #f9f9f9;\n}\n\n.company-table tr:hover {\n    background-color: #eaeaea;\n    cursor: pointer;\n}\n\nbutton,lyte-button  {\n    padding: 10px 16px;\n    font-size: 14px;\n    border-radius: 6px;\n    cursor: pointer;\n    transition: all 0.3s ease-in-out;\n    border: 1px solid transparent;\n    font-weight: bold;\n}\n\n.company-update-btn {\n    background-color: #ffffff;\n    color: #4CAF50;\n    border: 1px solid #4CAF50;\n    margin-left: 50px;\n}\n\n.company-update-btn:hover {\n    background-color: #4CAF50;\n    color: #ffffff;\n}\n\n.company-deactivate-btn {\n    background-color: #ffffff;\n    color: #f39c12;\n    border: 1px solid #f39c12;\n}\n\n.company-deactivate-btn:hover {\n    background-color: #f39c12;\n    color: white;\n}\n\n\n.company-activate-btn {\n    background-color: white;\n    color: #3498db;\n    border: 1px solid #3498db;\n}\n\n.view-showroom-btn{\n\n    border: solid 1px #1d2939;\n    color:#1d2939;\n}\n.view-showroom-btn:hover{\n    background-color: #1d2939;\n    color: white;\n}\n.company-activate-btn:hover {\n    background-color: #3498db;\n    color: white;\n}\n\n\n.company-delete-btn {\n    background-color: #ffffff;\n    color: #e74c3c;\n    border: 1px solid #e74c3c;\n}\n\n.company-delete-btn:hover {\n    background-color: #e74c3c;\n    color: white;\n}\n\n\n.admin-actions {\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center;\n    padding: 10px 0;\n}\n\n.not-found {\n    background-color: #EEEEEE;\n    width: 30%;\n    height: 250px;\n    margin-left: 500px;\n    margin-top: 200px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    color: black;\n    font-weight: bold;\n    font-size: 20px;\n    border-radius: 12px;\n    border: solid 1px #ddd;\n    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);\n}\n.top-section{\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    position: relative;\n    top: 100px;\n    margin-left: 250px;\n    font-size: 32px;\n    font-weight: bold;\n    color: #1d2939;\n    text-transform: uppercase;\n    letter-spacing: 1px;\n}\n.back-btn ,.sync-btn{\n    background-color: transparent;\n    color: #1d2939; \n    border: 1px solid #1d2939;\n    border-radius: 50px;\n    padding: 5px 16px;\n    font-size: 15px;\n    font-weight: 500;\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    cursor: pointer;\n    transition: all 0.3s ease;\n    margin-right: 50px;\n  \n  }\n  \n  .back-btn:hover,.sync-btn:hover {\n    background:  #1d2939;\n    color: white;\n  }\n  .page-text{\n    margin-right:10px;\n   }\n  \n  .back-text {\n    display: inline-block;\n  }\n </style>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"if","position":[5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"text","position":[7,0]},{"type":"attr","position":[9]},{"type":"if","position":[9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[11]},{"type":"if","position":[11],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[13]},{"type":"if","position":[13],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0,1,1,1]},{"type":"if","position":[0,1,1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{isCompany}}\"><template case=\"true\" depth=\"2\"><table><tbody><tr> <th>COMPANY NAME</th> <th>STARTED YEAR</th> <th>ADMIN NAME</th> <th>ACTIONS</th> </tr></tbody></table></template></template>"},{"type":"attr","position":[0,1,1,3]},{"type":"if","position":[0,1,1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{isShowroom}}\"><template case=\"true\" depth=\"2\"><table><tbody><tr> <th>SHOWROOM NAME</th> <th>COMPANY NAME</th> <th>MANAGER NAME</th> <th>ACTIONS</th> </tr></tbody></table></template></template>"},{"type":"attr","position":[0,1,1,5]},{"type":"if","position":[0,1,1,5],"cases":{"true":{"dynamicNodes":[]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{isModel}}\"><template case=\"true\" depth=\"2\"><table><tbody><tr> <th>COMPANY NAME</th> <th>MODEL NAME</th> <th>MODEL PRICE</th> <th>MODEL COLOR</th> <th>ACTIONS</th> </tr></tbody></table></template></template>"},{"type":"attr","position":[0,1,1,7]},{"type":"if","position":[0,1,1,7],"cases":{"true":{"dynamicNodes":[]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{isBooking}}\"><template case=\"true\" depth=\"2\"><table><tbody><tr> <th>COMPANY NAME</th> <th>SHOWROOM NAME</th> <th>MODEL NAME </th> <th>MODEL COLOR</th> <th>MODEL PRICE</th> <th>BOOKING TYPE</th> <th>STATUS</th> <th>BOOKING DATE</th> </tr></tbody></table></template></template>"},{"type":"attr","position":[0,1,1,9]},{"type":"if","position":[0,1,1,9],"cases":{"true":{"dynamicNodes":[]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{isOwnedCars}}\"><template case=\"true\" depth=\"2\"><table><tbody><tr> <th>COMPANY NAME</th> <th>SHOWROOM NAME</th> <th>MODEL NAME </th> <th>MODEL COLOR</th> <th>MODEL PRICE</th> <th>DELIVERED DATE</th> </tr></tbody></table></template></template>"},{"type":"attr","position":[0,1,3]},{"type":"for","position":[0,1,3],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]},{"type":"text","position":[0,5,0]},{"type":"attr","position":[0,7]},{"type":"if","position":[0,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[0,5]},{"type":"componentDynamic","position":[0,5]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{isAppAdminPanel}}\"><template case=\"true\" depth=\"3\"><table><tbody><tr><td class=\"admin-actions\"> <lyte-button class=\"company-update-btn\" __click=\"{{action('updateCompany',field.id,field.companyName,field.startedYear)}}\"> EDIT </lyte-button> <template is=\"if\" value=\"{{field.isActive}}\"><template case=\"true\"><lyte-button class=\"company-deactivate-btn\" __click=\"{{action('deactivateCompany',field.id)}}\"> DEACTIVATE </lyte-button></template><template case=\"false\"><lyte-button class=\"company-activate-btn\" __click=\"{{action('activateCompany',field.id)}}\"> ACTIVATE </lyte-button></template></template> <lyte-button class=\"company-delete-btn\" __click=\"{{action('deleteCompany',field.id)}}\"> DELETE </lyte-button> </td></tr></tbody></table></template><template case=\"false\" depth=\"3\"><table><tbody><tr><td class=\"admin-actions\"> <lyte-button class=\"view-showroom-btn\" __click=\"{{action('redirectToShowrooms',field.id)}}\"> View Showrooms </lyte-button> </td></tr></tbody></table></template></template>"}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{isCompany}}\"><template case=\"true\" depth=\"2\"><table><tbody><tr> <td>{{field.companyName}}</td> <td>{{field.startedYear}}</td> <td>{{field.user.userName}}</td> <td is=\"if\" lyte-if=\"true\" value=\"{{isAppAdminPanel}}\"></td> </tr></tbody></table></template></template>"},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]},{"type":"text","position":[0,5,0]},{"type":"attr","position":[0,7,1]},{"type":"componentDynamic","position":[0,7,1]}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{isShowroom}}\"><template case=\"true\" depth=\"2\"><table><tbody><tr> <td>{{field.showroomName}}</td> <td>{{field.company.companyName}}</td> <td>{{field.user.userName}}</td> <td class=\"admin-actions\"> <lyte-button class=\"view-showroom-btn\" __click=\"{{action('redirectToModels',field.company.id,field.id)}}\"> View Models </lyte-button> </td> </tr></tbody></table></template></template>"},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]},{"type":"text","position":[0,5,0]},{"type":"text","position":[0,7,0]},{"type":"attr","position":[0,9,1]},{"type":"componentDynamic","position":[0,9,1]}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{isModel}}\"><template case=\"true\" depth=\"2\"><table><tbody><tr> <td>{{field.showroom.company.companyName}}</td> <td>{{field.modelName}}</td> <td>{{field.price}}</td> <td>{{field.color}}</td> <td class=\"admin-actions\"> <lyte-button class=\"view-showroom-btn\" __click=\"{{action('bookDelivery',field.showroom.company.id,field.showroom.id,field.id,field.price)}}\"> BOOK </lyte-button> </td> </tr></tbody></table></template></template>"},{"type":"attr","position":[0,7]},{"type":"if","position":[0,7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]},{"type":"text","position":[0,5,0]},{"type":"text","position":[0,7,0]},{"type":"text","position":[0,9,0]},{"type":"text","position":[0,11,0]},{"type":"text","position":[0,13,0]},{"type":"text","position":[0,15,0]}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{isBooking}}\"><template case=\"true\" depth=\"2\"><table><tbody><tr> <td>{{field.showroom.company.companyName}}</td> <td>{{field.showroom.name}}</td> <td>{{field.model.modelName}}</td> <td>{{field.model.color}}</td> <td>{{field.model.price}}</td> <td>{{field.bookingType}}</td> <td>{{field.status}}</td> <td>{{field.requestDate}}</td> </tr></tbody></table></template></template>"},{"type":"attr","position":[0,9]},{"type":"if","position":[0,9],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]},{"type":"text","position":[0,5,0]},{"type":"text","position":[0,7,0]},{"type":"text","position":[0,9,0]},{"type":"text","position":[0,11,0]}]}},"default":{},"actualTemplate":"<template is=\"if\" value=\"{{isOwnedCars}}\"><template case=\"true\" depth=\"2\"><table><tbody><tr> <td>{{field.showroom.company.companyName}}</td> <td>{{field.showroom.name}}</td> <td>{{field.modelName}}</td> <td>{{field.color}}</td> <td>{{field.price}}</td> <td>{{field.completedAt}}</td> </tr></tbody></table></template></template>"}],"actualTemplate":"<template items=\"{{fields}}\" item=\"field\" index=\"index\" is=\"for\" depth=\"1\"><table><tbody> <tr is=\"if\" lyte-if=\"true\" value=\"{{isCompany}}\"></tr> <tr is=\"if\" lyte-if=\"true\" value=\"{{isShowroom}}\"></tr> <tr is=\"if\" lyte-if=\"true\" value=\"{{isModel}}\"></tr> <tr is=\"if\" lyte-if=\"true\" value=\"{{isBooking}}\"></tr> <tr is=\"if\" lyte-if=\"true\" value=\"{{isOwnedCars}}\"></tr> </tbody></table></template>","tagName":"TABLE"}]}},"default":{}}],
_observedAttributes :["isNotFound","notFound","name","isCompany","isShowroom","isModel","isBooking","isOwnedCars","isAppAdminPanel","fields","userData","isOnly","companyId","showroomId"],

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
