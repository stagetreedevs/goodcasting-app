import provider from './config';

export async function getCategories() {
  try {
    const response = await provider.get('/job/category/');
    //console.log("Category =>"+response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
}

export async function getProfiles() {
  try {
    const response = await provider.get('/job/profile/');
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}

export async function getArtists(payload) {
  try {
    const response = await provider.post(
      '/job/solicitation/briefing/',
      payload,
    );
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}
