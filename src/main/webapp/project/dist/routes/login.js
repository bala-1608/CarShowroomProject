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
