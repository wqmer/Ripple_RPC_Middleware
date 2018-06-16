
const schedule = require('node-schedule');
const WebSocket = require('ws');
const RippledWsClient = require('rippled-ws-client')
const utility = require('../ripple/uility')
const request = require('./client')
const sql = require('../mysql/query')
const ws = new WebSocket('wss://s1.ripple.com');
const {Tx} = require('../mangoDB/model')

var track = JSON.stringify(
    {
      command: 'subscribe',
      accounts: [utility.accounts[0].address]
    })

ws.on('open', function open() {
    ws.send(track)
   });

ws.on('message', function incoming(data) {
              var info = JSON.parse(data)  
              if ( info.transaction!= undefined && info.transaction.Destination == utility.accounts[0].address )  {    
                   let obj  
                   sql.getAccountByTag(info.transaction.DestinationTag)
                  .then( result =>  {   
                                     obj = utility.trackTxData(info)                   
                                     obj.account = result
                                     return obj        
                         }          
                  )
                  .then(  data => {
                          let tx = new Tx({ info: data });
                          request.pushTransactionPromise('XRP' , data)
                          .then( () => console.log('Push tx successfully,'))
                          .catch( (error) => {
                                               console.log('Fail to push tx and try to save on backup server.....')
                                               tx.save()
                                               .then( () => console.log('Save one tx succeessfully\r\n') ) 
                                               .catch( error => console.log(error))
                          })
                  })
                  .catch( error => {
                          console.log(error)
                        })
              }
});


