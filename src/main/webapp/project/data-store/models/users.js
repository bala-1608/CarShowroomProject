store.registerModel("users",{

  userId : Lyte.attr( "string" ,{primaryKey:true}),
  userName : Lyte.attr( "string" ),
  phoneNo : Lyte.attr( "number" ,{ minimum : 10 }),
  password : Lyte.attr( "string" , { minLength : 8 }),
  role: Lyte.attr( "string" ),
  email : Lyte.attr( "string" , { pattern : /^[a-zA-Z0-9_]([\w\-\.\+\']*)@([\w\-\.]*)(\.[a-zA-Z]{2,22}(\.[a-zA-Z]{2}){0,2})$/ },{mandatory:true}),
  address:Lyte.belongsTo("address", { serialize : "record" }),
  company:Lyte.belongsTo("companies"),
  showroom:Lyte.belongsTo("showrooms")
  
});
