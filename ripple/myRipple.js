const RippleAPI = require('ripple-lib').RippleAPI;
const Promise = require('bluebird')
const uility = require('./uility')

var newAddress = () => api.generateAddress()

var getTransactionByHash = (txid) => {  
    const api = new RippleAPI(uility.config.full);
    return new Promise ( (resolve , reject ) =>  {  
               api.connect().then( () => 
                             api.getTransaction(txid) )
                             .then( info => resolve(uility.toTxData(info)) )
              .then(() =>  api.disconnect())
              .catch( error =>  reject(uility.errorCase(error)) );
        })   
  }

var getTransactionByTag = (address, tag) => { 
    const api = new RippleAPI(uility.config.full);
    return new Promise ( (resolve , reject ) =>  {  
               api.connect().then( () => 
                             api.getTransactions(address, uility.txOptions) )
                             .then( info =>  { 
                                    result =  info.filter( tx => tx.type ==='payment' && tx.specification.destination.tag == parseInt(tag)  ) 
                                    resolve ( result.map( tx => uility.toTxData(tx) ) )                 
                                  }) 
              .then( () =>  api.disconnect() )
              .catch( error => reject(uility.errorCase(error)));
        })   
  }

var getBalanceByAddress = (address) =>  { 
    const api = new RippleAPI(uility.config.full);
    return new Promise ( (resolve , reject ) =>  {  
               api.connect().then( () =>        
                             api.getAccountInfo(address) )
                             .then( info => resolve(info.xrpBalance) )
               .then(() => api.disconnect() )
               .catch( error => reject(uility.errorCase(error)));
           })  
  }

var sendTransaction = (from, to, amount, tag) => { 
    const api = new RippleAPI(uility.config.full);
    return new Promise (  (resolve ,reject) => {
               api.connect().then( () => 
                             api.preparePayment( from, uility.xrpPayment(from, to, amount, tag) ) )
                             .then( prepared => {
                                    var result = uility.accounts.filter( account => account.address === from )
                                    var secret = result[0].secret
                                    if (secret == undefined) {
                                        throw new Error('No secret find. Cant finish signing')
                                    } else {
                                        return api.sign(prepared.txJSON, secret)  
                                    }   
                              })
                             .then( signedTx => {  
                                    return  api.submit(signedTx.signedTransaction)
                                            .then( txData => {
                                                   txData.txid = signedTx.id
                                                   return (txData)
                                             })
                                   })
                             .then( (result) => resolve(result) )
                .then(() =>  api.disconnect() )
                .then(() => console.log('Transaction submited successfully and Rpc disconnected correctly.') )
                .catch( error => reject(uility.errorCase(error)) );
           })   
}

module.exports = { getBalanceByAddress, newAddress, sendTransaction, getTransactionByHash, getTransactionByTag,}