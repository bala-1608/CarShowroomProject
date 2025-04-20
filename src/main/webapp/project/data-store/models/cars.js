store.registerModel("cars",{
    
    id:Lyte.attr('string',{primaryKey : true}),
    carType:Lyte.attr('string'),
    showroom:Lyte.belongsTo('showrooms'),
    company:Lyte.belongsTo('companies'),
    modelId:Lyte.attr('string'),
    modelName:Lyte.attr("string"),
    isActive:Lyte.attr("boolean",{default:false}),
    price:Lyte.attr("number"),
    color:Lyte.attr("string"),
    status:Lyte.attr("string"),
    user:Lyte.belongsTo("users")
});
