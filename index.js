var mqtt = require('mqtt')
var local  = mqtt.connect("mqtt://13.114.74.135:1883")
local.subscribe("temp")

var mss1= 0; 
var mss2= 0;

local.on('message', function (topic, message) {
    // message is Buffer
    var json = JSON.parse(message.toString());
    var ms = Date.now() - json.timestamp ;
      console.log("Local"+json.id+": " + ms)

    // subscriberAt1.end()
  })


 
var global  = mqtt.connect("mqtt://18.183.32.165:1884")
global.subscribe("temp")
global.on('message', function (topic, message) {
    // message is Buffer
    var json = JSON.parse(message.toString());
    var ms = Date.now() - json.timestamp ;
// console.log(ms)
mss2 += ms;
// console.log(mss2);
console.log("Global "+json.id+": " + ms)

    // console.log(message.toString() +  " : " +Date.now().toString())
    // subscriberAt2.end()
  })




var publisherAt1  = mqtt.connect("mqtt://13.114.74.135:1883")
var publisherAt2  = mqtt.connect("mqtt://13.114.74.135:1883")

var messageAt1 = {
  sensor: "sensor 1",
  temp: 24.8,
  timestamp: Date.now(),
}
var messageAt2 = {
  sensor: "sensor 2",
  temp: 24.8,
  timestamp: Date.now()
}
for (let index = 0; index < 10; index++) {
  messageAt1.id = index;
  messageAt2.id = index;
  publisherAt1.publish("temp",JSON.stringify(messageAt1));
  publisherAt2.publish("temp",JSON.stringify(messageAt2));
}
// publisherAt1.publish("temp",JSON.stringify(messageAt1));
// publisherAt1.publish("temp",JSON.stringify(messageAt1));
// publisherAt1.publish("temp",JSON.stringify(messageAt1));
// publisherAt1.publish("temp",JSON.stringify(messageAt1));
// publisherAt1.publish("temp",JSON.stringify(messageAt1));


