Lyte.Router.registerRoute("tab.home", {
        
        renderTemplate: function (model, paramsObject) {
                return {
                        outlet: "#content", component: "welcome-comp"
                }
        },
});
