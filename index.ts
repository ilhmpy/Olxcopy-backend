import { Config } from "./config/config";
import * as signalR from "@microsoft/signalr";
import express from "express";

const index = express();
const url = `${Config.url}:${Config.port}`

async function start() {
    try {
        await index.listen(url);
        console.log("Server start");
    } catch(e) {
        console.log("Server not start");
    };
};

start();

let connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Trace)
    .withUrl(url)
    .build();

connection.start()
    .then(() => {
        console.log("THIS IS FUCKING SHIT IS WORK!");
    }).catch((e) => {
    console.log(e);
});

/* 
import signalR from "node-signalr";

const url = `${Config.url}:${Config.port}/${Config.hub}`;
let client = new signalR.client(url, [Config.hub]);

client.headers["Token"] = Config.token;
client.callTimeout = Config.callTimeout;
client.reconnectDelayTime = Config.reconnectDelayTime;
client.requestTimeout = Config.requestTimeout;

client.on("connected", () => {
    console.log(`SignalR server started on ${Config.url}:${Config.port}`);
});

client.on('reconnecting', (count: number) => {
    console.log(`SignalR server reconnecting(${count}).`);
});

client.on('disconnected', (code: string) => {
    console.log(`SignalR server disconnected(${code}).`);
});

client.on('error', (code: number, ex: any) => {
   console.log(`SignalR server connect error: ${code} - ${ex}.`);
});

client.connection.hub.on('testHub', 'getMessage', (message: any) => {
    console.log('receive:', message)
  });

  client.connection.hub.call('testHub', 'send', "").then((result: any) => {
    console.log('success:', result)
  }).catch((error) => {
    console.log('error:', error)
  });

  client.connection.hub.invoke('testHub', 'send', "");

client.start(); */