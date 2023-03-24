import React from 'react'
import { Link, useForm, usePage } from '@inertiajs/react';

function User({user}) {
    const props = usePage().props;

    // console.log('pp',props);
    // console.log('mppp',user);
  return (
 user.id != props.auth.user.id ?
            <Link href={'messages/'+user.id}
            class="flex flex-row items-center hover:bg-gray-800 rounded-xl p-2"
          >
            <div
              class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
            >
              H
            </div>
            <div class="ml-2 text-sm font-semibold">{user.name}</div>
          </Link>

: 
null
  )
}

export default User