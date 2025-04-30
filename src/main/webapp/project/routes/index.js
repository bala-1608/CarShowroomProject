Lyte.Router.registerRoute("index",{
    beforeModel  : function (paramsObject ){
        this.transitionTo("login");
    },
});
