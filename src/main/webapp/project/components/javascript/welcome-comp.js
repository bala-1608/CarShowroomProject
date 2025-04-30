Lyte.Component.register("welcome-comp", {
	data : function(){
		return {
            user:Lyte.attr("object")
		}		
	},
    init:function(){
        let userData=store.peekAll('users')[0];
        this.setData('user',userData);

    },
	actions : {
		
	},
	methods : {
		
	}
});
