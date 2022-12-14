const Websocket = require('ws');
const sigPort = 8010
const wss = new Websocket.Server({port:sigPort},()=>
    console.log(`Signalling server listening on port ${sigPort}`)
);

wss.broadcast = (ws,data)=>{
    wss.clients.forEach((client)=>{
        if(client!== ws && client.readyState === WebSocket.OPEN){
            client.send(data)
        }
    })
};

wss.on('connection',ws=>{
    console.log('Client conneted. Total connected clients: ${wss.clients.size}')

    ws.on('messages',message=>{
        console.log(message + "\n\n")   
        wss.broadcast(ws,message)     
    });

    ws.on('close',ws=>{
        console.log(`Client disconnected. Total connected clients: ${wss.clients.size}`)
    })

    ws.on('error',error=>{
        console.log(`Client error. Total connected clients: ${wss.clients.size}`)
    })
})