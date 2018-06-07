const database =  require('./query')

database.getAccountbyTxid('98AF2A25457CAED4E93293D07AD6556CB4B8592E54A22D9583EB75093A7D2CBD').then(result =>console.log(result))

