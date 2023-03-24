import { Link } from '@inertiajs/react';

export default function NavLink2({ href, active, children }) {
    return (
        <Link
            href={href}
            className={
                active
                    ? 'ml-4 flex flex-row justify-left items-center  h-12 border-r-2 border-r-indigo-600 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 dark:text-indigo-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 text-sm font-medium text-center'
                    : 'ml-4 flex flex-row justify-left items-center  h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 text-sm font-medium text-center'
            }
        >
            {children}
        </Link>
    );
}
