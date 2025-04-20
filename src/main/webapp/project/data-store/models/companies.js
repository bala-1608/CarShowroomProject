store.registerModel("companies",{

    id: Lyte.attr('string',{primaryKey:true}), 
    companyName: Lyte.attr('string'), 
    user:Lyte.belongsTo('users'),
    isActive: Lyte.attr('boolean'), 
    startedYear: Lyte.attr('string'),
    showrooms:Lyte.hasMany('showrooms')

});
