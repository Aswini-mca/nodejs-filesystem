const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send('File system creation using Node js')
});

//API endpoint to create a text file in a particular folder
// '/createFile' is endpoint name

app.post('/createFile', (req, res) => {
    const now = new Date();
    const fileName = `${now.toISOString().replace(/:/g, '-')}.txt`;
    const content = now.toString();
    const folderPath = 'files'; // Make sure 'files' folder exists
  
    const filePath = path.join(__dirname, folderPath, fileName);
  
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
  
      res.send('File created successfully!');
    });
});

// Endpoint to retrieve all text files in a folder
//'/getFiles' is endpoint name
app.get('/getFiles', (req, res) => {
    const folderPath = 'files'; // Change this to the folder path you want to retrieve files from
  
    fs.readdir(path.join(__dirname, folderPath), (err, files) => {
      if (err) {
        return res.status(500).send(err);
      }
  
      const textFiles = files.filter(file => file.endsWith('.txt'));
      res.json(textFiles);
    });
  });

app.listen(3000,() => console.log('The server started on the port 3000'));