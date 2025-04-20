Lyte.Component.register("tab-comp", {
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
