import AuthenticatedAdminLayout from '@/Layouts/AuthenticatedAdminLayout';
import { Head, Link } from '@inertiajs/react';
import UserRow from './UserRow';

export default function Index(props) {
    console.log(props.users);
    return (
        <AuthenticatedAdminLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">USERS</h2>}
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='ml-2 mb-4 font-bold'>USERS LIST</div>
                        <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                  
                                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                             Name
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Email
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Created on
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Actiion
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {
                        props.users.data && props.users.data.map((user) => {
                                return ( < UserRow key = {user.id} user = {user} />)})
                    }
                    
                       
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2}></td>
                            <td colSpan={3}>
                                <div className='mt-2 flex justify-end items-center'>
                                {
                        props.users.links && props.users.links.map((link,index) => {
                                return (<Link key={index}
                                    href={link.url}
                                    className={ link.active ? 'px-3 py-2 ml-0 leading-tight bg-white border border-gray-300 rounded-l-lg hover:bg-gray-900 text-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:text-white' : 'px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' }
                                    dangerouslySetInnerHTML={{__html:link.label}}
                                >
                               
                                </Link>)})
                    }
                                </div>
                   
                    

                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
                    </div>
                </div>
            </div>
        </AuthenticatedAdminLayout>
    );
}
