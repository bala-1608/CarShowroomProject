Lyte.Router.configureDefaults({
	baseURL: '/CarShowroom',
	history: "html5"
});

Lyte.Router.configureRoutes(function () {
	this.route("login",{path:"/"});
	this.route("register");

	this.route("tab", function () {
		this.route("companies", function () {
			this.route("showrooms",
				{ path: "/:company_id/showrooms" }
				, function () {
					this.route("models", { path: "/:showroom_id/models" });
				});
		});
		this.route("home", { path: "/" });
		this.route("app-admin-panel")
		this.route("manager-panel")
		this.route("user-cars")
		this.route("user-bookings")
	});
	this.route("error-page", { path: "/*" });

});


Lyte.Router.beforeRouteTransition = function () {

}

Lyte.Router.afterRouteTransition = function () {

}


Lyte.Router.registerRoute("error-page",{

beforeModel  : function (paramsObject ){ 
    
},
renderTemplate  : function (model, paramsObject ){ 
        return{
                outlet:"#content",
                component:"error-comp"
        }
},
});

Lyte.Router.registerRoute("login",{

beforeModel  : function (paramsObject ){
    let value =  document.cookie;
	let index = value.indexOf("=");
	let sessionId=value.substring(index+1,value.length);
	if(sessionId){
		this.transitionTo("tab.home");
	}
},
model  : function (paramsObject ){ 
    
},
renderTemplate  : function (model, paramsObject ){ 
    return {outlet : '#outlet', component:'login-comp'}
}
});

Lyte.Router.registerRoute("register",{

beforeModel  : function (paramsObject ){
    let value =  document.cookie;
	let index = value.indexOf("=");
	let sessionId=value.substring(index+1,value.length);
	if(sessionId){
		this.transitionTo("tab.home");
	}
},
renderTemplate  : function (model, paramsObject ){ 
    return {outlet : '#outlet', component:'register-comp'}
},
});

Lyte.Router.registerRoute("tab", {
	beforeModel: function (paramsObject) {
		let value =  document.cookie;
			let index = value.indexOf("=");
			let sessionId=value.substring(index+1,value.length);
			if(!sessionId){
				this.transitionTo("login");
			}

	},
	model: function (paramsObject) {
		let data = store.peekAll("users")[0];
		if (!data) {
			return store.findAll("users",{},true,true)
			.then(function (response) {
				return response;
			}, function (response) {
				if (response.status === 401) {
					document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
					Lyte.Router.transitionTo('login');
				}
				return [];

			});
		}
	},
	renderTemplate: function (model, paramsObject) {
		return {
			outlet: "#outlet",
			component: "tab-comp",
			model: model
		}
	}
});
Lyte.Router.registerRoute("tab.app-admin-panel",{
renderTemplate:function(model, paramsObject){
    return {
        outlet:"#content",
        component: "card-comp",
    }
}
});

Lyte.Router.registerRoute("tab.companies", {
   
    beforeModel: function (paramsObject) {
        
    },
    model  : function (paramsObject ){ 
       

            
    },
    redirect:function(){
		let prevTrans=Lyte.Router.getRouteInstance().transition._processed.prevTrans;
		let currentRoute=Lyte.Router.getRouteInstance().routeName;
		
		if(prevTrans&&prevTrans.target&&(prevTrans.target==='tab.companies.showrooms'||prevTrans.target==='tab.companies.showrooms.models')&&currentRoute==="companies"){
			
			Lyte.Router.getRouteInstance().refresh();
		}
	},
    renderTemplate: function (model, paramsObject) {
        return {
            outlet: "#content",
            component: "card-comp"
        }
    },
    
});

Lyte.Router.registerRoute("tab.manager-panel",{
    renderTemplate: function (model, paramsObject) {
        return {
            outlet: "#content",
            component: "manager-panel"
        }
    },
});

Lyte.Router.registerRoute("tab.home", {
        
        renderTemplate: function (model, paramsObject) {
                return {
                        outlet: "#content", component: "welcome-comp"
                }
        },
});

Lyte.Router.registerRoute("tab.user-bookings",{
    renderTemplate: function (model, paramsObject) {
        return {
            outlet: "#content",
            component: "card-comp",
        }
    },
});

Lyte.Router.registerRoute("tab.user-cars",{
    renderTemplate: function (model, paramsObject) {
        return {
            outlet: "#content",
            component: "card-comp"
        }
    },
});

Lyte.Router.registerRoute("tab.companies.showrooms", {

    beforeModel: function () {
        
    },
    model: function (params) {
        return {
            companyId: params.dynamicParam
        }
    },
    redirect:function(){
		let prevTrans=Lyte.Router.getRouteInstance().transition._processed.prevTrans;
			let currentRoute=Lyte.Router.getRouteInstance().routeName;
			
			if(prevTrans&&prevTrans.target&&prevTrans.target==="tab.companies.showrooms.models"&&currentRoute==='showrooms'){
				  Lyte.Router.getRouteInstance().refresh();
			}
		
	},

    renderTemplate: function (model, paramsObject) {
        return {
            outlet: "#content",
            component: "card-comp",
            model: model
        }
    },
});

Lyte.Router.registerRoute("tab.companies.showrooms.models",{

model: function (params) {
	let companyId = this.parent.getDynamicParam();

	return {
		showroomId:params.dynamicParam,
		companyId:companyId
	}
},
renderTemplate  : function (model, paramsObject ){ 
	return {
	            outlet: "#content",
				component:"card-comp",
				model:model
	        }
 },
});

