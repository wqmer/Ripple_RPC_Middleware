const Database =  require('./model').Database
const config = require('./config').config
const uility = require('../ripple/uility')

var newAccount = (account) => {   
    var database = new Database(config)
    let info = {
        address: undefined ,
        tag: undefined
    } 
    let id 
    return new Promise ( (resolve ,reject ) => {
                            database.query('INSERT INTO account (username) VALUES (?)',[account])
                           .then( rows =>  { console.log('sucessfully created !') } ) 
                           .then( () => database.query('SELECT id , address FROM account WHERE username = ?',[account]) )
                           .then( (result) => { 
                                  id = parseInt(result[0].id)
                                  info.address = result[0].address
                                  info.tag = parseInt(result[0].id) + 10050
                                  database.query('UPDATE account SET tag = ? WHERE  username = ?',[info.tag, account])  
                                } )
                          .then( rows  => { 
                                 return database.close() 
                                 } , err => {
                                            return database.close().then( () => { throw err ; } )
                                      })
                          .then( () => resolve(`${info.tag}, ${info.address}`) )  
                          .catch( error => reject(uility.errorCase(error))  )                         
    })
}

var getAddressByAccount = (account) => {
    var database = new Database(config)
    let info = {
        address: undefined ,
        tag: undefined
    } 
    return new Promise ( (resolve ,reject ) => {
                           if( account == '*') {
                               database.query('SELECT address,tag FROM account WHERE NOT username = ? ',['Jiusite'])
                               .then( result =>  { 
                                      var raw = JSON.parse(JSON.stringify(result)) 
                                      resolve ( raw.map ( info => `${info.tag},${info.address}` )) 
                                 }, err => {
                                return database.close().then( () => { throw err ; } )
                                })
                                .catch( error => reject(uility.errorCase(error)) )  
                           }

                           else {
                               database.query('SELECT tag, address FROM account WHERE username = ?',[account]) 
                               .then( (result) => {
                                                if (result.length > 0) {`${info.tag}, ${info.address}`
                                                    info.address = result[0].address
                                                    info.tag = result[0].tag
                                                    resolve()
                                                 }
                                                 else {
                                                     throw new Error ('Account not found')
                                                 }
    
                                  })
                                .then( rows => database.close(), err => {
                                       return database.close().then( () => { throw err ; } )
                                   })  
                                .catch( error => reject(uility.errorCase(error)) )   
                           }                                    
    })
}


var getAccountByAddress = (address) => {
    var database = new Database(config)
    return new Promise ( (resolve ,reject ) => {
                           database.query('SELECT username FROM account WHERE address = ?',[address]) 
                          .then( (result) => {
                                              if (result.length > 0) {
                                                  var account = result[0].username
                                                  resolve(account)
                                              }
                                              else {
                                                  throw('Cant find account')
                                              }

                                })
                          .then( rows  => database.close() , err => {
                          return database.close().then( () => { throw err ; } )
                           })  
                          .catch( error => reject(uility.errorCase(error)))                                               
    })
}


var getBalancebyTag = (tag) => {
    var database = new Database(config)
    return new Promise ( (resolve ,reject ) => {
                           database.query('SELECT balance FROM account WHERE tag = ?',[tag]) 
                          .then( (result) => {
                                              if (result.length > 0) {
                                                  var info = result[0].balance
                                                  resolve(info)
                                              }
                                              else {
                                                  throw new Error('Cant find account by tag')
                                              }

                                })
                          .then( rows  => database.close()  , err => {
                            return database.close().then( () => { throw err ; } )
                             })
                          .catch( error => reject(uility.errorCase(error)))                                           
    })
}





var getIdByAddress = (address) => {
    var database = new Database(config)
    return new Promise ( (resolve ,reject ) => {
                           database.query('SELECT id FROM account WHERE address = ?',[address]) 
                          .then( (result) => {
                                              if (result.length > 0) {
                                                  var  userid = result[0].id
                                                  resolve(userid)
                                              }
                                              else {
                                                  throw new Error('Can not find address')
                                               }
                                })
                          .then( rows  => database.close() , err => {
                            return database.close().then( () => { throw err ; } )
                             } )     
                          .catch( error => reject(uility.errorCase(error)  ) )                                         
    })
}


var getAccountByTag = (tag) => {
    var database = new Database(config)
    return new Promise ( (resolve ,reject ) => {
                          database.query('SELECT username FROM account WHERE tag = ?',[tag]) 
                          .then( (result) => {
                                    if (result.length > 0) {
                                        resolve(result[0].username)
                                       }
                                    else { 
                                         throw new Error('No account found by tag ')
                                       }
                            })
                          .then( rows  => database.close()  , err => {
                            return database.close().then( () => { throw err ; } )
                             }) 
                          .catch( error => reject(uility.errorCase(error)))                                                
    })
}

