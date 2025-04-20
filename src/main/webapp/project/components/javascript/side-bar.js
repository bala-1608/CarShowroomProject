Lyte.Component.register("side-bar", {
	data : function(){
		return {
			items : Lyte.attr("array")
		}		
	},
	init:function(){
		let data=store.peekAll('users')[0];
		console.log(data.role);
		if(data.role==='app admin'){
			this.setData('items',[{label: 'home',route: 'tab.home'},
				{label:"View Companies",route:'tab.companies'},
				{label:"Manage Companies",route:'tab.app-admin-panel'},
				{ label: 'View Bookings', route: 'tab.user-bookings' },
				{ label: 'Owned Cars', route: 'tab.user-cars' }
			])
		}
		else if(data.role==='manager'){
			this.setData('items',[{label: 'home',route: 'tab.home'},
				{label:"View Companies",route:'tab.companies'},
				{label:`Manage Showroom`,route:'tab.manager-panel'},
				{ label: 'View Bookings', route: 'tab.user-bookings' },
				{ label: 'Owned Cars', route: 'tab.user-cars' },
			])
		}
		else if(data.role==='customer'){
			this.setData('items',[ { label: 'Home', route: 'tab.home' },
				{ label: 'View Companies', route: 'tab.companies' },
				{ label: 'View Bookings', route: 'tab.user-bookings' },
				{ label: 'Owned Cars', route: 'tab.user-cars' },
			])
		}
		


	},
	actions : {
		
	},
	methods : {
		
	}
});
