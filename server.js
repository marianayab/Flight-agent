const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion , Payload } = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 8080;

app.post("/dialogflow", async (req, res) => {
    var id = (res.req.body.session).substr(43);
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });

    function intro(agent) {
      console.log(`intent  =>  info`);
      agent.add("")
      const payload = {
        "richContent": [
          [
            {
              "type": "chips",
              "options": [
                {
                  "text": "Flight Booking",
              
                },
                {
                  "text": "Flight Schedule",
                 
                }
              ]
            }
          ]
        ]
      }

      agent.add(
          new Payload(agent.UNSPECIFIED, payload,{
              rawPayload: true,
              sendAsMessage: true,
          })
      );
    }

    function hi(agent) {
        console.log(`intent  =>  hi`);
        agent.add("")
    }

    function Sched(agent) {
      console.log(`intent  =>  Available`);
      agent.add("")

      const payload = {
        "richContent": [
          [
            {
              "type": "chips",
              "options": [
                {
                  "text": "Click on the following link for schedule reviewing",
                  
                  "link": "https://karachiairport.com.pk/schedule.aspx"
                }
              ]
            }
          ]
        ]
      }

      agent.add(
          new Payload(agent.UNSPECIFIED, payload,{
              rawPayload: true,
              sendAsMessage: true,
          })
      );
  }

    function sendNotes(agent) {
     console.log(`intent => sendNotes`);
     agent.add("")
    }

    // function sendNotes(agent) {
    //     const { number , date , email} = agent.parameters;
    //    agent.add("")
    // }

    let intentMap = new Map();
    intentMap.set('Intro', intro);
    intentMap.set('hi', hi);
    intentMap.set('Schedule', Sched); 
    intentMap.set('Booking', sendNotes);
    intentMap.set('International', sendNotes);
    intentMap.set('Domestic', sendNotes);
    intentMap.set('Flights', sendNotes);
    intentMap.set('Classes', sendNotes);
    intentMap.set('Ways', sendNotes);
    intentMap.set('Seats', sendNotes);
    

    agent.handleRequest(intentMap);
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});