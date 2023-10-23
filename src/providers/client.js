import axios from "axios";
import provider from "./config";
const CLIENT_UPLOAD_FILE =
  "https://d3aq2n82oe.execute-api.eu-west-3.amazonaws.com/dev/goodcasting/cliente/";
const ARTIST_UPLOAD_FILE =
  "https://d3aq2n82oe.execute-api.eu-west-3.amazonaws.com/dev/goodcasting/artista/";

export async function createClient(payload) {
  try {
    const response = await provider.post("/user/client/", payload);
    return response.data;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
}

export async function getClient(id, token) {
  try {
    const response = await provider.get(`/user/client/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw Error(err);
  }
}

export async function updateClient(id, payload, token) {
  try {
    const response = await provider.patch(`/user/client/${id}/`, payload, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    throw Error(err);
  }
}

export async function updateArtist(id, payload, token) {
  try {
    const response = await provider.patch(`/user/artist/${id}/`, payload, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    throw Error(err);
  }
}

export async function uploadClientDocument(image) {
  try {
    const response = await axios.post(
      `${CLIENT_UPLOAD_FILE}${image.fileName}`,
      { file: image.base64 }
    );
    //console.log("Photo", response.data);
    return { url: "/cliente/" + image.fileName };
  } catch (error) {
    console.log(error.message);
    throw Error(error);
  }
}

export async function uploadArtistPhoto(photo, user) {
  const name = encodeURI(user.name.replace(/ /g,""))
  const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })).catch((error) =>console.log(error))
  try {
    let base64
    await toDataURL(photo.uri).then((res) => {
      base64 = res
    })
    console.log(name)
    const response = await axios.post(`${ARTIST_UPLOAD_FILE}${name}`, {
      file: base64.replace('data:image/jpeg;base64,', ''),
    })
    return {url: "/artista/"+ name};
  } catch (error) {
    throw Error(error.message);
  }
}
