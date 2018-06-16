
const Promise = require('bluebird')
const request = require('../public/client')


// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/Record');
const {Tx} = require('./model')


// mongoose.connection.close()
Tx.find().then( list =>  {
                if (list.length > 0 ) {
                   console.log(list.length + ' Transactions exist in recovery server')
                   Promise.map(list, tx => request.pushTransactionPromise('XRP' , tx) )
                  .then( () =>  console.log('Recover all tx record on reomte-server succeesfully') )
                  .then( () => Tx.remove())
                  .catch( err => console.log('Fail to recover tx due to remote-server is down') )
                }
                else {
                   console.log( 'No Transactions exists in recovery server ')
                }
       
})



//find ---> if find result then push them to remoste server and remove all, if not then do nothing .





