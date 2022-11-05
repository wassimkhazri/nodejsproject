const http = require('http')

const hostname = '127.0.0.1';
const port = 5000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
     res.setHeader('Content-Type', 'text/plain');
   if (req.url == '/home'){
    res.write('welcome home')
   }else if(req.url=='/contact'){
    res.write('welcome to contact')
   }
   else if(req.url=='/about') {
    res.write('My name is wassim khazri\n')
    res.write("I'm from Tunisia")
   }
   else {
    res.statusCode=404;
    res.write('Page not Found')
   }
    //res.setHeader('Content-Type', 'image/bmp');
    //res.write('welcome home\n');
   



    res.end()

})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})