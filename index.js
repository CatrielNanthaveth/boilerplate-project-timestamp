// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/:date?', (req, res) => {
  const paramsDate = req.params.date;

  let date;
  let resDate;
  
  let dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  let intRegex = /^\d+$/;
  
  if(!paramsDate){
    date = new Date(Date.now());
    resDate = {
      unix: date.getTime(),
      utc: date.toUTCString()
    }
  } else if(paramsDate.match(dateRegex)) {
    date = new Date(paramsDate);
    resDate = {
      unix: date.getTime(),
      utc: date.toUTCString()
    }
  } else if(paramsDate.match(intRegex)) {
    date = new Date(parseInt(paramsDate));
    resDate = {
      unix: date.getTime(),
      utc: date.toUTCString()
    }
  } else {
    resDate = {
      error: 'Invalid Date'
    };
  }

  res.json(resDate);
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
