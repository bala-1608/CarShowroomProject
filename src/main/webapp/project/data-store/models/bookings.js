store.registerModel("bookings",{

    bookingId:Lyte.attr('string',{primaryKey : true}),
    bookingType:Lyte.attr('string'),
    user:Lyte.belongsTo('users'),
    status:Lyte.attr('string'),
    price:Lyte.attr('number'),
    requestDate:Lyte.attr('string'),
    showroom:Lyte.belongsTo('showrooms'),
    model:Lyte.belongsTo('cars'),
    
});
