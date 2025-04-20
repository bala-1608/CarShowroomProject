store.registerSerializer("companies", {
    serializeKey : function( modelName , type , customData , queryParams ){
        return "";
    },
    serialize : function( type , payLoad , records , customData , modelName, queryParams , gql ){
		return payLoad;
	},
    normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData, opts) {
        payLoad = payLoad.data || [];
        let array = payLoad.map(item => ({
            id: item.brand_code,
            companyName: item.company_name,
            user:{
                userName:item.name,
				userId:item.admin_id,
                role:"admin"
            },
            isActive: item.is_active,
            startedYear: item.started_year
        }));
        return {
            companies: array
        }
    }
});
