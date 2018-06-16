const config = require('../config');
const mongoose = require('mongoose');
mongoose.connect(config.mangodb.url);

  
const Tx = mongoose.model('Tx', {
    info : {
        type: Object,
        required: true,
        trim: true
    }
},'Tx');

module.exports = {Tx};




// account: undefined,
// address:  info.transaction.DestinationTag === undefined ?  info.transaction.Destination :`${info.transaction.DestinationTag},${info.transaction.Destination}`,
// // tag :  info.transaction.DestinationTag === undefined ? undefined : info.transaction.DestinationTag ,
// txid:  info.transaction.hash,
// index: info.ledger_index,
// amount: new Decimal(info.transaction.Amount)/1000000,
// detail: JSON.stringify(info.transaction)