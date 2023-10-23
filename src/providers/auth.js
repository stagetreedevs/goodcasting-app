import provider from './config';

export async function clientLogin(payload) {
  try {
    console.log('Payload ==>',payload);
    const response = await provider.post('/client/authentication/', payload);
    return response.data;
  } catch (err) {
    console.log("Erro =>",err);
    throw Error(err);
  }
}

export async function artistLogin(payload) {
  try {
    console.log('Payload ==>',payload);
    const response = await provider.post('/artist/authentication/', payload);
    if (Object.keys(response.data).length === 1) {
      return {first_login: false};
    }
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}

export async function adjustCode(payload) {
  try {
    const response = await provider.post('/user/artist/code/', payload);
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}

export async function checkUserEmail(email) {
  try {
    const response = await provider.get('/validation/', {
      params: {
        email,
      },
    });
    
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}
