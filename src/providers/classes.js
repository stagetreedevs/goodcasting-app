import provider from './config';

export async function getClasses(token) {
  try {
    const response = await provider.get('/video/class/', {
      params: {
        is_active: true,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}
