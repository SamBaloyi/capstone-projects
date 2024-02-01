const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const musicRoutes = require('./routes/music.routes');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/music', musicRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
