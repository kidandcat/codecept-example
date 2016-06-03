Feature('Planes de servicio');

var user = 'UserTest0';//'MockUser' + Math.floor(Math.random() * (30 - 1) + 1);


xScenario('Custom(Quita la X delante de Scenario para activar este test)', function*(I){
     //I.createUser(user, user);
    //  var id = yield I.getUserId(user);
    //  I.addSaldo(user, id, '300');
     I.login(user,user);
     I.addDatosFacturacion();
     I.buyServicePlan();
     I.dontSee('Error inesperado');
});


Scenario('Compra plan de servicios', function*(I){
     var user = 'MockUser' + Math.floor(Math.random() * (30 - 1) + 1);
     I.createUser(user, user);
     var id = yield I.getUserId(user);
     I.addSaldo(user, id, '100');
     I.login(user,user);
     I.addDatosFacturacion();
     I.buyServicePlan();
     I.dontSee('Error inesperado');
});
