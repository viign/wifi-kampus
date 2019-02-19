const https = require("https");
const http = require("http");
const urlib = require("url");
const fs = require('fs');
const querystring = require('querystring');
const readline = require("readline");
const readiface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const CLEAR = '\x1b\x5b\x33\x4a\x1b\x5b\x48\x1b\x5b\x32\x4a';

const url = "https://welcome2.wifi.id/authnew/login/check_login.php?ipc=10.200.242.136&gw_id=WAG-D4-KBU&mac=ac:d1:b8:f8:b5:d5&redirect=http://8.8.8.8/&wlan=SLOKRT00500/TLK-WI995843-0001:@wifi.id";
// const url = "http://128.0.0.1";
const trigger_url="http://www.gstatic.com/generate_204";
// const parsed_url = urlib.parse(url);

var body = "";
var cookie = "";
var payload = {};
var content;
var port = (protocol) => {
  protocol = protocol.replace(':','');
  if(protocol=='http'){
    return 80;
  } else if(protocol=='https'){
    return 443;
  }
}

var parsed_url;

/*
username=030423137@ut.ac.id@komunitas.ut&password=2018224091995&landURL=
let regex_url = new RegExp("/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/");

if(regex_url.test(ino)){
return "Valid url";
} else{
return "Invalid URL!";
system.exit(1);
}
*/
// console.log(CLEAR);
console.log("Wifi.id Kampus Injector @2019\n");

readiface.question("Enter your landing url (with http): ",(ino) => {

  getLoginUrl(ino);
  readiface.close();
});

function getLoginUrl(url){
  parsed_url = urlib.parse(url);
  console.log(parsed_url);
  console.log(port(parsed_url.protocol));

  https.get({
    hostname: parsed_url.hostname,
    port: port(parsed_url.protocol),
    path: parsed_url.path,
    agent: false  // create a new agent just for this one request
  }, (res) => {
    console.log(res);
  });


  // getFile();
}
//
// function getFile(){
//   fs.readFile('assets/kampus.txt', function read(err, data) {
//     if (err) {
//       throw err;
//     }
//     content = data.toString();
//
//     processFile();
//   });
// }
//
// function processFile() {
//   let fileps = content.split("\r\n");
//   // console.log(fileps);
//
//   for(let c=0;c<fileps.length;c++){
//     // console.log(fileps[c]);
//
//     let acc = fileps[c].split("|");
//
//     payload = {
//       "username": acc[0]+"@komunitas.ut",
//       "password": acc[1],
//       "landURL": ""
//     };
//     let postdata = querystring.stringify(payload);
//
//     var options = {
//       hostname: parsed_url.hostname,
//       port: parsed_url.port ? parsed_url.port : 443,
//       path: parsed_url.path,
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Content-Length': postdata.length,
//       }
//     };
//     // console.log(options);
//
//     var req = https.request(options, (res) => {
//       res.on('data', (d) => {
//         console.log(d.toString());
//       });
//       //
//       // res.on('end',() => {
//       //   // console.log("OK !");
//       // })
//
//     });
//
//     req.on('error', (e) => {
//       console.error(e);
//     });
//
//     req.write(postdata);
//     req.end();
//   }
// }
