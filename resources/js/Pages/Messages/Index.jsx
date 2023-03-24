import Echo from 'laravel-echo';
import React, {useState,useRef } from "react";
import { Link, useForm, usePage,Head } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Pusher from 'pusher-js';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Message from './Message';
import User from './User';
function Index() {
    const props = usePage().props;
    console.log(props);  
  const [users,setUser] = useState(props.users);
    const { data, setData, post, processing,progress , errors, recentlySuccessful } = useForm({
        message: '',
  });
  const submit = (e) => {
    e.preventDefault();
    post(route('messages.store',props.to_user));
    setData('message','');

};


  return (
    <AuthenticatedLayout
    auth={props.auth}
    errors={props.errors}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Messages</h2>}
>
    <Head title="Messages" />
    <div class="text-gray-800 dark:text-gray-200 w-full flex items-center justify-center">
    <div class="flex flex-col space-y-1 mt-4 mx-2  w-3/4">
    {users.map((user,i) => (
                 <User user={user}  index={i} key={i} />
                ))}
          
            <button
              class="flex flex-row items-center hover:bg-gray-800 rounded-xl p-2"
            >
              <div
                class="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full"
              >
                M
              </div>
              <div class="ml-2 text-sm font-semibold">Marta Curtis</div>
              <div
                class="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none"
              >
                2
              </div>
            </button>
           

          </div>
          </div>

  </AuthenticatedLayout>
  )
}

export default Index;