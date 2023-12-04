import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:3005'
  });

export const updateLimit = async (limits) => {
    await client.post('/limits/set', {...limits});
}


export const registerEmail = async (email) => {
    console.log('SE:::', email)
    await client.post('/email/register', {email});
}