Lyte.Component.register("app-admin-panel", {
_template:"<template tag-name=\"app-admin-panel\"> <template is=\"if\" value=\"{{isNotFound}}\"><template case=\"true\"><div class=\"not-found\"> <div class=\"not-content\"> No Companies Currently available </div> </div></template><template case=\"false\"><div> <h3 class=\"details\">COMPANY DETAILS</h3> <card-comp> <template is=\"yield\" yield-name=\"content\"> <table class=\"company-table\"> <thead> <tr> <th>COMPANY NAME</th> <th>STARTED YEAR</th> <th>ADMIN NAME</th> <th>ACTIONS</th> </tr> </thead> <tbody is=\"for\" lyte-for=\"true\" items=\"{{companies}}\" item=\"company\" index=\"index\" depth=\"1\"></tbody> </table> </template> </card-comp> </div></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"registerYield","position":[0,3,1],"dynamicNodes":[{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"text","position":[0,1,1,0]},{"type":"text","position":[0,1,3,0]},{"type":"text","position":[0,1,5,0]},{"type":"attr","position":[0,1,7,1]},{"type":"componentDynamic","position":[0,1,7,1]},{"type":"attr","position":[0,1,7,3]},{"type":"if","position":[0,1,7,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[0,1,7,5]},{"type":"componentDynamic","position":[0,1,7,5]}],"actualTemplate":"<template items=\"{{companies}}\" item=\"company\" index=\"index\" is=\"for\" depth=\"1\"><table><tbody> <tr> <td>{{company.companyName}}</td> <td>{{company.startedYear}}</td> <td>{{company.user.userName}}</td> <td class=\"admin-actions\"> <lyte-button class=\"company-update-btn\" __click=\"{{action('updateCompany',company.id,company.companyName,company.startedYear)}}\"> EDIT </lyte-button> <template is=\"if\" value=\"{{company.isActive}}\"><template case=\"true\"><lyte-button class=\"company-deactivate-btn\" __click=\"{{action('deactivateCompany',company.id)}}\"> DEACTIVATE </lyte-button></template><template case=\"false\"><lyte-button class=\"company-activate-btn\" __click=\"{{action('activateCompany',company.id)}}\"> ACTIVATE </lyte-button></template></template> <lyte-button class=\"company-delete-btn\" __click=\"{{action('deleteCompany',company.id)}}\"> DELETE </lyte-button> </td> </tr> </tbody></table></template>","tagName":"TABLE"}]},{"type":"componentDynamic","position":[0,3]}]}},"default":{}}],
_observedAttributes :["companies","isNotFound"],

	data : function(){
		return {
			companies: Lyte.attr("array"),
			isNotFound: Lyte.attr("boolean", { default: false })
		}		
	},init: function () {
		let self=this;
		self.executeMethod("fetchCompanyDetails");
	},
	actions : {
		updateCompany:function(companyId,companyName,startedYear){
			
		},
		deactivateCompany:function(companyId){
			console.log(companyId);
		},
		activateCompany:function(companyId){
			let self=this;
			let companies=self.getData('companies');
				console.log(companies);
			store.update("companies")
			  .then(function(response) {
				
				// companies.forEach(company => {
				// 	if (company.get('companyId') === companyId) {
				// 		company.set('is_active', true);  
				// 	}
				// });
				// self.setData('companies',companies);
				
			}).catch(function(error) {
				alert('failed');
			});
		},
		deleteCompany:function(companyId){
			console.log(companyId);
		}
	},
	methods : {
		fetchCompanyDetails() {
			let self = this;
			store.findAll("companies")
				.then(function(response) {
					self.setData("companies", response);
				}).catch(function(error) {
					alert('failed');
				});
		},
	}
});

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

