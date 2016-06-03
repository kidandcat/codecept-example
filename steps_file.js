
'use strict';

// PRODUCTION
// const CLIENTADMIN = 'http://clientadmin.telcom';
// const CLIENT = 'https://cloud.netelip.com';

//DEVELOPMENT
const CLIENTADMIN = 'http://192.168.0.13/clientadmin/web/app.php';
const CLIENT = 'http://client';

module.exports = function() {
  return actor({

    login: function(username, password) {
      this.amOnPage(CLIENT);
      this.fillField('#form_username', username);
      this.fillField('#form_password', password);
      this.click('#form_login');
      this.wait(0.5);
    },

    loginTutorial: function(username, password){
      this.amOnPage(CLIENT);
      this.fillField('#form_username', username);
      this.fillField('#form_password', password);
      this.click('#form_login');
      this.click('.popover-navigation button:nth-child(2)');
      this.wait(0.5);
    },

    /**
     * var id = yield I.getUserId(user);
     */
    getUserId: function(username){
        var self = this;
        this.amOnPage(CLIENTADMIN);
        this.see('Panel Admin');
        this.click('form a.pull-right');
        this.see('departamento.tecnico');
        this.click('departamento.tecnico');
        this.see('departamento.tecnico');
        this.fillField('#form_password', 'netelip1234');
        this.click('Acceder');
        this.fillField('#form_nombre', username);
        this.click('#form_Buscar');
        this.wait(0.5);
        return this.grabHTMLFrom('td:nth-child(1)');
        //asd[0].split("\n")[1].split(' ').join('').split('\n').join('');
    },

    /**
     * I.addSaldo(user, id, '300');
     * @param username
     * @param id
     * @param saldo
     */
    addSaldo: function(username, id, saldo){
      id = id[0].split("\n")[1].split(' ').join('').split('\n').join('');
      this.amOnPage(CLIENTADMIN+'/buyUser/rechange/'+id);
      this.wait(0.5);
      this.fillField('#form_subtotal', saldo);
      this.selectOption('#form_tipoPago', 'Saldo');
      this.wait(0.5);
      this.click('#form_Enviar');
      this.wait(0.5);
      this.see('Resumen del pago');
    },

    buyServicePlan: function() {
      this.amOnPage(CLIENT+'/es/settings/services-plans/add/2');
      this.wait(0.5);
      this.see('Plan de servicios Básico');
      this.selectOption('#add_service_plan_type_months', '3 meses');
      this.click('#add_service_plan_type_submit');
      this.wait(0.5);
      this.click('#add_service_plan_type_submit');
      this.see('Seleccionar método de pago');
      this.click('.credit a');
      this.wait(0.1);
      this.click('#btn-accept');
      this.see('Confirmación del pedido');
      this.click('#form_submit');
    },

    addDatosFacturacion: function(){
      this.amOnPage(CLIENT+'/es/settings/users/edit-billing');
      this.wait(0.5);
      this.checkOption('#billingdata_Typeclient_1');
      this.fillField('#billingdata_documentNumber', '08910007Z');
      this.fillField('#billingdata_address', 'Tester Island');
      this.fillField('#billingdata_zipcode', '29001');
      this.selectOption('#billingdata_province', 'Málaga');
      this.fillField('#billingdata_town', 'Malagasia');
      this.click('#billingdata_submit');
    },

    createUser: function(username, password){
      this.amOnPage('http://client');
      this.see('Empieza como');
      this.see('Empresa');
      this.click('a.center-text');
      this.wait(0.5);
      this.see('Registro');
      this.see('empresas');
      this.fillField('#company_name', username);
      this.fillField('#company_lastName', 'UserApellido');
      this.fillField('#company_email', 'departamento.tecnico@telcombs.net');
      this.selectOption('#company_country', 'España');
      this.fillField('#company_phone', '666666666');
      this.fillField('#company_companyName', 'Test');
      this.selectOption('#company_workerNumber', 'Uno');
      this.selectOption('#company_industry', 'Arte y cultura');
      this.click('#company_send');
      this.seeElement('#signin_username');
      this.fillField('#signin_username', username);
      this.fillField('#signin_password_first', password);
      this.fillField('#signin_password_second', password);
      this.selectOption('#signin_howDidYouHearAboutUs', 'By Google');
      this.executeScript(function() {
          document.querySelector('#signin_conditions').click();
      });
      this.click('#signin_send');
      this.see('¡Enhorabuena ' + username + '!');
      this.click('.registro-acceder');
      this.wait(1);
      this.see('Iniciar sesión');

      console.log('Username: ' + username + "\n\n");
    }

  });
}
