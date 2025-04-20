Lyte.Router.configureDefaults({
	baseURL: '/CarShowroom',
	history: "html5"
});

Lyte.Router.configureRoutes(function () {
	this.route("login",{path:"/"});
	this.route("register");

	this.route("tab", function () {
		this.route("companies", function () {
			this.route("showrooms",
				{ path: "/:company_id/showrooms" }
				, function () {
					this.route("models", { path: "/:showroom_id/models" });
				});
		});
		this.route("home", { path: "/" });
		this.route("app-admin-panel")
		this.route("manager-panel")
		this.route("user-cars")
		this.route("user-bookings")
	});
	this.route("error-page", { path: "/*" });

});


Lyte.Router.beforeRouteTransition = function () {

}

Lyte.Router.afterRouteTransition = function () {

}

