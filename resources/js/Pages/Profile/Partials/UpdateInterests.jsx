import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import React, {useState,useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import { router,Link, useForm, usePage } from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import UpdateInterest from "./UpdateInterest";


export const UpdateInterests = () => {
  const props = usePage().props;
  // console.log('props',props);
 
  
  const [interests, setInterest] = useState(props.interests);


  const { data, setData, post, processing,progress , errors, recentlySuccessful } = useForm({
    name:'',
  });

useEffect(() => {
  setInterest(props.interests);
}, [props.interests]);
 
  const checkState = () => {
      console.log('data',data);
      console.log('props',props);

      console.log('interests',interests);
  }
  const removeInterest = (pid,status = false) => {
    console.log(interests[pid]);
    router.post(route('interest.destroy'),{
      interest_id: interests[pid].id,
      _method: 'DELETE'
    });

    setInterest((current) =>
      current.filter((interest,i) => i !== pid)
    );
  }
 const handleSetInterest = (e) =>{
  if(e.key === 'Enter'){
    setInterest(props.interests);
    post(route('interest.store'));
    setData({
      ...data,
      name: '',
    });
  }
  }
  const updateInterests = (e) => {
    router.post(route('interest.update'),{
      interests: interests,
      _method: 'PATCH'
    });
  }
  const submit = (e) => {
    e.preventDefault();
   
    post(route('interest.update'));
    if(recentlySuccessful){
      console.log('success');
      setData({
        ...data,
        interests: [],
      });
      setInterest(interests,props.interests);

    }
    console.log(recentlySuccessful);
};
  return (
    <section>
        <header>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Interests</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Update your Interests. [<span className='text-indigo-300'>You can add up to 20.</span>]
            </p>
        </header>
        <div className="flex items-center gap-4 mt-6">
          <div>
                    <TextInput
                        className="mt-1 block w-full"
                        value={data.name}
                        handleChange={(e) => {setData({
                          ...data,
                          name: e.target.value,
                        }); }}
                        required
                        placeholder="name"
                        handleKeyDown={(e)=> handleSetInterest(e)}
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>
  
                </div>
        <div className="mt-6 space-y-6">
            <ReactSortable 
            list={interests}
             setList={setInterest} 
             onUpdate={(evt) => {
              console.log('onUpdate',evt);
              updateInterests();
            }}
           
  
             className="flex flex-wrap gap-4">
                {interests.map((interest,i) => (
                 <UpdateInterest interest={interest}  index={i} key={i} removeInterest={removeInterest} />
                ))}

            </ReactSortable>
           
        </div>
        <div className="flex items-center gap-4 mt-6">
        <span className='text-indigo-300 text-sm font-semibold'>[Press Save once done adding and updating positions of interests.]</span>]
          </div>
        <div className="flex items-center gap-4 mt-6">
          <div onClick={()=> checkState()}>CHECK</div>
      
                    <PrimaryButton processing={processing} onClick={(e)=> submit(e)}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                    </Transition>
                </div>
    </section>
  );
};