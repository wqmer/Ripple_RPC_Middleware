const request = require('./client')
const {Tx} = require('../mangoDB/model')
const schedule = require('node-schedule');
const Promise = require('bluebird')
const moment = require('moment');

let timeByNow = () =>  {  
    let now = moment()
    let formatted = now.format('YYYY-MM-DD HH:mm:ss')
    return formatted
}

var rule = new schedule.RecurrenceRule(); 
        // rule = '*/10 * * * * *' ;
    rule = '*/30 * * * *';
    schedule.scheduleJob(rule, ( ) => { 
             Tx.find().then( list =>  {
                             if (list.length > 0 ) {
                                 console.log(list.length + ' Transactions exist in recovery server ' + timeByNow() )
                                 Promise.map(list, tx => request.pushTransactionPromise('XRP' , tx) )
                                 .then( () =>  console.log('Recover all tx record on reomte-server succeesfully') )
                                 .then( () => Tx.remove() )
                                 .catch( err => console.log('Fail to recover tx due to remote-server is down at '+ timeByNow() ) )
                            }
                             else {
                                 console.log( 'No Transactions exists in recovery server. Now the time is ' + timeByNow() )
                            }                
                       })                
   })


   // mongoose.connection.close()