Lyte.Component.register("error-comp", {
_template:"<template tag-name=\"error-comp\"> <div class=\"error-body\"> <div class=\"error-container\"> <div class=\"error-code\">404</div> <div class=\"error-message\">Oops! Page not found.</div> <link-to lt-prop-route=\"tab.home\" class=\"home-link\">Go to Home</link-to> </div> </div> </template>\n<style>body {\n    margin: 0;\n    padding: 0;\n    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n  }\n.error-body{\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n    background-color: #f2f2f2;\n    color: #333;\n}\n  .error-container {\n    text-align: center;\n    padding: 40px;\n    background-color: #fff;\n    box-shadow: 0 4px 10px rgba(0,0,0,0.1);\n    border-radius: 8px;\n  }\n\n  .error-code {\n    font-size: 96px;\n    font-weight: bold;\n    color: #e74c3c;\n  }\n\n  .error-message {\n    font-size: 24px;\n    margin-top: 10px;\n  }\n\n  .home-link,.home-link a{\n    margin-top: 20px;\n    display: inline-block;\n    padding: 10px 20px;\n    background-color: #3498db;\n    color: #fff;\n    text-decoration: none;\n    border-radius: 5px;\n    transition: background-color 0.3s ease;\n  }\n  .home-link a{\n    padding: 0px;\n    margin-top: 0px;\n  }\n  .home-link:hover {\n    background-color: #2980b9;\n  }</style>",
_dynamicNodes : [{"type":"componentDynamic","position":[1,1,5]}],

	data : function(){
		return {

		}		
	},
	actions : {
		// Functions for event handling
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});

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

Lyte.Component.register("login-comp", {
_template:"<template tag-name=\"login-comp\"> <div class=\"container type2\"> <div class=\"box\"> <div class=\"left-section\"></div> <div class=\"right-section\"> <div class=\"in-box\"> <div class=\"authentication-form\"> <div class=\"login-form\"> <h2>Login into Your Account</h2> <div class=\"input-group\"> <lyte-input lt-prop-id=\"email\" lt-prop-type=\"text\" class=\"input-field\" lt-prop-placeholder=\"Email\" lt-prop-value=\"{{lbind(email)}}\"></lyte-input> <template is=\"if\" value=\"{{emailError}}\"><template case=\"true\"><div class=\"error\"> {{emailError}}</div></template></template> </div> <div class=\"input-group\"> <lyte-input lt-prop-id=\"password\" lt-prop-type=\"password\" class=\"input-field\" lt-prop-maxlength=\"8\" lt-prop-password-icon=\"true\" lt-prop-placeholder=\"Password\" lt-prop-value=\"{{lbind(password)}}\"></lyte-input> <template is=\"if\" value=\"{{passwordError}}\"><template case=\"true\"><div class=\"error\"> {{passwordError}} </div></template></template> </div> <lyte-button class=\"btn\" __click=\"{{action('newLogin')}}\">Sign In</lyte-button> <p class=\"link-text\"> Don't have an account? <a href=\"register\">Sign up</a> </p> </div> </div> </div> </div> </div> </div> </template>\n<style>\n* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n    font-family: 'Poppins', sans-serif;\n}\n.container {\n    height: 100vh;\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background: gainsboro;\n}\n.box {\n    display: flex;\n    flex-direction: row;\n    width: 75%;\n    height: 80vh;\n    border-radius: 20px;\n    overflow: hidden;\n    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);\n    background: gainsboro;\n    box-shadow:\n\t\t  2.8px 2.8px 8px rgba(0, 0, 0, 0.02),\n\t\t  6.7px 6.7px 19.2px rgba(0, 0, 0, 0.028),\n\t\t  12.5px 12.5px 36.2px rgba(0, 0, 0, 0.035),\n\t\t  22.3px 22.3px 64.6px rgba(0, 0, 0, 0.042),\n\t\t  41.8px 41.8px 120.7px rgba(0, 0, 0, 0.05),\n\t\t  100px 100px 289px rgba(0, 0, 0, 0.07); \n}\n.left-section {\n    flex: 1.2;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background:white;\n}\n.left-section img {\n    width: 100%;\n    height: 100%;\n    box-shadow:\n\t\t  2.8px 2.8px 8px rgba(0, 0, 0, 0.02),\n\t\t  6.7px 6.7px 19.2px rgba(0, 0, 0, 0.028),\n\t\t  12.5px 12.5px 36.2px rgba(0, 0, 0, 0.035),\n\t\t  22.3px 22.3px 64.6px rgba(0, 0, 0, 0.042),\n\t\t  41.8px 41.8px 120.7px rgba(0, 0, 0, 0.05),\n\t\t  100px 100px 289px rgba(0, 0, 0, 0.07); \n\n}\n.right-section {\n    flex: 1;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: white;\n    padding: 40px;\n    background: #141e30;\n}\n\n.in-box{\n    width: 100%;\n    height: 100%;\n    border-radius: 20px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: rgba(255, 255, 255, 0.1);\n}\n.authentication-form {\n    width: 80%;\n    height: 100%;\n    text-align: center;\n    \n}\n.authentication-form h2 {\n    font-size: 24px;\n    margin-bottom: 20px;\n    margin-top: 15px;\n}\n.login-form{\n  margin-top: 40%;\n}\n.login-form h2{\n    margin-bottom: 40px;\n    color: #ff7eb3;\n    font-weight: 300;\n}\n.register-form{\n  height: 100%;\n}\n.input-group {\n    width: 100%;\n    \n}\n.register-input-field{\n  width: 70%;\n  padding: 8px;\n  border: none;\n  border-radius: 20px;\n  font-size: 14px;\n  margin-bottom: 12px;\n  background: rgba(255, 255, 255, 0.2);\n  color: white;\n  outline: none;\n  transition:  width 0.2s ease,heigth 0.2s ease;\n  z-index: 1000;\n}\n.register-input-field input,.input-field input{\n background: transparent ;\n padding: 0%;\n color: #f3f3f3;\n box-sizing: content-box;\n \n}\nlyte-button button{\n    padding: 0%;\n}\n.input-field {\n    width: 70%;\n    padding: 12px;\n    border: none;\n    border-radius: 20px;\n    font-size: 16px;\n    margin-bottom: 15px;\n    background: rgba(255, 255, 255, 0.2);\n    color: white; \n    outline: none;\n    transition:  width 0.2s ease,heigth 0.2s ease;\n    z-index: 1000;\n}\n.input-field{\n    margin-bottom: 15px;\n}\n.input-field:hover {\n    background: rgba(255, 255, 255, 0.3);\n    width: 75%;\n    height: 100%;\n    transform: scale(1.02);\n}\n.input-field::placeholder,.register-input-field::placeholder {\n    color: rgba(255, 255, 255, 0.7);\n\n}\n.btn {\n    width: 70%;\n    margin-top: 15px;\n    padding: 12px;\n    background: #ff7eb3;\n    border: none;\n    border-radius: 20px;\n    font-size: 16px;\n    color: white;\n    cursor: pointer;\n    transition: width 0.2s ease,height 0.2s ease;\n}\n.btn:hover {\n    background: #ff4d8c;\n    width:75%;\n    transform: scale(1.02);\n}\n.link-text {\n    margin-top: 25px;\n    font-size: 14px;\n    margin-bottom: 20px;\n\n}\n.forgot{\n    margin-left: 210px;\n    color: rgba(255, 255, 255, 0.7);\n    text-decoration: underline;\n    color: #ff4d8c;\n    \n}\n.forgot:hover{\n    color: white;\n    text-decoration: none;\n}\n.link-text a {\n    color: #ff7eb3;\n    text-decoration: none;\n}\n.link-text a:hover {\n    color: #ff4d8c;\n}\n \n.error {\n    margin-top: -8px; \n    margin-left: 80px;\n    padding: 0;\n    text-align: left;\n    color: red;\n    font-size: 14px;\n}\n\n  .container {\n    width: 100%;\n  }\n\n  \n  \n  \n  .user-list-container {\n    width: 80%;\n    margin: 20px auto;\n    background: white;\n    padding: 20px;\n    border-radius: 10px;\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n  }\n  \n  \n  .delete-btn {\n    background: #e63946;\n    border: none;\n    padding: 5px 10px;\n    border-radius: 5px;\n    color: white;\n    cursor: pointer;\n  }\n  \n  .contact-info {\n    position: fixed;\n    bottom: 10px;\n    right: 10px;\n    background: navy;\n    color: white;\n    padding: 15px;\n    border-radius: 10px;\n  }\n  .admin-panel {\n    font-family: Arial, sans-serif;\n  }\n  \n \n  \n  .logo {\n    font-size: 30px;\n    font-weight: bold;\n  }\n  \n  .logo i {\n    margin-right: 8px;\n    color: blue;\n  }\n  \n  .actions button {\n    margin-left: 10px;\n    padding: 8px 12px;\n    border: none;\n    border-radius: 5px;\n    cursor: pointer;\n  }\n  \n  .btn-create {\n    background: blue;\n    color: white;\n  }\n  \n  .btn-profile {\n    background: #f3f3f3;\n    color: black;\n  }\n  \n  .register-input-field._popup{\n    width: 100%;\n    background-color: #141e30;\n  }\n  .buttons {\n    display: flex;\n    flex-direction: row;\n  }\n  \n  .btn {\n    padding: 10px 10px;\n    margin: 5px;\n    border: none;\n    border-radius: 20px;\n    cursor: pointer;\n  }\n  \n\n\n  </style>",
_dynamicNodes : [{"type":"attr","position":[1,1,3,1,1,1,3,1]},{"type":"componentDynamic","position":[1,1,3,1,1,1,3,1]},{"type":"attr","position":[1,1,3,1,1,1,3,3]},{"type":"if","position":[1,1,3,1,1,1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,1,3,1,1,1,5,1]},{"type":"componentDynamic","position":[1,1,3,1,1,1,5,1]},{"type":"attr","position":[1,1,3,1,1,1,5,3]},{"type":"if","position":[1,1,3,1,1,1,5,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1]}]}},"default":{}},{"type":"attr","position":[1,1,3,1,1,1,7]},{"type":"componentDynamic","position":[1,1,3,1,1,1,7]}],
_observedAttributes :["emailError","passwordError","email","password"],

	data: function () {
		return {
			emailError: Lyte.attr("string", { default: "" }),
			passwordError: Lyte.attr("string", { default: "" }),
			email: Lyte.attr("string", { default: "" }),
			password: Lyte.attr("string", { default: "" }),

		}
	},
	init : function(){
		
		
	  },
	actions: {

		newLogin: function () {
			let loginData = {
				email: this.getData('email'),
				password: this.getData('password')
			}
			var record = store.createRecord("users",loginData);
			record.$.save()
				.then(function (data) {
					alert('login Successfully');
					Lyte.Router.replaceWith('tab.home'); 
				}, function () {
					alert('Failed');
				});
				this.setData("email", "");
				this.setData("password", "");
		}
	},
	methods: {
		
	}
});

