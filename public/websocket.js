

const WebSocket = require('ws');
const RippledWsClient = require('rippled-ws-client')
const utility = require('../ripple/uility')
const request = require('./client')
const sql = require('../mysql/query')

const ws = new WebSocket('wss://s1.ripple.com');

var serverInfo = JSON.stringify(
    {
      "id": 1,
      "command": "server_info" 
    })

var track = JSON.stringify(
    {
      command: 'subscribe',
    //   accounts: ['rQHzdWhU9i1oz6LksVPtvUCoKfeHiwWsmv']
      accounts: ['rffARVU6tptSvwNeuqUrLD6KTwFwvq7C11']
    })

ws.on('open', function open() {
    ws.send(track)
   });

ws.on('message', function incoming(data) {
              var info = JSON.parse(data)  
              let obj   
              if ( info.transaction != undefined )  {    
                //    console.log (info)
                  sql.getAccountByTag(info.transaction.DestinationTag)
                  .then( result =>  { 
                                     obj = utility.trackTxData(info)                   
                                     obj.account = result
                                     return obj
                   })
                   .then( data => request.pushTransaction('XRP' , data)   )
                   .catch(error => console.error)
              }
            //   request.pushTransaction('XRP' , utility.trackTxData(info));
            //    info.transaction.DestinationTag
              

            //   if ( info.transaction != undefined ) request.pushTransaction('XRP' , utility.trackTxData(info));
            //  if ( info.transaction != undefined ) console.log(utility.trackTxData(info));
   });
  

// const q = new Promise ( (resolve ,reject) => {
//                          ws.on('open', function open() {
//                          resolve(ws.send(track))
//    });
// })   



// const p = new Promise ( (resolve ,reject) => {
//                          ws.on('message', function incoming(data) {
//                          resolve(data);
//                         });
//           })
    

// q.then( () => p ).then( data => console.log( JSON.parse(data) )  )  


 



// const account = {   
//     id:'jiusite',
//     command: 'subscribe',
//     accounts: ['rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh']
// }

// const stream = {
//     command: 'subscribe',
//     streams: [ 'validations', 'transactions_proposed' ]
// }      

// const server = { command: 'server_info' }
// ws.on('open', function open() {
//     ws.send('server_info');
//   });
  
//   ws.on('ledger', function incoming(data) {
//     console.log(data);
//   });



// ws.on('connection', function connection(ws) {
//     ws.on('server_info', function incoming(message) {
//       console.log(message);
//     });
//     ws.send('something');
//   });

// ws.on('server_info', function incoming(data) {
//   console.log(data);
// });



// new RippledWsClient('wss://s1.ripple.com').then( connection =>  connection.send(linsterner).then( r =>  console.log('result', r) )  )