import axios from 'axios';

const upload = async (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'fiverr');

  try {
    const resp = await axios.post(
      import.meta.env.VITE_CLOUDINADY_UPLOAD_LINK,
      data
    );
    const { url } = resp.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;