Lyte.Component.register("nav-bar", {
_template:"<template tag-name=\"nav-bar\"> <div class=\"navbar\"> <div class=\"profile-div\"> <button class=\"btn-profile\">B </button> </div> <div class=\"logo\"> CAR SHOWROOM </div> <div class=\"actions\"> <button class=\"logout-btn\" __click=\"{{action('logout')}}\">logout</button> </div> </div> </template>\n<style>\n.navbar {\n    position: fixed;\n    top:0px;\n    display: flex;\n    width: 100%;\n    justify-content: space-between;\n    align-items: center;\n    background-color: #f4f4f4; /* Dark blue-gray */\n    color: #1d2939;\n    padding: 10px 20px;\n    font-size: 18px;\n    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);\n    z-index: 1000;\n   \n  }\n  .btn-profile {\n    background: whitesmoke;\n    border: none;\n    color: #1d2939;\n    width: 50px;  \n    height: 50px;\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 18px; \n    font-weight: bold;\n    cursor: pointer;\n    border: solid 1px black !important;\n}\n\n\n.logout-btn {\n    background: white;\n    color: black;\n    margin-right: 30px;\n    cursor: pointer;\n    border: solid 1px black !important;\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n    transition: all 0.3s;\n    \n  } \n  .logout-btn:hover{\n    background: black;\n    color: white;\n  }\n  \n  .btn-profile:hover {\n    background-color: #2980b9;\n  }</style>",
_dynamicNodes : [{"type":"attr","position":[1,5,1]}],

	data : function(){
		return {

		}		
	},
	actions : {
		logout: function () {
			var record = store.peekAll("users")[0];
			record.$.destroyRecord().then(function () {
				Lyte.Router.transitionTo('login');
			}, function () {
				alert("logout failed");
			});
		}
	},
	methods : {
		// Functions which can be used as callback in the component.
	}
});

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

