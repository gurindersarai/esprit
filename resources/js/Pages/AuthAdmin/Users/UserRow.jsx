import { Link } from "@inertiajs/react";

export default function UserRow({user}) {
  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="p-4 w-4">
                                <div className="flex items-center">
                                    <label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{user.email}</td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.created_at}9</td>
                            <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                    
                                <Link 
                                   href={route('admin.users.edit',user.id)}
                                    className='text-blue-600 dark:text-blue-500 hover:underline'
                                >
                               Edit
                                </Link>
                            </td>
                        </tr>
  )
}
