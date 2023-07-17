const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "82chy3ymnrssc2d2",
  publicKey: "m8c2jmtqmkzn2ms2",
  privateKey: "d1c02c22aa5699e77c3a98a2790ccbf8"
});