Lyte.Component.register("register-comp", {
_template:"<template tag-name=\"register-comp\"> <div class=\"container type2\"> <div class=\"box\"> <div class=\"left-section\"></div> <div class=\"right-section\"> <div class=\"in-box\"> <div class=\"authentication-form\"> <div class=\"register-form\"> <h2>Sign Up</h2> <template items=\"{{content}}\" item=\"field\" index=\"index\" is=\"for\"><div class=\"input-group\"> <lyte-input lt-prop-id=\"{{index}}\" lt-prop-type=\"{{field.type}}\" class=\"register-input-field\" lt-prop-placeholder=\"{{field.placeholder}}\" lt-prop-value=\"{{lbind(field.value)}}\"></lyte-input> <template is=\"if\" value=\"{{field.errorKey}}\"><template case=\"true\"><div class=\"error\">{{field.errorKey}}</div></template></template> </div></template> <lyte-button class=\"btn\" __click=\" {{action('register')}} \">Submit</lyte-button> <p class=\"link-text\"> Already have an account? <a href=\"login\">Sign in</a> </p> </div> </div> </div> </div> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1,3,1,1,1,3]},{"type":"for","position":[1,1,3,1,1,1,3],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"componentDynamic","position":[0,1]},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}}]},{"type":"attr","position":[1,1,3,1,1,1,5]},{"type":"componentDynamic","position":[1,1,3,1,1,1,5]}],
_observedAttributes :["content"],

	data: function () {
		return {
			    

			content: Lyte.attr("array",
				{default:
				[{ value: '', type: 'text', placeholder: 'Email', errorKey: '' },
				{ value: '', type: 'password', placeholder: 'Password', errorKey: '' },
				{ value: '', type: 'text', placeholder: 'Full value', errorKey: '' },
				{ value: '', type: 'text', placeholder: 'Phone Number', errorKey: '' },
				{ value: '', type: 'text', placeholder: 'Door No', errorKey: '' },
				{ value: '', type: 'text', placeholder: 'Street', errorKey: '' },
				{ value: '', type: 'text', placeholder: 'City', errorKey: '' },
				{ value: '', type: 'text', placeholder: 'Postal Code', errorKey: '' },
				],
			}),
				
		}
	},
	actions: {
		register:function(){
			let userData = {
				email: this.getData('content')[0].value,
				password: this.getData('content')[1].value,
				userName: this.getData('content')[2].value,
				phoneNo: +this.getData('content')[3].value,
				address: {
					street: this.getData('content')[5].value,
					city: this.getData('content')[6].value,
					postalCode: +this.getData('content')[7].value,
					doorNo: this.getData('content')[4].value,
				}
			};
				var record = store.createRecord("users",userData);
				record.$.save(
					{
						resource:true
					}
				)
					.then(function (data) {
						alert('register Successfully');
						store.unloadRecord("users",store.peekAll('users')[0].userId);
						store.unloadRecord("address",store.peekAll('address')[0].id);
						Lyte.Router.transitionTo('login'); 
					}, function () {
						alert('Failed');
					});
		}
	},
	methods: {
		
	}
});

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

