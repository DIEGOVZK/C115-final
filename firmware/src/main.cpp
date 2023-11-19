#define DEBUG

#include <SPI.h>
#include <Wire.h>
#include <Arduino.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_MPU6050.h>
#include <os_type.h>

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

void read_mpu()
{
    sensors_event_t acc, gyro, temp;
    mpu.getEvent(&acc, &gyro, &temp);

    accX = acc.acceleration.x;
    accY = acc.acceleration.y;
    accZ = acc.acceleration.z;

    gyroX = gyro.gyro.x;
    gyroY = gyro.gyro.y;
    gyroZ = gyro.gyro.z;

    return;
}

void port_to_mqtt()
{
    // todo: post to mqtt
    return;
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

    os_timer_setfn(&ms50, ms50_isr, NULL);
    os_timer_arm(&ms50, 25, true);

    os_timer_setfn(&ms1000, ms1000_isr, NULL);
    os_timer_arm(&ms1000, 1000, true);

    #ifdef DEBUG
    Serial.begin(115200);
    #endif
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
        port_to_mqtt();
        event_flags.ms1000_timer = 0;
    }

    #ifdef DEBUG
    Serial.printf("\raccX:%.3f,accY:%.3f,accZ:%.3f", accX, accY, accZ);
    Serial.printf("gyroX:%.3f,gyroY:%.3f,gyroZ:%.3f\n", gyroX, gyroY, gyroZ);
    #endif
}