var getIdByAccount = (account) => {
    var database = new Database(config)
    return new Promise ( (resolve ,reject ) => {
                           database.query('SELECT id FROM account WHERE username = ?',[account]) 
                          .then( (result) =>  {
                                              if ( result.length > 0 ) {       
                                                   resolve(result[0].id) 
                                              }
                                              else {
                                                  throw new Error ('Account not found')
                                              }
                          })

                          .then( rows  => database.close()  , err => {
                            return database.close().then( () => { throw err ; } )
                             })  
                             .catch( error => reject(uility.errorCase(error)))                             
    })
}

var getBalanceByAccount = (account) => {
    var database = new Database(config)
    return new Promise ( (resolve ,reject ) => {

                        if (account == "*") {
                            database.query ('SELECT SUM(balance) FROM account WHERE NOT username = ? ',['Jiusite'] )
                            .then( result =>  { 
                                  if (result.length > 0 ) {
                                      resolve( Object.values( result[0])[0]  )  
                                  }
                                  else {
                                    throw new Error('Error : No record found')
                                   }
                            }, err => {
                                return database.close().then( () => { throw err } )
                            }) 
                            .catch( error => reject(uility.errorCase(error)))              
                        } else {
                            database.query('SELECT balance FROM account WHERE username = ?',[account]) 
                            .then( (result) => {
                                                if (result.length>0) {
                                                    resolve(result[0].balance) 
                                                }
                                                 else {
                                                     throw new Error('account not found ')
                                                }
                                  })
                            .then( rows  => database.close() , err => {
                              return database.close().then( () => { throw err } )
                            })    
                            .catch( error => reject(uility.errorCase(error)))  
                        }
                                            
    })
}

var getAccountbyTxid = (txid) => {
    var database = new Database(config)
    return new Promise ( ( resolve, reject ) => {
                           database.query('SELECT id FROM transaction WHERE txid  = ?',[txid]) 
                          .then( result =>  {
                                              if (result.length > 0) { 
                                                   database.query('SELECT username FROM account WHERE id  = ?',[result[0].id]) 
                                                  .then( result => resolve(result[0].username) )    
                                                  } 
                                              else {
                                                    throw new Error ('No tx record found')
                                              }                     
                           })
                          .then( rows  => database.close()  , err => {
                            return database.close().then( () => { throw err ; } )
                             })          
                          .catch( error => reject(uility.errorCase(error)))                                      
    })
}

var updateBalance = (account, amount) => {
    var database = new Database(config)
    return new Promise ( (resolve ,reject ) => {
                           database.query('UPDATE account SET balance = ? WHERE username = ?',[ amount, account]) 
                          .then( () => resolve ('balance update successfully')  )
                          .then( () => database.close()  , err => {
                            return database.close().then( () => { throw err ; } )
                           })  
                          .catch( error => reject(uility.errorCase(error)))                                                
    })
}

var addAmountToBalance = (tag, amount) => {
    var database = new Database(config)
    return new Promise ( (resolve ,reject ) => {
                           database.query('UPDATE account SET balance = balance + ? WHERE tag = ?',[ amount, tag]) 
                          .then( () => resolve ('Deposit successfully')  )
                          .then( () => database.close()  , err => {
                            return database.close().then( () => { throw err ; } )
                           }) 
                           .catch( error => reject(uility.errorCase(error)))                                                   
    })
}

var saveWithdrawlTransaction = (txid,id) => {
    var database = new Database(config)
    return new Promise ( (resolve ,reject ) => {
                           database.query('INSERT INTO transaction (txid,id) VALUES (? ,?)',[txid, id]) 
                          .then( () => resolve ('save succeessfully')  )
                          .then( () => database.close() , err => {
                            return database.close().then( () => { throw err ; } )
                             })   
                          .catch( error => reject(uility.errorCase(error)))                                                 
    })
}

var saveDepositTransaction = (tag, txid) => {
    var database = new Database(config)
    return new Promise ( (resolve ,reject ) => {
                           database.query('SELECT id FROM account WHERE tag = ?',[tag]) 
                           .then( (result) => database.query('INSERT INTO transaction (txid,id) VALUES (? ,?)',[ txid, parseInt(result[0].id)] )  )
                          .then( () => resolve ('save succeessfully')  )
                          .then( () => database.close() , err => {
                           return database.close().then( () => { throw err ; } )
                           }) 
                          .catch( error => reject(uility.errorCase(error)))                                                   
    })
}





module.exports = { 
                   newAccount, 
                   getAddressByAccount, 
                   getBalanceByAccount, 
                   updateBalance, 
                   saveWithdrawlTransaction, 
                   saveDepositTransaction, 
                   addAmountToBalance ,
                   getAccountbyTxid ,
                   getAccountByTag,
                   getAccountByAddress,
                   getIdByAddress,
                   getIdByAccount,
                   getBalancebyTag
                 } 