import { useState } from 'react'
import './App.css'

class Message{
  time: Date = new Date() ;
  senderId: string = '';
  data : Data;
  constructor(time: Date,senderId: string,data : Data){
    this.time = time;
    this.senderId = senderId;
    this.data = data;
  }
  display():void { 
    console.log("Time is  :   "+this.time);
    console.log("SenderID is  :   "+this.senderId);
    console.log("Data is: "+JSON.stringify(this.data));
 } 
}
class Data{
  Type: number = 0;
  Source:string = '';
  constructor(Type:number,Source:string){
    this.Type = Type;
    this.Source = Source;
  }
  display():void { 
    console.log("Type is  :   "+this.Type)
    console.log("Source is  :   "+this.Source) 
 } 
}
class Thread{
   ThreadId: string = '';
   Messages: Message[];
   constructor(ThreadId:string,Messages:Message[]){
    this.ThreadId = ThreadId;
    this.Messages = Messages;
   }
   display():void { 
    console.log("ThreadId is  :   "+this.ThreadId)
    console.log("Messages Array has  :   "+JSON.stringify(this.Messages))
 } 
}
class SubmitMessageRequest{
  ThreadId: string;
  AddedMessage: Message;
  constructor(ThreadId:string,AddedMessage:Message){
    this.ThreadId = ThreadId;
    this.AddedMessage = AddedMessage;
  }
  display():void { 
    console.log("ThreadId is  :   "+this.ThreadId)
    console.log("AddedMessages is  :   "+JSON.stringify(this.AddedMessage))
 } 
}
var Dataobj1 = new Data(3,'Change This to A');
var Messageobj1 = new Message(new Date(),'Karthik',Dataobj1);
var Dataobj2 = new Data(3,'Change This to B');
var Messageobj2 = new Message(new Date(),'Vishwanath',Dataobj2);
var Threadobj = new Thread('1A2B3C',[Messageobj1,Messageobj2]);
var SubmitMessageRequestobj1 = new SubmitMessageRequest('1A2B3C',Messageobj1);
var SubmitMessageRequestobj2 = new SubmitMessageRequest('1A2B3C',Messageobj2);
Dataobj1.display();
Dataobj2.display();
Messageobj1.display();
Messageobj2.display();
Threadobj.display();
SubmitMessageRequestobj1.display();
SubmitMessageRequestobj2.display();
function App() {
  const [message, setMessage] = useState(Threadobj.Messages)
  // const [displayMsg,setDisplayMsg] = useState<boolean>(true)
  let msg = ''
  return (
    <>
      <div className='ChatTemplate'>
        <div className='MessageDisplay'>
            {
            Threadobj.Messages.map((item,index)=>{
                  return(
                  <div className='MessageContent'>
                    <p className='MessageSender'>{item.senderId}</p> 
                    <p>{item.data.Source}</p>
                    <p className='MessageTime'>{item.time.toLocaleTimeString()}</p>
                  </div>
                  )
              })
            }
        </div>
        <div className='MessageSend'>
          <input type='text' placeholder='Enter Message' className='InputMessageBox'
            onChange={(event)=>{
              msg = event.target.value
            }}
          />
          <button className='SendMessageBtn' onClick={()=>{
            
            // message.push(msg)
            let Dataobj3 = new Data(3,msg)
            Dataobj3.display();
            let Messageobj3 = new Message(new Date(),'Karthik',Dataobj3);
            Messageobj3.display();
            let SubmitMessageRequestobj3= new SubmitMessageRequest('1A2B3C',Messageobj3)
            SubmitMessageRequestobj3.display()
            let data = [...Threadobj.Messages,Messageobj3]
            setMessage(data)
            Threadobj.Messages.push(Messageobj3)
            Threadobj.display();
          }}>
            Send Msg</button>
        </div>
      </div>
    </>
  )
}

export default App
