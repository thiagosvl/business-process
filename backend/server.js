const express = require('express');
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
    res.send('API funcionando!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
