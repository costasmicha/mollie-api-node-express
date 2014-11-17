var express = require('express');
var router = express.Router();
var Mollie = require('mollie-api-node');

var mollie = new Mollie.API.Client;
    mollie.setApiKey('MOLLIE_API_KEY');


router.get('/',function(req, res) {
	
	var sess = req.session

    redirectUrl = "http://localhost:3333/execute";


    var payment = {
    	amount: req.param('amount'),
    	description: "Awesome bike 1",
    	redirectUrl: redirectUrl,
    	method: "ideal"
    };


    mollie.payments.create(payment, function(payment) {
    	if (payment.error) {
          console.error(payment.error);
          res.render('payment-error', { 'error': payment.error });
        }else {
        console.log(payment);

        //store the payment.id in the session obj 
        sess.paymentId = payment.id;
 
    	res.render('create-payment', { 'payment': payment });

        }    
    });


});

module.exports = router;