Lyte.Component.register("side-bar", {
_template:"<template tag-name=\"side-bar\"> <div class=\"side-nav\"> <div class=\"nav-list\"> <template items=\"{{items}}\" item=\"item\" index=\"index\" is=\"for\"><lyte-nav-item class=\"nav-item\"> <link-to lt-prop-route=\"{{item.route}}\" class=\"nav-item-link\">{{item.label}}</link-to> </lyte-nav-item></template> </div> </div> </template>\n<style>\n.side-nav {\n    width: 200px;\n    height: 100vh;\n    background-color: #f4f4f4;\n    display: flex;\n    flex-direction: column;\n    padding: 10px 0;\n    color: #1d2939;\n    position: fixed;\n    left: 0;\n    top: 0;\n}\n\n\n.nav-list {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    margin-top: 70px;\n}\n\n\n/* .nav-item{\n\n    color: #1d2939;\n    display: block;\n    align-items: center;\n    font-size: 15px;\n    padding: 15px 20px;\n    font-weight: bold;\n    cursor: pointer;\n    transition: background 0.3s ease-in-out;\n\n} */\n\n \n.nav-item {\n    color: #1d2939;\n    display: block;\n    font-size: 15px;\n    padding: 0; \n    font-weight: bold;\n    cursor: pointer;\n    transition: background 0.3s ease-in-out;\n}\n\n.nav-item-link a {\n    display: block;\n    padding: 15px 20px; \n    width: 100%;\n    height: 100%;\n    color: #1d2939;\n    text-decoration: none;\n    box-sizing: border-box;\n}\n\n.nav-item-link a:hover {\n    background: #0e1726;\n    color: white;\n    transition: background 0.3s;\n}</style>",
_dynamicNodes : [{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"text","position":[0,1,0]},{"type":"componentDynamic","position":[0,1]},{"type":"componentDynamic","position":[0]}]}],
_observedAttributes :["items"],

	data : function(){
		return {
			items : Lyte.attr("array")
		}		
	},
	init:function(){
		let data=store.peekAll('users')[0];
		console.log(data.role);
		if(data.role==='app admin'){
			this.setData('items',[{label: 'home',route: 'tab.home'},
				{label:"View Companies",route:'tab.companies'},
				{label:"Manage Companies",route:'tab.app-admin-panel'},
				{ label: 'View Bookings', route: 'tab.user-bookings' },
				{ label: 'Owned Cars', route: 'tab.user-cars' }
			])
		}
		else if(data.role==='manager'){
			this.setData('items',[{label: 'home',route: 'tab.home'},
				{label:"View Companies",route:'tab.companies'},
				{label:`Manage Showroom`,route:'tab.manager-panel'},
				{ label: 'View Bookings', route: 'tab.user-bookings' },
				{ label: 'Owned Cars', route: 'tab.user-cars' },
			])
		}
		else if(data.role==='customer'){
			this.setData('items',[ { label: 'Home', route: 'tab.home' },
				{ label: 'View Companies', route: 'tab.companies' },
				{ label: 'View Bookings', route: 'tab.user-bookings' },
				{ label: 'Owned Cars', route: 'tab.user-cars' },
			])
		}
		


	},
	actions : {
		
	},
	methods : {
		
	}
});

Lyte.Component.register("tab-comp", {
_template:"<template tag-name=\"tab-comp\"> <nav-bar action=\" {{action('logout')}} \"></nav-bar> <side-bar></side-bar> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"componentDynamic","position":[3]}],
_observedAttributes :["users"],

	data : function(){
		return {
			users:Lyte.attr("object")
		}		
	},
	didConnect() {
		this.setData("users",this.data );
	  },
	actions : {
		
	},
	methods : {
		
	}
});

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

Lyte.Component.register("welcome-comp", {
_template:"<template tag-name=\"welcome-comp\"> <div class=\"home-container\"> <div class=\"welcome\"> WELCOME, {{userData.userName}}! </div> <div class=\"description\"> <p>You're at the right place to explore and own your dream car. Here's everything you can do on your dashboard:</p> <ul> <li> <strong>Browse Car Companies:</strong> Explore registered car companies and their details.</li> <li> <strong>Find Showrooms by Location:</strong> Filter showrooms near your area for easy access.</li> <li><strong>Explore Cars:</strong> View all available car models with detailed specifications and available colors.</li> <li> <strong>Book Your Dream Car:</strong> Confirm a booking for your selected model at your desired showroom.</li> <li> <strong>Track Booked Cars:</strong> Monitor your booking status until delivery is completed.</li> <li> <strong>View Owned Cars:</strong> Get details of cars you've purchased, including showroom and company info.</li> <li> <strong>Secure Session:</strong> Your session is protected with cookies for better experience and safety.</li> <li> <strong>Logout Anytime:</strong> Click the logout button when you're done exploring the automobile world.</li> </ul> <p>Happy driving!</p> </div> </div> </template>\n<style>.home-container{\n    margin-top: 8%;\n    margin-left: 20%;\n    text-align: start;\n    width :60%;\n    height:80vh;\n    border: solid 1px black;\n    border-radius: 15px;\n    box-shadow:  0px 4px 6px rgba(0, 0, 0, 0.1);\n    /* background-color: black; */\n    \n}\n.welcome{\n    margin-top: 30px;\n    margin-left: 40px;\n    font-size: 30px;\n    word-spacing:20px ;\n    font-weight: bold;\n    text-transform: capitalize;\n}\n.description{\n    margin-top: 10%;\n    margin-left: 100px;\n    width: 70%;\n    font-size:19px;\n    word-spacing: 15px;\n    height: 100%;\n    \n}</style>",
_dynamicNodes : [{"type":"text","position":[1,1,1]}],
_observedAttributes :["userData"],

	data: function () {
		return {
			userData:Lyte.attr('object')
		}
	},
	init: function () {
		data=store.peekAll('users')[0];
		this.setData('userData',data);
	},
	actions: {

	},
	methods: {
		
	}
});

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

store.registerModel("address",{
    id : Lyte.attr( "string",{primaryKey:true}),
  street : Lyte.attr( "string" ),
  doorNo : Lyte.attr( "string" ),
  city : Lyte.attr( "string" ),
  postalCode:Lyte.attr( "number" ,{ minimum : 6})
  
});

store.registerModel("bookings",{

    bookingId:Lyte.attr('string',{primaryKey : true}),
    bookingType:Lyte.attr('string'),
    status:Lyte.attr('string'),
    price:Lyte.attr('number'),
    requestDate:Lyte.attr('string'),
    showroom:Lyte.belongsTo('showrooms'),
    model:Lyte.belongsTo('cars'),
    
});

