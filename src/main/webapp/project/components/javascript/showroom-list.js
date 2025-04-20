Lyte.Component.register("showroom-list", {
	data: function () {
		return {
			userData: Lyte.attr("object"),
			showrooms: Lyte.attr('array'),
			isNotFound: Lyte.attr("boolean", { default: false })


		}
	},
	init: function () {

		let self = this;
		let companyId = this.data.companyId;
		self.executeMethod("fetchShowroomDetails", companyId);
		let data = store.peekAll('users')[0];
		this.setData('userData', data);
	}
	,
	didConnect: function () {


	},
	actions: {
		redirectToModels: function (companyId, showroomId) {
			Lyte.Router.transitionTo('tab.companies.showrooms.models', companyId, showroomId);
		},
		goBack(){
			Lyte.Router.transitionTo('tab.companies');
		}

	},
	methods: {
		fetchShowroomDetails(companyId) {
			let self = this;
			store.findAll("showrooms", {isActive:true}, false, true, { companyId: companyId })
				.then(function (response) {
					if (response.length === 0) {
						self.setData(self.setData('isNotFound', true));
					}
					self.setData("showrooms", response);
				}).catch(function (error) {
					if (error.status === 404) {
						alert('Not Found');
					}
				});
		},
	}
});
