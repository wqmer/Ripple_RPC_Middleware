const RippleAPI = require('ripple-lib').RippleAPI;
const rippleApi = new RippleAPI({server: 'wss://s1.ripple.com' });
var jayson = require('jayson');
 
// create a client


// var client = jayson.client.http({
//     port: 3000
// });


// var client = jayson.client.http({
//   hostname: '51.15.20.158',
//   port: '3000'
// });


var outClient = jayson.client.http({
hostname: '192.168.1.68',
path:'/trade/app/rpc/coin',
auth:'xrprpcuser:xrprpcpassword',
// auth: username + ':' + password
});

var outClient = jayson.client.http({
hostname: 'bisail.com',
path:'/trade/app/rpc/coin',
auth:'xrprpcuser:xrprpcpassword',
// auth: username + ':' + password
});

var newAddress = (account) => {
      client.request('new_address', [account] , function(err, response) {
       if(err) {
                  console.log('Error: Can not connect to server') ;
                }
        else {
                  console.log(response); 
                }
     });
}

var getAddress = (account) => {
       client.request('get_address', [account] , function(err, response) {
           if(err) { 
                     console.log(err)
                    //  console.log('Error: Can not connect to server') ;
                    }
           else {
                     console.log(response); 
                   }
        });
}

var getBalance = (account) => {
         client.request('get_balance', [account] , function(err, response) {
            if(err) {
                     console.log('Error: Can not connect to server') ;
                     }
            else {
                     console.log(response); 
                    }
              });
}

var getTransactionById = (txid) => {
    client.request('get_transaction_id', [txid] , function(err, response) {
       if(err) {
                console.log(err) ;
               }
       else {
                console.log(response); 
               }
         });
}

var sendTransaction = (obj) => {
    client.request('send_transaction', [obj] , function(err, response) {
        if(err) {
                  console.log(err) ;
                }
        else {
                  console.log(response); 
                }
    });
}

var commitDeposit = (obj) => {
    client.request('commit_deposit', [obj] , function(err, response) {
        if(err) {
                  console.log('Error: Can not connect to server') ;
                }
        else {
                  console.log(response); 
                }
    });
}


var pushTransaction = (currency,obj) => {
    outClient.request('receive_transaction', [currency, obj] , function(err, response) {
     if(err) {
                console.log(err) ;
              }
     else {
                console.log(response); 
              }
  });
}

var testError = (obj) => {
    client.request('customError', [obj] , function(err, response) {
    if(err) {
               console.log(err) ;
             }
    else {
               console.log(response)
             }
 });
}


// client.request('get_transaction_tag', ['rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh','108557093'] , function(err, response) {
//     if(err) throw err;
//     console.log(response.result); 
// });

// client.request('get_transaction_tag', ['rffARVU6tptSvwNeuqUrLD6KTwFwvq7C11'] , function(err, response) {
//     if(err) throw err;
//     console.log(response.result); 
// });


module.exports = {commitDeposit, sendTransaction, newAddress, getAddress, getBalance, getTransactionById, pushTransaction, testError }