import { useState } from 'react'
import './App.css'
import { messageHandler } from '@estruyf/vscode/dist/client';
import { Button, Modal, Space } from 'antd';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
  Type: string = '';
  Source:string = '';
  constructor(Type:string,Source:string){
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
   Content: Message[];
   constructor(ThreadId:string,Content:Message[]){
    this.ThreadId = ThreadId;
    this.Content = Content;
   }
   display():void { 
    console.log("ThreadId is  :   "+this.ThreadId)
    console.log("Content Array has  :   "+JSON.stringify(this.Content))
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
var Dataobj1 = new Data('url','https://stackoverflow.com/questions/69243006/how-to-pass-data-from-one-js-file-to-another-js-file-through-app-js-in-reactjs');
var Messageobj1 = new Message(new Date(),'Karthik',Dataobj1);
var Dataobj2 = new Data('text','Change This to B');
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
  const [thread, setThread] = useState(Threadobj.Content)
  const [message,setMessage] = useState<string>("")
  // const [displayMsg,setDisplayMsg] = useState<boolean>(true)
  let msg = ''
  
  const sendMessage = () => {
    messageHandler.send('POST_DATA', { msgs: 'Hello from the webview' });
  };
  const requestData = () => {
    messageHandler.request<string>('GET_DATA').then((msgs) => {
      setMessage(msgs);
    });
  };
  requestData()
  return (
    <>
      <div className='ChatTemplate'>
        <div className='MessageDisplay'>
            {
            thread.map((item,index)=>{
                  return(
                  <div className='MessageContent'>
                    <p className='MessageSender'>{item.senderId}</p> 
                    {item.data.Type == 'text' && <Markdown className='ReactMarkdown' remarkPlugins={[remarkGfm]}>{item.data.Source}</Markdown>}
                    {item.data.Type != 'text' && <a href = {item.data.Source}>{item.data.Source}</a>}
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
            
             Modal.confirm({
              title: 'Confirm',
              content: <Markdown remarkPlugins={[remarkGfm]}>{msg}</Markdown>,
              footer: (_, { OkBtn, CancelBtn }) => (
                <>
                  <Button>Custom Button</Button>
                  <CancelBtn />
                  <Button onClick={ ()=>{
                    let Dataobj3 = new Data('text',msg)
                    Dataobj3.display();
                    let Messageobj3 = new Message(new Date(),'Karthik',Dataobj3);
                    Messageobj3.display();
                    let SubmitMessageRequestobj3= new SubmitMessageRequest('1A2B3C',Messageobj3)
                    SubmitMessageRequestobj3.display()
                    let data = [...Threadobj.Content,Messageobj3]
                    setThread(data)
                    Threadobj.Content.push(Messageobj3)
                    Threadobj.display();
                    sendMessage;
                  }}>Ok</Button>
                </>
              ),
            });
          }}>
            Send Msg</button>
        </div>
      </div>
    </>
  )
}

export default App
