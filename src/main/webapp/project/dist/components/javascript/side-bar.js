Lyte.Component.register("side-bar", {
_template:"<template tag-name=\"side-bar\"> <div class=\"side-nav\"> <div class=\"nav-list\"> <template items=\"{{items}}\" item=\"item\" index=\"index\" is=\"for\"><lyte-nav-item class=\"nav-item\"> <link-to lt-prop-route=\"{{item.route}}\" class=\"nav-item-link\">{{item.label}}</link-to> </lyte-nav-item></template> </div> </div> </template>\n<style>\n.side-nav {\n    width: 200px;\n    height: 100vh;\n    background-color: #f4f4f4;\n    display: flex;\n    flex-direction: column;\n    padding: 10px 0;\n    color: #1d2939;\n    position: fixed;\n    left: 0;\n    top: 0;\n}\n\n\n.nav-list {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    margin-top: 70px;\n}\n\n\n/* .nav-item{\n\n    color: #1d2939;\n    display: block;\n    align-items: center;\n    font-size: 15px;\n    padding: 15px 20px;\n    font-weight: bold;\n    cursor: pointer;\n    transition: background 0.3s ease-in-out;\n\n} */\n\n \n.nav-item {\n    color: #1d2939;\n    display: block;\n    font-size: 15px;\n    padding: 0; \n    font-weight: bold;\n    cursor: pointer;\n    transition: background 0.3s ease-in-out;\n}\n\n.nav-item-link a {\n    display: block;\n    padding: 15px 20px; \n    width: 100%;\n    height: 100%;\n    color: #1d2939;\n    text-decoration: none;\n    box-sizing: border-box;\n}\n\n.nav-item-link a:hover {\n    background: #0e1726;\n    color: white;\n    transition: background 0.3s;\n}</style>",
_dynamicNodes : [{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"text","position":[0,1,0]},{"type":"componentDynamic","position":[0,1]},{"type":"componentDynamic","position":[0]}]}],
_observedAttributes :["items"],

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
