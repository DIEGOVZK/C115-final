import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:3005'
  });

export const updateAccX = async (limits) => {
    await client.post('/accx/limits/set', limits);
}

export const updateAccY = async (limits) => {
    await client.post('/accx/limits/set', limits);
}

export const updateAccZ = async (limits) => {
    await client.post('/accx/limits/set', limits);
}

export const updateGyroX = async (limits) => {
    await client.post('/gyrox/limits/set', limits);
}

export const updateGyroY = async (limits) => {
    await client.post('/gyroy/limits/set', limits);
}

export const updateGyroZ = async (limits) => {
    await client.post('/gyroz/limits/set', limits);
}