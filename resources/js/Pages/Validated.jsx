import PageLink from '@/Components/PageLink';
import { Link, Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Welcome({ models }) {

    const [query, setQuery] = useState();

    // const 
    // // const handleImageError = () => {
    // //     document.getElementById('screenshot-container')?.classList.add('!hidden');
    // //     document.getElementById('docs-card')?.classList.add('!row-span-1');
    // //     document.getElementById('docs-card-content')?.classList.add('!flex-row');
    // //     document.getElementById('background')?.classList.add('!hidden');
    // // };

    useEffect(() => {
        if(query) {
             router.get('/', {search: query},
                 {
                    preserveState: true,
                    replace: true,
                 }
             );
        }
     }, [query])

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[677px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                />
                <div className="relative min-h-screen flex justify-center py-5 selection:bg-[#FF2D20] selection:text-white">
                    
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">

                        <h4 className='mb-4 text-2xl font-bold'>Validated Users</h4>
                        <div className="mb-4 flex gap-3 items-center justify-between hidden">
                            <input className='rounded block' placeholder='Search...' type="text" onChange={(e) => setQuery(e.target.value)} />
                            <Link href='/validated' className='py-2 px-3 bg-sky-500 rounded'>Validated List</Link>
                        </div>

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">#</th>
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Phone</th>
                                        {/* <th scope="col" className="px-6 py-3">Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        models.data.map((model, index) => {
                                            return (
                                                <tr className="bg-white border-b" key={index}>
                                                    <td className="px-6 py-4"> {index + 1} </td>
                                                    <td className="px-6 py-4"> {model.name} </td>
                                                    <td className="px-6 py-4"> {model.email}</td>
                                                    <td className="px-6 py-4"> {model.phone} </td>
                                                    {/* <td className="px-6 py-4">
                                                        <Link href={`/check-in/${model.id}`} className={'bg-red-500 px-2 py-1 text-white rounded'}>
                                                            <i className="fa-solid fa-trash"></i> CheckIn
                                                        </Link>
                                                    </td> */}
                                                </tr>
                                            )
                                        })
                                    }

                                    {
                                        models.data.length == 0 && (<tr>
                                            <td className='text-center pt-5' colSpan={8}>No Records Found</td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className='px-6 py-3'>
                            <PageLink links={models.links}></PageLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
