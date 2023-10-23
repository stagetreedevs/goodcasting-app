import provider from './config';

export async function createContact(payload) {
  try {
    const response = await provider.post('/support/contact/', payload);
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}
