const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;  // Use a different port

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/deduct', async (req, res) => {
    const { id } = req.body;

    const requestData = { id };
    console.log('Request Data:', requestData);

    try {
        const response = await axios.post('http://go-backend-service:3000/deduct', requestData);
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Error Response Data:', error.response.data);
            console.error('Error Response Status:', error.response.status);
            console.error('Error Response Headers:', error.response.headers);
            res.status(error.response.status).json(error.response.data);
        } else if (error.request) {
            console.error('Error Request Data:', error.request);
            res.status(500).json({ error: 'No response received from the deduct server.' });
        } else {
            console.error('Error Message:', error.message);
            res.status(500).json({ error: 'An error occurred while processing your request.' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
