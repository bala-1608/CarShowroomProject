Lyte.Router.registerRoute("tab.user-bookings",{
    renderTemplate: function (model, paramsObject) {
        return {
            outlet: "#content",
            component: "card-comp",
        }
    },
});
