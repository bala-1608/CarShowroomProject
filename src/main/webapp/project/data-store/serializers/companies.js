store.registerSerializer("companies", {
    serializeKey : function( modelName , type , customData , queryParams ){
        return "";
    },
    serialize : function( type , payLoad , records , customData , modelName, queryParams , gql ){
        if(type==='updateRecord'){
            payLoad.is_active=payLoad.isActive;
            delete payLoad.isActive;
        }
		return payLoad;
	},
    normalizeResponse: function (modelName, type, payLoad, pkValue, status, headers, queryParams, customData, opts) {
        if(type==='deleteRecord'){
            return{
                companies:[]
            }
        }if(type==='updateRecord'){
            return {
                companies:{
                    id:pkValue
                }
                
            }
        }
        
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
