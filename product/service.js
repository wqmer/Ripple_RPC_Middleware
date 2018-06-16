const sql = require('../mysql/query')
const myRippleApi = require('../ripple/myRipple')
const uility = require('../ripple/uility')


// serarch tx record  in database 
var getTransactionByid = (txid) => {
    let account
    return new Promise ( (resolve,reject) => { 
                          sql.getAccountbyTxid(txid).then( result =>  account = result )
                            .then( () => myRippleApi.getTransactionByHash(txid)  )    
                            .then( info => { 
                                             info.account = account   
                                             return info
                                            })
                            .then( (result) => resolve(result) )    
                            .catch(error => reject(uility.errorCase(error)) )
                          })                  
}

//search tx record in Ripple ledger
var getTransactionByhash = (txid) => {
    let tag 
    let user 
    let info 
    return new Promise ( (resolve,reject) => { 
                           myRippleApi.getTransactionByHash(txid) .then(  result =>  { tag = result.tag  } )                                                         
                           .then( () => sql.getAccountByTag(tag) )
                           .then( username => {
                                        // console.log(username)
                                          if ( usernmae != undefined){
                                               result.account = username
                                               return result
                                          }else {
                                               throw new Error ('No account match this tx')
                                          }                  
                                     })
                            .then ( result => {
                                               delete result.tag
                                               resolve(result)                
                                    })     
                            .catch(error => reject(uility.errorCase(error))  )                                      
    })
}

 var getBalanceByTagOrAd = (account) => {
     return new Promise (  (resolve,reject) => { 
                        if ( uility.isAddress(account)) {
                            myRippleApi.getBalanceByAddress(account).then( result => resolve(result)).catch(error => reject(uility.errorCase(error))  )
                           } 
                        else {
                            sql.getBalancebyTag(uility.fetchTag(account)).then( result => resolve(result)).catch(error => reject(uility.errorCase(error))  )
                           }
                        })                  
  }                    


var withdrawlRipple = (txObj) => {
    if (!txObj.tag) txObj.tag = undefined
    let id
    let status
    let hash
    return new Promise ( (resolve,reject) => {          
                           sql.getIdByAddress(txObj.from).then(result => id = result)
                          .then ( () => myRippleApi.sendTransaction(txObj.from, uility.getTagAndAd(txObj.to).address, txObj.amount, uility.getTagAndAd(txObj.to).tag) )
                          .then( result =>  {
                                  hash = result.txid
                                  status = result.resultCode
                                if( status == 'tesSUCCESS') { 
                                    sql.saveWithdrawlTransaction(hash, id)
                                } 
                                else {
                                    throw new Error('Rpc ledger delay or refuse this transaction.')
                                } 
                            })   
                           .then( () =>  resolve( hash ) )   
                           .catch( error => reject(uility.errorCase(error))  )
     })
}

//this tag set by client 
var withdrawlRippleByAccount = (txObj) => {
    if (txObj.tag == null) txObj.tag = undefined
    let txid
    let status
    let id
    return new Promise ( (resolve,reject) => {      
                           sql.getIdByAccount(txObj.account)
                          .then( result => id = result ) 
                          .then ( () => myRippleApi.sendTransaction(txObj.from, txObj.to, txObj.amount, txObj.tag) )
                          .then( result =>  {
                                  txid = result.txid
                                  status = result.resultCode
                                if( status == 'tesSUCCESS') { 
                                    sql.saveWithdrawlTransaction(txid,id).then( () => resolve( { txid: txid }) )
                                } 
                                 else {
                                    throw new Error('Transaction failed')
                                }              
                           }) 
                          .catch( error => reject(uility.errorCase(error))  )    
     })
}

var updateBalanceByAddress = (address) => {  
    let account 
    return new Promise ( (resolve,reject) => { 
                           sql.getAccountByAddress(address)
                          .then( result => account = result)
                          .then( () => myRippleApi.getBalanceByAddress(address) )
                          .then( amount => sql.updateBalance(account, parseFloat(amount)) )  
                          .then( result => resolve(result) )  
                          .catch( error => reject(uility.errorCase(error))  )                   
                      })
}

var commitDeposit = (txid) => {
     let tag ,amount
     return new Promise ( (resolve,reject) => { 
                           myRippleApi.getTransaction(txid)
                           .then( info => {  
                                 tag = info.tag
                                 amount = info.amount
                                 if (info.status == 'tesSUCCESS') {   
                                     sql.saveDepositTransaction(tag, txid) 
                                 }
                                 else {
                                     throw new Error('deposit unsuccessfully due to transaciton uncompletedly')  
                                 }
                            })
                          .then( () => sql.addAmountToBalance(tag, amount) )
                          .then( result => resolve(result) )  
                          .catch( error => reject(uility.errorCase(error))  )                   
                      }) 
}

var commitDepositByObj = (txObj) => {
    return new Promise ( (resolve,reject) => { 
                          console.log('Find one desposit transaction\r\n', txObj)
                          sql.saveDepositTransaction(txObj.tag, txObj.txid) 
                         .then( () => sql.addAmountToBalance(txObj.tag, txObj.amount) )
                         .then( result => resolve(result)  ) 
                         .catch( error => reject(uility.errorCase(error))  )                
                       }) 
}



module.exports = { 
                   withdrawlRipple,
                   commitDeposit,
                   getTransactionByid,
                   commitDepositByObj,
                   getTransactionByhash,
                   updateBalanceByAddress,  
                   withdrawlRippleByAccount ,
                   getBalanceByTagOrAd ,         
                 }