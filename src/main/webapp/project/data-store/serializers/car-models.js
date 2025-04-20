store.registerSerializer("car-models",{
	serializeKey : function( modelName , type , customData , queryParams ){
        return "";
    },
    serialize : function( type , payLoad , records , customData , modelName, queryParams , gql ){
		return payLoad;
	},
    normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData, opts) {
        payLoad = payLoad.data || [];
        payLoad = payLoad.map(item => ({
            id: item.model_id,
            modelName: item.name,
            isActive: item.is_active,
            price: item.model_price,
            color:item.color,
            company:{
                id:item.company_id,
                companyName:item.company_name
            }
            
        }));
        return payLoad;
    }
});
