const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', upload.single('audioFile'), (req, res) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    const fileName = 'uploaded_audio' + path.extname(req.file.originalname);
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, req.file.buffer);

    // Now, let's run a Python script using a child process
    const pythonProcess = spawn('python', ['example.py', filePath]);

    // Capture the stdout of the Python script
    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python script output: ${data}`);
    });

    // Handle any errors that may occur
    pythonProcess.on('error', (error) => {
        console.error(`Error executing Python script: ${error.message}`);
    });

    res.send('File uploaded successfully and saved on the server!');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
