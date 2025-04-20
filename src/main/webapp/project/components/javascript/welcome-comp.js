Lyte.Component.register("welcome-comp", {
	data: function () {
		return {
			userData:Lyte.attr('object')
		}
	},
	init: function () {
		data=store.peekAll('users')[0];
		this.setData('userData',data);
	},
	actions: {

	},
	methods: {
		
	}
});
