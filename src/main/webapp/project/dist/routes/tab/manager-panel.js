Lyte.Router.registerRoute("tab.manager-panel",{
    renderTemplate: function (model, paramsObject) {
        return {
            outlet: "#content",
            component: "manager-panel"
        }
    },
});
