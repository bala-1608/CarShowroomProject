store.registerModel("address",{
    id : Lyte.attr( "string",{primaryKey:true}),
  street : Lyte.attr( "string" ),
  doorNo : Lyte.attr( "string" ),
  city : Lyte.attr( "string" ),
  postalCode:Lyte.attr( "number" ,{ minimum : 6})
  
});
