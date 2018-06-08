

const WebSocket = require('ws');
const RippledWsClient = require('rippled-ws-client')
const utility = require('../ripple/uility')
const request = require('./client')
const sql = require('../mysql/query')

const ws = new WebSocket('wss://s1.ripple.com');


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
              let obj   
              if ( info.transaction!= undefined && info.transaction.Destination == utility.accounts[0].address )  {    
                   sql.getAccountByTag(info.transaction.DestinationTag)
                  .then( result =>  { 
                                     obj = utility.trackTxData(info)                   
                                     obj.account = result
                                     return obj        
                         }          
                  )
                  .then( data => request.pushTransaction('XRP' , data)   )
                  // .then( data => console.log(data) )
                  .catch( error => console.error)
              }
   });
  
