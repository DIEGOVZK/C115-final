import * as mqtt from 'mqtt';
import { WebSocketServer } from './websocket.server';
import { Alerts } from './services/alerts.services';

export class MqttClient {
  private client: any;

  constructor(private brokerUrl: string, wsServer: WebSocketServer) {
    this.client = mqtt.connect(brokerUrl);

    this.client.on('connect', () => {
      console.log('Conectado ao broker MQTT');
    });

    this.client.on('message', (topic: any, message: any) => {
      if (topic === '68:C6:3A:88:CA:E9') {
        Alerts.checkValuesAndSendAlerts(JSON.parse(message.toString()))
        wsServer.broadcastMessage(message.toString());
      }
    });

    this.client.on('close', () => {
      console.log('Conexão MQTT fechada');
    });

    this.client.on('error', (error: any) => {
      console.error(`Erro no cliente MQTT: ${error}`);
    });
  }

  public publishMessage(topic: string, message: string): void {
    this.client.publish(topic, message);
  }

  public subscribeToTopic(topic: string): void {
    this.client.subscribe(topic, (err: any) => {
      if (!err) {
        console.log(`Inscrito no tópico '${topic}'`);
      }
    });
  }
}
