import UserProfileCard from '@/Components/UserProfileCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
 
window.Pusher = Pusher;
 
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'esprit',
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    cluster:import.meta.env.VITE_PUSHER_APP_CLUSTER,
});


export default function Home(props) {

    console.log(props);
    return (

        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
{/* <Index /> */}
            <div className="py-12 max-w-xl  mx-auto">
                {/* <div className=" mx-auto mb-6 w-4/5	">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form>   
    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Interests..." required />
        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>

                    </div>
                </div> */}
                {/* <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
        <li className="mr-2">
            <button id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="true" className="inline-block p-4 text-blue-600 rounded-tl-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">All</button>
        </li>

        <li className="mr-2">
            <button id="services-tab" data-tabs-target="#services" type="button" role="tab" aria-controls="services" aria-selected="false" className="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Interest 1</button>
        </li>
        <li className="mr-2">
            <button id="services-tab" data-tabs-target="#services" type="button" role="tab" aria-controls="services" aria-selected="false" className="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Interest 2</button>
        </li>
        <li className="mr-2">
            <button id="statistics-tab" data-tabs-target="#statistics" type="button" role="tab" aria-controls="statistics" aria-selected="false" className="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Interest 3</button>
        </li>
        <li className="mr-2">
            <button id="statistics-tab" data-tabs-target="#statistics" type="button" role="tab" aria-controls="statistics" aria-selected="false" className="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">Interest 4</button>
        </li>
    </ul>
    
</div> */}
 <section className="mb-4">
        <header>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Match Reccomendations</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Showing users matches with your Interests.
            </p>
        </header>
        </section>
      
<div className="grid grid-cols-2 gap-4">
{props.match_recommendations.map(function(v, i){
return(v.user != null  ? 
    <UserProfileCard key={i} value={v}/>
    : null);
})}
</div>

            </div>
        </AuthenticatedLayout>
    );
}
