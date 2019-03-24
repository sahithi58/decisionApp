// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const fetch = require('node-fetch');
const axios = require('axios');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  const gge = JSON.stringify(request.body.queryResult.queryText);
  var user1 = 0; //dishari
  var user2 = 0; //priyanka
  var user3 = 0; //sahithi
  var currUserType = 0;
  let conv = agent.conv();
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
  
  
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  
  var res = 0;
  function needQuote(agentParam){
    console.log("currUser from context")
    return new Promise((resolve,reject) => {      
     callNLP(gge,agentParam).then((res)=>{
      var val = res.documentSentiment.score;
      console.log(">>>>>>>>", val);
    	if(Number(val) < 0){
          console.log(">>>>>>>> negative");
			agentParam.add(`Dont worry I got your back`);
        } else if(Number(val) > 0){
        	agentParam.add(`Thats great to hear. Awseome!`);
        } else {
        	agentParam.add(`So! How do you feel about it?`);
        }
       resolve();
    });
    });
  }

  function setUser(agent){
    console.log("in user");
  	const username =  request.body.queryResult.parameters.UserName;
  	console.log("In set suser",username);
    nameSelect(username,agent);
    console.log("Agent val>>>>>>>>>>>>>", agent);
    agent.add(`username ${username}`);
  }
  
  
 function getDetails(){
   return axios.get("https://shebotbackend-91567.firebaseio.com/users.json")
        .then(response=>{
          //console.log(response.data);
          return response.data;
        });
  }
  
  getDetails().then((res)=>{
    user1 = res['-LahKS1JNqmXquMlsSXb'].type;
    user2 = res['-Lahnj0VRY9-DMB0TZR0'].type;
    user3 = res['-LaifnxS-C2CedWyoied'].type;
	console.log("user1>>>>",user1);
    console.log("user2>>>>",user2);
    console.log("user3>>>>",user3);
  });
  
  
  function nameSelect(userName,agentParams){
    console.log("In Nameselect", userName);
    userName = userName.replace(new RegExp("\"", 'g'), "");
    console.log("In Nameselect11", agentParams.context);
    getDetails(agentParams);
  	switch(userName){
      case "Nora":
        	currUserType = user1;
      		break;
      case "Jane":
        	currUserType = user2;
        break;
      case "Kelly":
        currUserType = user3;
        break;
      default:
        console.log("defa",userName);
        agentParams.add("Not part of our app! Will be added soon");
        break;
    }
   agentParams.setContext({
  'name':'currentUser',
  'lifespan': 1,
  'parameters':{
    'userType':currUserType
    }
});
    //return agentParams;
  }
  
  
  function callNLP(text,agent) {
  console.log(text);
    console.log("CurrentUserType>>>>", agent.getContext('currentUser'));
    const bb = {"document":{
    "type":"PLAIN_TEXT",
    "content": text},
    "encodingType": "UTF8"};

    const url = "https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyA9guEUoOC03VhMcEuXf5fvVlsbva5ogj8";

  	return fetch(url,{
    	method: 'post',
      headers: {
        	"Content-Type":"application/json",
            "Accept": "application/json"
        },
      body: (JSON.stringify(bb)),

    }).then(function(response){return response.json();});
  }
  
  
  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('SetUser', setUser);
  intentMap.set('NeedQuote', needQuote);
  
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
