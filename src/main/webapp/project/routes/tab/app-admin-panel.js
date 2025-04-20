Lyte.Router.registerRoute("tab.app-admin-panel",{
renderTemplate:function(model, paramsObject){
    return {
        outlet:"#content",
        component: "card-comp",
    }
}
});
