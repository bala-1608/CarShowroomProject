Lyte.Component.register("delete-popup", {
	data : function(){
		return {

		}		
	},
	actions : {
		execute:function(){
			this.executeMethod('action1');
		},
		cancel:function(){
			this.executeMethod('action2');
		}
	},
	methods : {
		
	}
});
