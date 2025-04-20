Lyte.Router.registerRoute("tab.user-cars",{
    renderTemplate: function (model, paramsObject) {
        return {
            outlet: "#content",
            component: "card-comp"
        }
    },
});
