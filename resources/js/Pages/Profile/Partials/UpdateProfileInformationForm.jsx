import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState } from 'react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className }) {
    const props = usePage().props;
    const user = usePage().props.auth.user;
    const [pdata, setPdata] = useState({filename:null});
    
    const { data, setData, post, processing,progress , errors, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        profile_image: null,
        profile_imageurl: user.profile_image,
        _method: 'PATCH'

    });
    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('profile.update'));
    };
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };
    let handleChange = e => {
        var files = e.target.files;
        setPdata({filename: files[0].name});
      };
   
      
    
  
    return (
        <section className={className}>

            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">

          
                <div className="flex items-center ">
                    <div className='mr-2'>
                    <img className='rounded-full w-24 h-24' src={props.ziggy.url+'/storage/'+user.profile_image} alt="" />
                    </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ">
                    {pdata.filename ?
                    <span>
                    Selected Photo:  <span className='text-indigo-500'>{pdata.filename}</span>
                    </span>
                    : 'Profile Image'
                     }
                    </label>
                    <div className="mt-1 flex items-center">

                      <label
                        className="rounded-md border border-gray-300  py-2 px-3 text-sm font-medium leading-4  shadow-sm text-gray-700 dark:text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer "
                        htmlFor="profilee"
                      >
                        Change
                      </label>
                      
                      {/* <input type="file" className='hidden' name="profile" id="profilee" /> */}
                      <input type="file" className='hidden' id="profilee" name="profile_image" onChange={e =>{ handleChange(e); setData('profile_image', e.target.files[0])}} />
                      {progress && (
                        <progress value={progress.percentage} max="100">
                          {progress.percentage}%
                        </progress>
                      )}
                    </div>
                    </div>
                  </div>
                  <div>
                    <InputLabel for="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        handleChange={(e) => setData('name', e.target.value)}
                        required
                        
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel for="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        handleChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton processing={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
