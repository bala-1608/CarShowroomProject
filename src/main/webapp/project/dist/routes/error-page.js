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
