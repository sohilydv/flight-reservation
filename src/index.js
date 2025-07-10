const express = require('express');

const  {serverConfig, logger} = require('./config');
const apiRoutes = require('./routes');
const app = express();
app.use(express.json());
app.use('/api', apiRoutes);

app.listen(serverConfig.PORT, () => {
    console.log(`server listening at http://localhost:${serverConfig.PORT}`);
});