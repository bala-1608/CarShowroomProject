store.registerSerializer("showrooms",{
    serializeKey : function( modelName , type , customData , queryParams ){
        return "";
    },
    serialize : function( type , payLoad , records , customData , modelName, queryParams , gql ){
        console.log(payLoad);
		return payLoad;
	},
    normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData, opts) {
        let data= payLoad.data || [];
		if(status===204){
			return {
				showrooms:[]
			}
		}
        let array = data.map(item => ({
            id: item.showroom_id,
            showroomName: item.showroom_name,
            user:{
                userId:item.manager_id,
                userName: item.name,
                role:"manager"
            },
            isActive: item.is_active,
            company:{
                id:item.company_id,
                companyName:item.company_name
            }
            
        }));
        return {
            showrooms: array
        }
    }
});
