// import { useState,useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

function UpdateInterest({interest,index,removeInterest}) {
  const props = usePage().props;

    let handleRemoveInterest = (index,status) => {
       removeInterest(index,status);
      };

  return (
    interest != null ? <span className="cursor-grab	 relative ml-2 mt-2 bg-indigo-400 px-3 py-1">{interest.interest.name} <span  className='absolute cursor-pointer bg-slate-50 rounded-full w-4 h-4 text-black text-center text-xs ' style={{
      top: -8, right: -5
    }} onClick={()=> handleRemoveInterest(index,'new')} >X</span></span> : null
  )
  
}

export default UpdateInterest