store.registerAdapter("bookings", {

  buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
    let basePath = 'http://localhost:8080/CarShowroom/api/v1';
    if (type === 'createRecord') {

      let companyId = customData.companyId;
      let showroomId = customData.showroomId;
      let modelId = customData.modelId;
      
      basePath = basePath+`/companies/${companyId}/showrooms/${showroomId}/models/${modelId}/bookings`;

    }

    else if (type === 'findAll') {
      let userId = store.peekAll('users')[0].userId;
      basePath =  basePath+`/users/${userId}/bookings`
    }

    return basePath;
  },

  headersForRequest: function () {
    return {
      "Content-Type": "application/json"
    };
  },

  parseResponse: function (type, modelName, xhrObj, payLoad) {
    if (xhrObj.status === 401) {
      Lyte.Router.transitionTo('login');
    }
    payLoad.status = xhrObj.status;
    return payLoad;
  }
});


store.registerSerializer("bookings", {
    serializeKey: function (modelName, type, customData, queryParams) {
        return "";
    },
    serialize: function (type, payLoad, records, customData, modelName, queryParams, gql) {
        if(type==='createRecord'){
            payLoad.booking_type = payLoad.bookingType;
            delete payLoad.bookingType;
        }
        return payLoad;
    },
    normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData, opts) {
        if (status == 204) {
			return {
				bookings: []
			}
		};
		payLoad = payLoad.data || [];
		payLoad = payLoad.map(item => ({
			bookingId: item.booking_id,
			price: item.price,
			status: item.status,
			bookingType: item.booking_type,

			showroom: {

				id: item.showroom_id,
				name: item.showroom_name,
				company: {
					id: item.company_id,
					companyName: item.company_name
				}
			},
			model: {
				id: item.model_id,
				modelName: item.model_name,
				color: item.color,
				price: item.price

			},
			requestDate: item.request_date
		}));

		if (type === 'createRecord') {
			return {
				bookings: payLoad[0],
				status: status
			}
		}
		return {
			bookings: payLoad
		}
	}
});

store.registerModel("companies",{

    id: Lyte.attr('string',{primaryKey:true}), 
    companyName: Lyte.attr('string'), 
    user:Lyte.belongsTo('users'),
    isActive: Lyte.attr('boolean'), 
    startedYear: Lyte.attr('string'),
    showrooms:Lyte.hasMany('showrooms')

});

store.registerSerializer("companies", {
    serializeKey : function( modelName , type , customData , queryParams ){
        return "";
    },
    serialize : function( type , payLoad , records , customData , modelName, queryParams , gql ){
		return payLoad;
	},
    normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData, opts) {
        payLoad = payLoad.data || [];
        let array = payLoad.map(item => ({
            id: item.brand_code,
            companyName: item.company_name,
            user:{
                userName:item.name,
				userId:item.admin_id,
                role:"admin"
            },
            isActive: item.is_active,
            startedYear: item.started_year
        }));
        return {
            companies: array
        }
    }
});

store.registerAdapter("companies", {
    namespace:"CarShowroom/api/v1",
    host:"http://localhost:8080",
	buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
    if(queryParams&&queryParams.is_active){
      queryParams.isActive=queryParams.is_active;
      delete queryParams.is_active;
    }
        return url;
      },
    
      headersForRequest: function () {
        return {
          "Content-Type": "application/json"
        };
      },
    
      parseResponse: function (type, modelName, xhrObj, payLoad) {
        // if(xhrObj.status===401){
        //   Lyte.Router.transitionTo('login');
        // }
        return payLoad;
      }
});


store.registerModel("cars",{
    
    id:Lyte.attr('string',{primaryKey : true}),
    carType:Lyte.attr('string'),
    showroom:Lyte.belongsTo('showrooms'),
    company:Lyte.belongsTo('companies'),
    modelId:Lyte.attr('string'),
    modelName:Lyte.attr("string"),
    isActive:Lyte.attr("boolean",{default:false}),
    price:Lyte.attr("number"),
    color:Lyte.attr("string"),
    status:Lyte.attr("string"),
    user:Lyte.belongsTo("users")
});

store.registerAdapter("cars", {
  buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
    let basePath = 'http://localhost:8080/CarShowroom/api/v1';
    let resource = customData.resource;

    if (type === 'findAll' && resource) {

      if(queryParams&&queryParams.is_available){
        queryParams.isAvailable=queryParams.is_available;
        delete queryParams.is_available;
      }

      let companyId = customData.companyId;
      let showroomId = customData.showroomId;
      basePath =basePath+ `/companies/${companyId}/showrooms/${showroomId}/models`;
    }
    else if (type === 'findAll') {
      let userId = store.peekAll('users')[0].userId;
      basePath = basePath+ `/users/${userId}/cars`
    }
    return basePath;
  },

  headersForRequest: function () {
    return {
      "Content-Type": "application/json"
    };
  },

  parseResponse: function (type, modelName, xhrObj, payLoad) {
    if (xhrObj.status === 401) {
      Lyte.Router.transitionTo('login');
    }
    payLoad.status = xhrObj.status;
    return payLoad;
  }
});


