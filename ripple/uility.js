var Decimal = require('decimal.js');

const config = {
          full:     {server: 'wss://s2.ripple.com' } ,
          general : {server: 'wss://s1.ripple.com' } 
}




const toTxData = (obj) => {
//       return obj
      return { 
                status: obj.outcome.result === 'tesSUCCESS' ? true : false , 
                account: undefined,
                address:  obj.specification.destination.tag === undefined ?  obj.specification.destination.address:`${obj.specification.destination.tag},${ obj.specification.destination.address}`,
                // from: obj.address,
                // to: obj.specification.destination.address,
                txId:obj.id,
                tag: obj.specification.destination.tag,
                index:obj.outcome.ledgerVersion,
                amount: new Decimal(obj.specification.destination.amount.value)*1 ,
                detail: JSON.stringify(obj.outcome)
       }
}


const  trackTxData = (info) => {
        return { 
                account: undefined,
                address:  info.transaction.DestinationTag === undefined ?  info.transaction.Destination :`${info.transaction.DestinationTag},${info.transaction.Destination}`,
                // tag :  info.transaction.DestinationTag === undefined ? undefined : info.transaction.DestinationTag ,
                txid:  info.transaction.hash,
                index: info.ledger_index,
                amount: new Decimal(info.transaction.Amount)/1000000,
                detail: JSON.stringify(info.transaction)
         }
  }


//{ engine_result: 'tesSUCCESS',
//   engine_result_code: 0,
//   engine_result_message: 'The transaction was applied. Only final in a validated ledger.',
//   ledger_hash: '383F887A2976861C78495C3AEE0ED33040376362DF3533E11042F0C7822523C6',
//   ledger_index: 39194587,
//   meta:
//    { AffectedNodes: [ [Object], [Object] ],
//      TransactionIndex: 19,
//      TransactionResult: 'tesSUCCESS' },
//   status: 'closed',
//   transaction:
//    { Account: 'rffARVU6tptSvwNeuqUrLD6KTwFwvq7C11',
//      Amount: '10000',
//      Destination: 'rQHzdWhU9i1oz6LksVPtvUCoKfeHiwWsmv',
//      DestinationTag: 10124,
//      Fee: '12',
//      Flags: 2147483648,
//      LastLedgerSequence: 39194588,
//      Sequence: 83,
//      SigningPubKey: '0319353E51E70077C17EBCC875D3E6EEB7D4A02D9BD59422F5A612BC58C52B29BD',
//      TransactionType: 'Payment',
//      TxnSignature: '3045022100C3BDBE29B25520DB7BCCC10321CD67E4DF368F2EB8C6C3A364CEFEB834A24E4F022045A2E3ED40A1BDD73F87FD1DBBEC0F08BE052C9080F1ADC68790DBFCDF3A8273',
//      date: 581624701,
//      hash: '70EC30D23C60BDDE12F1C66D315360128F7CE8D3BD9E7E8F92C0D5C11963045D' },
//   type: 'transaction',
//   validated: true }

const errorCase = (error) => {
           return { code: -32603, message: error.message } 
      }

const xrpPayment = (from, to, amount, tag) => {
      return {     
              "source": {
                         "address": from ,
                         "amount": {
                                //     "value": new Decimal(amount),
                                    "value":  typeof(amount) == 'string'? amount: JSON.stringify(amount) ,
                                    "currency": "XRP"
                         }
               },
               "destination": {
                                "address": to,
                                "tag" : tag == undefined? tag : parseInt(tag),
                                "minAmount": {
                                              "value": typeof(amount) == 'string'? amount : JSON.stringify(amount) ,
                                              "currency": "XRP"
                                 }
                }
        }
};


const isAddress = (account) => { 
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      return !format.test(account)
}


const fetchTag = (account) =>  account.substring(0, account.indexOf(',')).trim()

const fetchAddress = (account) =>  account.substring(account.indexOf(",") + 1).trim()




const getTagAndAd = (account) => {

    if ( isAddress(account) ) { 
           return   {  
                        address : account ,
                        tag: undefined

                    }
       }
    else {
           return {
                  address: fetchAddress(account),
                  tag:    fetchTag(account)
                   }
          }
}

const txOptions =  {
         limit : 2000
       }

const accounts = [

            Jiusite = {
                        address: 'rffARVU6tptSvwNeuqUrLD6KTwFwvq7C11',
                        secret: 'sp5MKJ5fu3N3UN1NW1k4dpVWuRcDe'
          },
             
            Kimi = {
                     address: 'rQHzdWhU9i1oz6LksVPtvUCoKfeHiwWsmv',
                     secret: 'shuSQaZZfjBmp1FSMGR22hJiQsc6Y',
          }
      ]
        




module.exports = {config, toTxData, xrpPayment, txOptions, accounts, trackTxData,errorCase, isAddress, fetchTag,getTagAndAd}