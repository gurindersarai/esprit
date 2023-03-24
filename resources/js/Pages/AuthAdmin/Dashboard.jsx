import AuthenticatedAdminLayout from '@/Layouts/AuthenticatedAdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard(props) {
    console.log(props);

    return (
        <AuthenticatedAdminLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg text-gray-900 dark:text-gray-100">
                        <div>Name: {props.auth.user.name} Email: {props.auth.user.email}</div>
                        <div className='text-sm text-gray-400'>Total Registed Users : {props.totalusers} </div>
                    </div>
                </div>
            </div>
        </AuthenticatedAdminLayout>
    );
}
