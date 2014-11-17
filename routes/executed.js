var express = require('express');
var router = express.Router();
var Mollie = require('mollie-api-node');

var mollie = new Mollie.API.Client;
    mollie.setApiKey('MOLLIE_API_KEY');


router.get('/',function(req, res) {
	
    var paymentId = req.session.paymentId;

    mollie.payments.get(paymentId, function(payment) {
        if (payment.error) {
          console.error(payment.error);
          res.render('payment-error', { 'error': payment.error });
        }else {


            res.render('executed-payment', { 'payment': payment });
       
        }


    });	




});

module.exports = router;
