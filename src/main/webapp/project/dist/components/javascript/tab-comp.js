Lyte.Component.register("tab-comp", {
_template:"<template tag-name=\"tab-comp\"> <nav-bar action=\" {{action('logout')}} \"></nav-bar> <side-bar></side-bar> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]},{"type":"componentDynamic","position":[3]}],
_observedAttributes :["users"],

	data : function(){
		return {
			users:Lyte.attr("object")
		}		
	},
	didConnect() {
		this.setData("users",this.data );
	  },
	actions : {
		
	},
	methods : {
		
	}
});
