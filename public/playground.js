const request = require('./client')
const uility = require('../ripple/uility')

// var txto = 'rQHzdWhU9i1oz6LksVPtvUCoKfeHiwWsmv'
var txfrom = 'rffARVU6tptSvwNeuqUrLD6KTwFwvq7C11'
// var txfrom = '123'
var txto = 'rQHzdWhU9i1oz6LksVPtvUCoKfeHiwWsmv'
var txamount = 0.01001
var wrongamount = '10000000000'

var txtag = '10124'
var username = 'kimi'

var txid = '2609DE696622A8D0149DE5A50CD1D035BFF6989AD65257C69857439921D010F7'
var fakeTxid = '2609DE696622A8D0149DE5A50CD1D035BFF6989AD65257C69857439921D010F8'
var wrongtxid = '123'

var account = 'testClient'
var wrong = 'notfound'

var obj = {
            from : txfrom ,
            to : txto ,
            amount: txamount ,
            // account: username,
            // tag: txtag   
        }

  var fakeobj = {
            from : txfrom,
            to : txto,
            amount: wrongamount ,
            // tag: txtag   
        }

// request.newAddress('Tom')
// request.getAddress(12323112123312)   
// request.getBalance('1234,rffARVU6tptSvwNeuqUrLD6KTwFwvq7C11')

// request.getTransactionById(txid)
// request.getTransactionById(fakeTxid)
// request.getTransactionById(wrongtxid)

// request.sendTransaction(obj)
// request.sendTransaction(fakeobj)
// console.log(typeof(typeof('string')) )


// request.testError()


// var test =  {            
//                account: '1_8',
//                address: '10142, rffARVU6tptSvwNeuqUrLD6KTwFwvq7C11' ,
//                txid:    '020202020202020202',
//                index:    201301232310312031202130,
//                amount:   1,
//                detail:   'test'             
//             }

// request.pushTransaction( 'xrp', test )


// var result =  uility.isAddress(txto)

