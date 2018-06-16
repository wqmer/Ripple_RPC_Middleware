const config = {}

config.ripple_rpc = {   
       full:     { server: 'wss://s2.ripple.com' } ,
       general : { server: 'wss://s1.ripple.com' } 
}

config.remote_server = {
            hostname: 'bisail.com',
            path:'/trade/app/rpc/coin',
            auth:'xrprpcuser:xrprpcpassword',
}


config.app_server = {
            hostname: '51.15.20.158',
            port: '3000'
}

config.mysql = {
            host     :  '127.0.0.1',
            user     :  'root',
            password :  '',
            database :  'ripple',
            connectTimeout : 20000 ,
            acquireTimeout : 20000        
}

config.mangodb = {
            url:'mongodb://localhost:27017/Record'
}



module.exports = config