var mqtt = require('mqtt')
var subscriberAt1  = mqtt.connect("mqtt://18.182.60.4:1884")
subscriberAt1.subscribe("temp")

var mss1= 0; 
var mss2= 0;

subscriberAt1.on('message', function (topic, message) {
    // message is Buffer
    var json = JSON.parse(message.toString());
    var ms = Date.now() - json.timestamp ;
      console.log("Sub1: " + ms)

    // subscriberAt1.end()
  })


 
var subscriberAt2  = mqtt.connect("mqtt://18.182.60.4:1884")
subscriberAt2.subscribe("temp")
subscriberAt2.on('message', function (topic, message) {
    // message is Buffer
    var json = JSON.parse(message.toString());
    var ms = Date.now() - json.timestamp ;
// console.log(ms)
mss2 += ms;
// console.log(mss2);
console.log("Sub2: " + ms)

    // console.log(message.toString() +  " : " +Date.now().toString())
    // subscriberAt2.end()
  })




var publisherAt1  = mqtt.connect("mqtt://35.77.103.62:1883")

var messageAt1 = {
  sensor: "sensor 1",
  temp: 24.8,
  timestamp: Date.now()
}

for (let index = 0; index < 10; index++) {
  publisherAt1.publish("temp",JSON.stringify(messageAt1));
  
  
}
// publisherAt1.publish("temp",JSON.stringify(messageAt1));
// publisherAt1.publish("temp",JSON.stringify(messageAt1));
// publisherAt1.publish("temp",JSON.stringify(messageAt1));
// publisherAt1.publish("temp",JSON.stringify(messageAt1));
// publisherAt1.publish("temp",JSON.stringify(messageAt1));

