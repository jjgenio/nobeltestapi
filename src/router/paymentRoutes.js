const express = require('express');
const router = express.Router();
const stripe = require('stripe')(
  'sk_test_51PA7phAPkcY5p1gtBDEcrG2SUPncgCEawrNAljmMRZhJP9Led5nfKAm2YGS5jliHg5NmO2dc1EtKodzWjF8u6WWZ006chYuNnH'
);

// router endpoints
router.post('/intents', async (req, res) => {
  try {
    // create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount, // Integer, usd -> pennies, eur -> cents
      currency: 'eur',
      payment_method_types: ['bancontact', 'card', 'paypal'],
    });
    // Return the secret
    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

module.exports = router;
