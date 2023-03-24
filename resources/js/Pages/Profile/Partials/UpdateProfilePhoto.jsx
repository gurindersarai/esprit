import { useState,useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

function UpdateProfilePhoto({photo,index,removePhoto,handleChangefromParent}) {
  const props = usePage().props;
    const [pImgEle, setPimgEle] = useState(null);
    
    useEffect(() => {
      if( photo.status == 'new'){
        console.log('pImgEle',pImgEle);
        if(photo.file && photo.file !== null){
        setPimgEle(URL.createObjectURL(photo.file));
        }
        }

    }, [photo.file])
    
    var loadFile = function(event) {
        // console.log(event.target.parentNode.parentNode.parentNode.querySelector('.setp'));
        var pimgEle = event.target.parentNode.parentNode.parentNode.querySelector('.setp');
        setPimgEle(URL.createObjectURL(event.target.files[0]));
        // console.log(pimgEle);
        // setData(prev => ...prev,'backgroundImage',URL.createObjectURL(event.target.files[0]));
        pimgEle.style.backgroundImage="url("+URL.createObjectURL(event.target.files[0])+")" ;
        pimgEle.innerText ='';
        event.target.parentNode.querySelector('span').innerText = 'Change';
        pimgEle.onload = function() {
          URL.revokeObjectURL(pimgEle.style.backgroundImage) // free memory
        }
      };

    let handleChange = (e,i) => {
        // var files = e.target.files;
        loadFile(e);
        // console.log(e,i);
        handleChangefromParent(e,i);
      };
    let handleRemovePhoto = (id,status) => {
       removePhoto(id,status);
      };

  return (
    photo.status == 'new' ?
    <div className='mb-3 rounded photoCont'>
    <div className='w-24 h-24 bg-indigo-600  text-gray-200 flex items-center justify-center text-center text-xs setp bg-center bg-cover	bg-no-repeat' style={pImgEle && {backgroundImage : 'url('+pImgEle+')'} } >
      { !pImgEle && 'No Image Selected'}  
    </div>
    <div className='flex items-center'>
    <label
     className="text-center px-2 py-2 bg-indigo-800 dark:bg-indigo-500 text-white font-semibold text-xs cursor-pointer block flex-1 "
      >
    <input type="file" className='hidden'  name="photo[]" onChange={e =>{ handleChange(e,index); }} />
    <span>Select</span>
                      </label>
                      <div className='text-center px-2 py-2 bg-red-800 dark:bg-red-500 text-white font-semibold text-xs cursor-pointer block' onClick={()=> handleRemovePhoto(index,'new')}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 96 960 960" width="16" className='fill-white'><path d="M312 912q-29.7 0-50.85-21.15Q240 869.7 240 840V360h-48v-72h192v-48h192v48h192v72h-48v479.566Q720 870 698.85 891 677.7 912 648 912H312Zm336-552H312v480h336V360ZM384 768h72V432h-72v336Zm120 0h72V432h-72v336ZM312 360v480-480Z"/></svg>
                      </div>
    </div>

                      
                      
                
    </div>
    : 
    <div className='mb-3 rounded photoCont'><img name={photo.name} index={photo.id} className="w-24 h-24  shadow-lg" src={props.ziggy.url+'/storage/'+photo.image} alt="Bonnie image"/>
    <div className=' text-center px-2 py-2 bg-red-800 dark:bg-red-500 text-white font-semibold text-xs cursor-pointer' onClick={()=> handleRemovePhoto(index)}>Remove - {photo.id}</div>
    </div>
  )
  
}

export default UpdateProfilePhoto