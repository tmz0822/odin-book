const express = require('express');

const app = express();

app.listen(process.env.PORT_NUMBER || '3000', () => {
  console.log(`app listening on PORT ${process.env.PORT_NUMBER || '3000'}`);
});
