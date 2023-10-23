import provider from './config';

export async function getJobs(params, token) {
  try {
    const response = await provider.get('/job/invite/solicitation/', {
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
export async function getArtistByJobs(params, token) {
  try {
    const response = await provider.get('/job/invite/solicitation/casting/', {
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
export async function getGroupChats(invites, token, user_type) {
  try {
    const response = await provider.get('/job/invite/solicitation/group-chats', {
      params: {
        invites: JSON.stringify(invites),
        user_type: user_type
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw Error(error);
  }
}

export async function getJobInvite(id, token) {
  try {
    const response = await provider.get(`/job/invite/solicitation/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}

export async function getJobsByClient(params, token) {
  try {
    const response = await provider.get('/job/solicitation/', {
      params,
      headers: {
        Authorization: 'Token ' + token,
      },
    });
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}

export async function createJob(payload, token) {
  console.log('pay',payload);
  try {
    const response = await provider.post('/job/solicitation/', payload, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log(payload);
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}

export async function updateJob(id, payload, token) {
  try {
    const response = await provider.patch(
      `/job/invite/solicitation/${id}/`,
      payload,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}

export async function deleteJobInvite(id, token) {
  try {
    const response = await provider.delete(`/job/invite/solicitation/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}

export async function updateClientJob(id, payload, token) {
  try {
    const response = await provider.patch(`/job/solicitation/${id}/`, payload, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}

export async function getJob(id, token) {
  try {
    const response = await provider.get(`/job/solicitation/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}

export async function getTags(token) {
  try {
    const response = await provider.get('/user/evaluation/tag/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}

export async function evaluateArtist(payload, token) {
  try {
    const response = await provider.post('/user/evaluation/artist/', payload, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err.response)
    throw Error(err);
  }
}

export async function evaluateClient(payload, token) {
  try {
    const response = await provider.post('/user/evaluation/client/', payload, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err.response)
    throw Error(err);
  }
}
