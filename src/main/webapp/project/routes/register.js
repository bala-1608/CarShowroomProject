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
