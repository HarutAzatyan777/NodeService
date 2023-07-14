const axios = require('axios');
const options = {
  clientId: process.env.PAYMENT_CLIENT_ID,
  username: process.env.PAYMENT_USERNAME,
  password: process.env.PAYMENT_PASSWORD,
  backUrl: process.env.PAYMENT_REDIRECT_URL, // todo change this to our front end url
  apiUrl: process.env.PAYMENT_API_URL
};

class Payment {
  constructor(params) {
    this.currency = 'AMD';
    this.params = params;
    this.options = options;
  }

  async initPayment() {
    const {clientId, apiUrl, username, password, backUrl} = this.options;
    const {orderId, amount, description} = this.params;

    const response = await axios.post(
      `${apiUrl}/InitPayment`,
      {
        "ClientID": clientId,
        "Amount": amount,
        "OrderID": orderId,
        "BackURL": backUrl,
        "Username": username,
        "Password": password,
        "Description": description,
        "Currency": this.currency,
      }
    );

    // todo continue here
    const paymentId = response.data.PaymentID;

  }

  // set backUrl(id) {
  // //  https://servicestest.ameriabank.am/VPOS/Payments/Pay?id=@id&lang=@lang
  //   this.backUrl=`${options.BackURL}id=${id}&lang=${lang}`;
  // }
}

module.exports = Payment;
