store.registerModel("showrooms",{
    id:Lyte.attr('number', { primaryKey : true }),
    showroomName:Lyte.attr('string'),
    user:Lyte.belongsTo('users'),
    isActive:Lyte.attr('boolean'),
    company:Lyte.belongsTo('companies'),
    cars:Lyte.hasMany('cars')
});
