import 'dotenv/config'
import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import { WebSocketServer } from "./websocket.server";
import { MqttClient } from "./mqtt.client";
import routes from './routes';

mongoose.connect('mongodb://root:example@localhost:27017/admin')
    .then(() => console.log('Connected!'));

const PORT = 3001;
const webSocketServer = new WebSocketServer(PORT);

const brokerUrl = `mqtt://${process.env.MQTT_BROKER_URL}`;
const mqttClient = new MqttClient(brokerUrl, webSocketServer);
mqttClient.subscribeToTopic(`${process.env.MQTT_TOPIC}`);

const app = express();
const HTTP_PORT = 3005;
app.use(cors());
app.use(express.json());
app.use('/', routes);
app.listen(HTTP_PORT, () => {
  console.log(`Servidor HTTP está rodando em http://localhost:${HTTP_PORT}`);
});
