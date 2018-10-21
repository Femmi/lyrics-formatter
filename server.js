const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/lyrics-formatter'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/lyrics-formatter/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Server started');
});
