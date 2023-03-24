import AuthenticatedAdminLayout from '@/Layouts/AuthenticatedAdminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function Edit(props) {
    console.log(props);
    const user = usePage().props.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('admin.profile.update'));
    };
    return (
        <AuthenticatedAdminLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">USERS</h2>}
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">

                        <section className='max-w-xl'>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Edit - {data.name}
                                </h2>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel for="name" value="Name" />

                                    <TextInput id="name" className="mt-1 block w-full" value={data.name}
                                        handleChange={(e)=> setData('name', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="name"
                                        />

                                        <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div>
                                    <InputLabel for="email" value="Email" />

                                    <TextInput id="email" type="email" className="mt-1 block w-full" value={data.email}
                                        handleChange={(e)=> setData('email', e.target.value)}
                                        required
                                        autoComplete="username"
                                        />

                                        <InputError className="mt-2" message={errors.email} />
                                </div>

                            

                                <div className="flex items-center gap-4">
                                    <PrimaryButton processing={processing}>Save</PrimaryButton>

                                    <Transition show={recentlySuccessful} enterFrom="opacity-0" leaveTo="opacity-0"
                                        className="transition ease-in-out">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                                    </Transition>
                                </div>
                            </form>
                        </section>
                    </div>
                    </div>
                    </div>
        </AuthenticatedAdminLayout>
    );
}