store.registerSerializer("cars",{
	serializeKey: function (modelName, type, customData, queryParams) {
        return "";
    },
    serialize: function (type, payLoad, records, customData, modelName, queryParams, gql) {
        
        return payLoad;
    },
    normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData, opts) {
        
        payLoad = payLoad.data || [];
		if (status === 204) {
			return {
				cars: []
			}

		}
		if (customData.resource === 'carModels') {
			payLoad = payLoad.map(item => ({
				id: item.model_id,
				showroom:{
					id:item.showroom_id,
					name:item.showroom_name,
					company:{
						id: item.company_id,
						companyName: item.company_name
					}

				},
				modelName: item.name,
				color: item.color,
				price: item.model_price,
				isActive: item.is_active,
				completedAt: item.completed_at

			}));
		}
		else {
			payLoad = payLoad.map(item => ({
				id: item.car_id,
				showroom: {
					id: item.showroom_id,
					name: item.showroom_name,

					company: {
						id: item.company_id,
						companyName: item.company_name
					},
				},

				company: {
					id: item.company_id,
					companyName: item.company_name
				},
				modelId: item.model_id,
				modelName: item.model_name,
				color: item.color,
				price: item.model_price,
				isActive: item.is_active,
				completedAt: item.completed_at

			}));
		}
		return {
			cars: payLoad
		}

	}
});

store.registerModel("showrooms",{
    id:Lyte.attr('number', { primaryKey : true }),
    showroomName:Lyte.attr('string'),
    user:Lyte.belongsTo('users'),
    isActive:Lyte.attr('boolean'),
    company:Lyte.belongsTo('companies'),
    cars:Lyte.hasMany('cars')
});

store.registerAdapter("showrooms", {
    
	buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
    let companyId = customData.companyId;
    if(queryParams&&queryParams.is_active){
      queryParams.isActive=queryParams.is_active;
      delete queryParams.is_active;
    }
    
    let basePath = `http://localhost:8080/CarShowroom/api/v1/companies/${companyId}/showrooms`;

    return basePath;
  },
    
      headersForRequest: function () {
        return {
          "Content-Type": "application/json"
        };
      },
    
      parseResponse: function (type, modelName, xhrObj, payLoad) {
        if(xhrObj.status===401){
          Lyte.Router.transitionTo('login');
        }
        return payLoad;
      }
});


store.registerSerializer("showrooms",{
    serializeKey : function( modelName , type , customData , queryParams ){
        return "";
    },
    serialize : function( type , payLoad , records , customData , modelName, queryParams , gql ){
        console.log(payLoad);
		return payLoad;
	},
    normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData, opts) {
        let data= payLoad.data || [];
		if(status===204){
			return {
				showrooms:[]
			}
		}
        let array = data.map(item => ({
            id: item.showroom_id,
            showroomName: item.showroom_name,
            user:{
                userId:item.manager_id,
                userName: item.name,
                role:"manager"
            },
            isActive: item.is_active,
            company:{
                id:item.company_id,
                companyName:item.company_name
            }
            
        }));
        return {
            showrooms: array
        }
    }
});

store.registerModel("users",{

  userId : Lyte.attr( "string" ,{primaryKey:true}),
  userName : Lyte.attr( "string" ),
  phoneNo : Lyte.attr( "number" ,{ minimum : 10 }),
  password : Lyte.attr( "string" , { minLength : 8 }),
  role: Lyte.attr( "string" ),
  email : Lyte.attr( "string" , { pattern : /^[a-zA-Z0-9_]([\w\-\.\+\']*)@([\w\-\.]*)(\.[a-zA-Z]{2,22}(\.[a-zA-Z]{2}){0,2})$/ }),
  address:Lyte.belongsTo("address", { serialize : "record" })
  
});

store.registerAdapter("users", {

  buildURL: function (modelName, type, queryParams, payLoad, url, actionName, customData) {
    
    let basePath = "http://localhost:8080/CarShowroom";
    
    if(customData&&customData.resource&& type === "createRecord"){
      return `${basePath}/auth/register`;
    }
    else if (type === "deleteRecord") {
      return `${basePath}/auth/logout`;
    }
    else if (type === "findAll") {
      return `${basePath}/api/v1/users`;
    }
    else if (type === "createRecord") {
      return `${basePath}/auth/login`;
    }
    return url;
  },

  headersForRequest: function () {
    return {
      "Content-Type": "application/json"
    };
  },

  parseResponse: function (type, modelName, xhrObj, payLoad) {
    if (xhrObj.status === 401) {
      Lyte.Router.transitionTo('login');
    }
    return payLoad;
  }
});

store.registerSerializer("users", {
	serializeKey: function (modelName, type, customData, queryParams) {
		return "";
	},
	serialize: function (type, payLoad, records, customData, modelName, queryParams, gql) {
		if(type==='deleteRecord'){
			payLoad={};
		}
		let address = payLoad.address;
		if (!address) {
			return payLoad;
		}

		payLoad = {
			email: payLoad.email,
			password: payLoad.password,
			name: payLoad.userName,
			phone_no: payLoad.phoneNo,
			door_no: address.doorNo,
			street: address.street,
			city: address.city,
			postal_code: address.postalCode
		};
		return payLoad;
	},
	normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData, opts) {
		
		
		payLoad=payLoad.data||[];
		let array = payLoad.map(item => ({
			userId: item.user_id,
			userName: item.name,
			role: item.role,
			email: item.email,
			password: item.password,
			address: {
				id: item.address_id
			}
		}));
		let response = {
			users: array[0]
		}
		return response;
	}
});
