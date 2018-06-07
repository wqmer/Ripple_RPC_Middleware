const RippleAPI = require('ripple-lib').RippleAPI;
const rippleApi = new RippleAPI({server: 'wss://s1.ripple.com' });
var jayson = require('jayson');
 
// create a client
// var client = jayson.client.http('http://192.168.1.115:3000');
// var client = jayson.client.http({
//   hostname: '192.168.1.115',
//   port: '3000'
// });

var client = jayson.client.http({
  port: 3000
});


// var username = 'xrprpcuser'
// var password = 'xrprpcpassword'
var outClient = jayson.client.http({
hostname: '192.168.1.68',
path:'/trade/app/rpc/coin',
auth:'xrprpcuser:xrprpcpassword',
// auth: username + ':' + password
// port: 3000

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
                console.log('Error: Can not connect to server') ;
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
                  // console.log('no error')
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
              //  console.log('test err failed'); 
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