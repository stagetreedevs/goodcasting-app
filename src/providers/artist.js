import provider from './config';

export async function getArtists(params, token) {
  try {
    const response = await provider.get('/user/artist/', {
      params,
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}

export async function getArtist(id, token) {
  try {
    const response = await provider.get(`/user/artist/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}

export async function getBriefingArtist(id) {
  try {
    const response = await provider.get('/user/artist/briefing-artist/', {
      params: {
        artist: id,
      },
    });
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}

export async function getArtistStatus(id, token) {
  try {
    const response = await provider.get(`/user/artist/status/`, {
      params: {
        artist: id,
      },
    });
    return response;
  } catch (err) {
    return err;
  }
}
