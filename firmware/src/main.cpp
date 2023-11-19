#include <SPI.h>
#include <Wire.h>
#include <Arduino.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_MPU6050.h>
#include <os_type.h>

#include <ESP8266WiFi.h>
#include <AsyncMqttClient.h>
#include <ArduinoJson.h>
#include <LocalCredentials.h>

AsyncMqttClient mqttClient;

struct event_flags_t
{
    uint8_t command_ready : 1;
    volatile uint8_t ms1000_timer : 1;
    volatile uint8_t ms50_timer : 1;
    uint8_t : 5;
} event_flags;

os_timer_t ms50;
void ms50_isr(void*z)
{
    event_flags.ms50_timer = 1;
}

os_timer_t ms1000;
void ms1000_isr(void*z)
{
    event_flags.ms1000_timer = 1;
}

Adafruit_MPU6050 mpu;
float accX, accY, accZ;
float gyroX, gyroY, gyroZ;

float data[40][6];
uint8_t data_index = 0;

void read_mpu()
{
    sensors_event_t acc, gyro, temp;
    mpu.getEvent(&acc, &gyro, &temp);

    data[data_index][0] = acc.acceleration.x;
    data[data_index][1] = acc.acceleration.y;
    data[data_index][2] = acc.acceleration.z;
    data[data_index][3] = gyro.gyro.x;
    data[data_index][4] = gyro.gyro.y;
    data[data_index][5] = gyro.gyro.z;

    data_index++;
    if (data_index >= 40) data_index = 0;

    return;
}

void post_to_mqtt()
{
    float accX[40], accY[40], accZ[40], gyroX[40], gyroY[40], gyroZ[40];

    for (int i = 0; i < 40; i++) {
        int index = (data_index + i) % 40;
        accX[i] = data[index][0];
        accY[i] = data[index][1];
        accZ[i] = data[index][2];
        gyroX[i] = data[index][3];
        gyroY[i] = data[index][4];
        gyroZ[i] = data[index][5];
    }

    StaticJsonDocument<1024> doc;
    JsonArray accXJson = doc.createNestedArray("accX");
    JsonArray accYJson = doc.createNestedArray("accY");
    JsonArray accZJson = doc.createNestedArray("accZ");
    JsonArray gyroXJson = doc.createNestedArray("gyroX");
    JsonArray gyroYJson = doc.createNestedArray("gyroY");
    JsonArray gyroZJson = doc.createNestedArray("gyroZ");

    for (int i = 0; i < 40; i++) {
        accXJson.add(accX[i]);
        accYJson.add(accY[i]);
        accZJson.add(accZ[i]);
        gyroXJson.add(gyroX[i]);
        gyroYJson.add(gyroY[i]);
        gyroZJson.add(gyroZ[i]);
    }

    String output;
    serializeJson(doc, output);

    String topic = WiFi.macAddress();
    mqttClient.publish(topic.c_str(), 0, true, output.c_str());
}

void setup()
{
    if (!mpu.begin())
    {
        while (true)
        {
        }
    }

    mpu.setHighPassFilter(MPU6050_HIGHPASS_DISABLE);
    mpu.setAccelerometerRange(MPU6050_RANGE_2_G);
    mpu.setFilterBandwidth(MPU6050_BAND_260_HZ);
    mpu.setGyroRange(MPU6050_RANGE_250_DEG);
    mpu.setCycleRate(MPU6050_CYCLE_40_HZ);

    WiFi.mode(WIFI_STA);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(100);
    }

    mqttClient.setServer(MQTT_HOST, MQTT_PORT);
    mqttClient.connect();

    os_timer_setfn(&ms50, ms50_isr, NULL);
    os_timer_arm(&ms50, 25, true);

    os_timer_setfn(&ms1000, ms1000_isr, NULL);
    os_timer_arm(&ms1000, 1000, true);

}

void loop()
{
    if (event_flags.ms50_timer)
    {
        read_mpu();
        event_flags.ms50_timer = 0;
    }

    if (event_flags.ms1000_timer)
    {
        post_to_mqtt();
        event_flags.ms1000_timer = 0;
    }
}