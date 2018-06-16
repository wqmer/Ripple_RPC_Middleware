

const request = require('./client')
const uility = require('../ripple/uility')
const depositTx = require('../ripple/myRipple')
const sql = require('../mysql/query')
// const {Tx} = require('./model')

var jiusite = 'rffARVU6tptSvwNeuqUrLD6KTwFwvq7C11'
var customer = 'rQHzdWhU9i1oz6LksVPtvUCoKfeHiwWsmv'
var txtag = '10108'
var txamount = 0.01


depositTx.sendTransaction(customer,jiusite,txamount,txtag).then(result => console.log(result))

// var test =  {            
//                account: '1_8',
//                address: '10166,rffARVU6tptSvwNeuqUrLD6KTwFwvq7C11' ,
//                txid:    'test',
//                index:    30000,
//                amount:   1,
//                detail:   'test'             
//             }


// var username = 'kimi'
// var txid = '2609DE696622A8D0149DE5A50CD1D035BFF6989AD65257C69857439921D010F7'
// var fakeTxid = '2609DE696622A8D0149DE5A50CD1D035BFF6989AD65257C69857439921D010F8'
// var wrongtxid = '123'

// var account = 'testClient'
// var wrong = 'notfound'

// var withdrawlObj = {
//             from :'rffARVU6tptSvwNeuqUrLD6KTwFwvq7C11' ,
//             to :  'rQHzdWhU9i1oz6LksVPtvUCoKfeHiwWsmv' ,
//             amount: '0.01' ,
//     }


//   var fakeobj = {
//             from : txfrom,
//             to : txto,
//             amount: wrongamount ,
//             // tag: txtag   
//         }

// request.newAddress('Kimmy')


// var test =  {            
//                account: '1_8',
//                address: '10166,rffARVU6tptSvwNeuqUrLD6KTwFwvq7C11' ,
//                txid:    'test',
//                index:    30000,
//                amount:   1,
//                detail:   'test'             
//             }


// request.pushTransactionPromise('123', test)
// .then(data => console.log(data))
// .catch(error => console.log(error))

// request.getAddress(2132133232231)   
// request.getBalance('rffARVU6tptSvwNeuqUrLD6KTwFwvq7C11')

// request.getTransactionById(txid)
// request.getTransactionById(fakeTxid)
// request.getTransactionById(wrongtxid)

// sql.getAccountByTag('101561').then( result => console.log(result))
// sql.getAddressByAccount('1231231232').then( result => console.log(result), err => {
//     console.log (err)
// })
// depositTx.sendTransaction(txfrom,txto,txamount).then(result => console.log(result))

// request.sendTransaction(withdrawlObj)
// request.sendTransaction(fakeobj)


// request.testError()




// request.pushTransaction( 'xrp', test )


// var result =  uility.isAddress(txto)

