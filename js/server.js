const express = require('express');
const axios = require('axios');
const cors = require('cors');

const PORT = process.env.PORT || 3030;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const response = await axios.post('https://api.assemblyai.com/v2/realtime/token', // use account token to get a temp user token
      { expires_in: 3600 }, // can set a TTL timer in seconds.
      { headers: { authorization: '6c31acb2b59245ee9ab156b71c56347f' } }); // AssemblyAI API Key goes here
    const { data } = response;
    res.json(data);
  } catch (error) {
    const {response: {status, data}} = error;
    res.status(status).json(data);
  }
});

const server = app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
