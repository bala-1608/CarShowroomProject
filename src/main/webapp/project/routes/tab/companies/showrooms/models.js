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
