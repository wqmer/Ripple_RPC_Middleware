const express = require('express');
const bodyParser = require('body-parser');
const RippleAPI = require('ripple-lib').RippleAPI;
const jayson = require('jayson/promise');
const myRpcApi = require('../ripple/myRipple')
const sql = require('../mysql/query')
const toTxData = require('../ripple/uility').toTxData
const service = require('../product/service')
const uility = require('../ripple/uility')
const config = require('../config')

// create a server
var server = jayson.server({

  new_address: function(args) {
    return sql.newAccount(args[0])
  },

  get_address: function(args) {
    return sql.getAddressByAccount(args[0])
  },

  get_balance: function(args) {
    return service.getBalanceByTagOrAd(args[0])
  },

  get_transaction_id: function(args) {
    // return service.getTransactionByid(args[0])
    return service.getTransactionByhash(args[0])
  },

  send_transaction: function(args) {
    return service.withdrawlRipple(args[0])
  },

  commit_deposit: function(args) {
    return service.commitDepositByObj(args[0])
  },

  // receive_transaction: function(args, callback){
  //   var info = {
  //               type : args[0] ,
  //               status :   args[1] == undefined ? 'failed' : 'success'
  //   }
  //   callback(null, info)
  // },



  //--------------------------todo---------------------------------------------

  rollback_receive_transaction: function(args, callback){
    callback(null,  )
  },

  set_setting: function(args, callback){
    callback(null,  )
  },


});


server.http().listen(config.app_server.port);