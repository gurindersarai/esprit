import Echo from 'laravel-echo';
import React, {useState,useRef,useEffect } from "react";
import { Link, useForm, usePage,Head } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Pusher from 'pusher-js';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Message from './Message';
function View() {
    const props = usePage().props;
    const messagesDivRef = useRef(null);
    console.log(props);  
  const [messages,setMessage] = useState(props.messages);
    const { data, setData, post, processing,progress , errors, recentlySuccessful } = useForm({
        message: '',
  });
  const submit = (e) => {
    e.preventDefault();
    post(route('messages.store',props.to_user));
    setData('message','');

};
useEffect(() => {
  scrollToBottom();
  document.body.style.overflow = 'hidden';

}, [])

const scrollToBottom = () => {
  console.log('mmm',messagesDivRef);
  messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight;

  // messagesDivRef.current.scrollIntoView({ behavior: 'smooth'});
}

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'esprit',
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  cluster:import.meta.env.VITE_PUSHER_APP_CLUSTER,
});
    window.Echo.private('chat')
  .listen('MessageSent', (e) => {
    console.log('e',e);
    setMessage([...messages,{id:e.message.id,content:e.message.content,from_user:e.message.from_user,to_user:e.message.to_user}]);
    scrollToBottom();

  });

  return (
    <AuthenticatedLayout
    auth={props.auth}
    errors={props.errors}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Messages</h2>}
>
    <Head title={'Message - '+props.to_user.name} />
    <div onClick={() => scrollToBottom()}>Scroll</div>

<div className="flex h-screen  antialiased text-gray-800 bg-gray-100 dark:bg-gray-900">

    <div className="flex flex-row h-full w-full overflow-x-hidden" >
      <div className="flex flex-col flex-auto h-full ">
        <div
          className="flex flex-col flex-auto flex-shrink-0  h-full"
        >
          <div className="flex flex-col h-full overflow-x-auto mb-4" id="messages" ref={messagesDivRef}>
            <div className="flex flex-col h-full" >
              <div className="grid grid-cols-12 gap-y-2" >
              {messages.map((message,i) => (
                 <Message message={message}  index={i} key={i} />
                ))}
                
            
                {/* <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div
                      className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                      <div className="flex flex-row items-center">
                        <button
                          className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-800 rounded-full h-8 w-10"
                        >
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </button>
                        <div className="flex flex-row items-center space-x-px ml-4">
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-4 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-12 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-6 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-5 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-4 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-3 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-1 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-1 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-4 w-1 bg-gray-500 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div
            className="flex flex-row items-center h-16 absolute left-0 bottom-0 bg-gray-100 dark:bg-gray-900 w-full px-6"
          >
            <div>
              <button
                className="flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex-grow ml-4">
              <div className="relative w-full">
                <input  onChange={(e) => setData('message', e.target.value)}
                 value={data.message}
                 required
                  type="text"
                  className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                />
                <button
                  className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="ml-4">


              <button onClick={(e)=> submit(e)}
                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <Transition
    show={recentlySuccessful}
    enterFrom="opacity-0"
    leaveTo="opacity-0"
    className="transition ease-in-out"
>
    <p className="text-sm text-gray-800 dark:text-gray-200">Sent--</p>
    </Transition>
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </AuthenticatedLayout>
  )
}

export default View;