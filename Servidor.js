var express = require('express')
var app = express()
var server = require('http').Server(app)

var io = require('socket.io')(server)
var os = require('os')
var net = require('net')

var interfaces = os.networkInterfaces()
var addresses = [];
for(var k in interfaces) {
    for(var k2 in interfaces[k]) {
        var address = interfaces[k][k2]
        if(address.family == 'IPv4' && !address.internal) {
            addresses.push(address.address)
        }
    }
} 

var HOST = addresses[0]
var PORT = process.env.PORT || 8080

io.on('connection', function(socket) {
    console.log("Conectado: " + socket)
})

server.listen(PORT, function() {
    console.log("Servidor Activo: " + PORT)
})

net.createServer(function(sock) {
    console.log("Conectado: " + sock.remoteAddress + ":" + sock.remotePort)
    sock.on('data', function(data) {
        console.log(data.toString())
    })
    
    sock.on('close', function() {
        console.log("Desconectado: "  + sock.remoteAddress + ":" + sock.remotePort)
    })
}).listen(PORT, HOST)