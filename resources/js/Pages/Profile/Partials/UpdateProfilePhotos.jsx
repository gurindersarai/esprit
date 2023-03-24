import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import React, {useState,useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import { Link, useForm, usePage } from '@inertiajs/react';
import UpdateProfilePhoto from "./UpdateProfilePhoto";


export const UpdateProfilePhotos = () => {
  const props = usePage().props;
  // console.log(props);
  const [photos, setPhoto] = useState(props.photos);
  const [deletedPhotos, setDeletedPhoto] = useState([]);


  const { data, setData, post, processing,progress , errors, recentlySuccessful } = useForm({
    photos: [],
    deletedPhotos: [],
    _method: 'PATCH'
});


 
  const checkState = () => {
      console.log('data',data);
      console.log('photos',photos);
      console.log('deleted photos',deletedPhotos);
  }
  const removePhoto = (pid,status = false) => {
    console.log(photos[pid]);
    if(status != 'new'){
    setDeletedPhoto([...deletedPhotos,{...photos[pid],status:'delete'}]);
    }
    setPhoto((current) =>
      current.filter((photo,i) => i !== pid)
    );
  }
  const submit = (e) => {
    e.preventDefault();
    data.deletedPhotos = deletedPhotos;
    data.photos = photos;
    post(route('profile.updateImages'));
};
  const handleChangefromParent = (e,i) => {
    console.log(i);
    photos[i].file = e.target.files[0];
};
  return (
    <section>
        <header>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Profile photos</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Update your account's profile photos. [<span className='text-indigo-300'>First image is profile image.</span>]
            </p>
        </header>
        <div className="mt-6 space-y-6">
            <ReactSortable list={photos} setList={setPhoto} className="flex flex-wrap gap-4">
                {photos.map((photo,i) => (
                 <UpdateProfilePhoto photo={photo}  index={i} key={i} removePhoto={removePhoto} handleChangefromParent={handleChangefromParent}/>
                ))}

            </ReactSortable>
           
        </div>
        <div className="flex items-center gap-4 mt-6">
          <div onClick={()=> checkState()}>CHECK</div>
        <div className=' inline-flex items-center px-4 py-2 bg-indigo-800 dark:bg-indigo-500 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-100 uppercase tracking-widest hover:bg-indigo-700 dark:hover:bg-indigo-400 focus:bg-indigo-700 dark:focus:bg-white active:bg-indigo-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 cursor-pointer ' title='Append new image to grid' onClick={()=>{setPhoto([...photos,{ id: 'new', file: null, status:'new'}]);}}>
                  Add New
                </div>
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