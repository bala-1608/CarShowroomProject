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
