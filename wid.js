const req = require("request");
const gexurl = /var\surlx\s\s\s\s\s\s\s\s=\s'(.*?)';/mg;
const read = require("readline");
const fs = require("fs");
const readi = read.createInterface({
  input: process.stdin,
  output: process.stdout
});
const CLEAR = '\x1b\x5b\x33\x4a\x1b\x5b\x48\x1b\x5b\x32\x4a';

var trigger;
var real_url;

function swKampus(a){
  switch (a.split("@")[1]) {
    case "unej":
    t = (a = a.replace("@unej", "")) + "@komunitas.unej";
    break;
    case "umaha":
    t = (a = a.replace("@umaha", "")) + "@komunitas.umaha";
    break;
    case "trisakti":
    t = (a = a.replace("@trisakti", "")) + "@komunitas.trisakti";
    break;
    case "itdel":
    t = (a = a.replace("@itdel", "")) + "@komunitas.itdel";
    break;
    case "polije":
    t = (a = a.replace("@polije", "")) + "@komunitas.polije";
    break;
    case "ut.ac.id":
    t = a + "@komunitas.ut";
    break;
    case "unsiq":
    t = (a = a.replace("@unsiq", "")) + "@komunitas.unsiq";
    break;
    default:
    t = a + "@freeMS.vmgmt";
  }

  return t;
}
function fexit(){
  process.exit();
}

function find_url(process){
  req(trigger,(e,r,b)=>{
    let m = gexurl.exec(b);
    
    if(!Array.isArray(m)){
      console.log("Can't find post URL!");
      fexit();
    }

    real_url = m[1];

    process();
  })
}
function readStream(err, data) {

  if (err) {
    throw err;
  }

  let content = data.toString().split("\n");

  for(let c=0;c<content.length;c++){
    let acc = content[c].split("|");
    let uname = swKampus(acc[0]);

    let payload = {
      "username": uname,
      "password": acc[1],
      "landURL": ""
    };

    req.post({
      url: real_url,
      form: payload
    }, function postRequest(e,r,b) {
      try{
        let prsed = JSON.parse(b);

        if(prsed.result==1){
          console.log("\x1b[32m"+payload.username+" | Result ["+prsed.result+"]"+" | Message = "+prsed.message+"\x1b[0m");

          fexit();
        } else{
          console.log(payload.username+" | Result ["+prsed.result+"]"+" | Message = "+prsed.message+"\x1b[0m");
        }

      }
      catch (error){
        console.log("\x1b[31m"+"Skipping Response [Invalid Content-Type]"+"\x1b[0m");
      }

    })
  }
}

function processx(){
  console.log("Please Wait ... \n");
  fs.readFile('assets/merge.txt', readStream);
}

readi.question("Enter your landing url (http/s): ",(ix) => {
  if(ix.length==0){
    console.log("Invalid URL!");
    fexit();
  }

  trigger = ix;
  readi.close();
  find_url(processx);
});
