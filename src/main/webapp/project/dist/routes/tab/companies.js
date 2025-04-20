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
