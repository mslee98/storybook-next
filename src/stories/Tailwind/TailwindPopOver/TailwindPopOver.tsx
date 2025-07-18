import Link from "next/link";
import { useState, useRef } from "react";

interface TailwindPopOverProps {
  children: React.ReactNode;
  variant?: 'login';
}

export const TailwindPopOver = ({
  children,
  variant,
}: TailwindPopOverProps) => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const handlePasswordFocus = () => {
        setIsPopoverVisible(true);
    };
    
    const handlePasswordBlur = () => {
        // 약간의 지연을 두어 클릭 이벤트가 처리될 수 있도록 함
        setTimeout(() => setIsPopoverVisible(false), 200);
    };
  
    return (
        <>
            {variant === 'login' && (
                <form className="w-full max-w-lg mx-auto relative">
                    <div className="mb-6 w-full">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="name@email.com" 
                            required 
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label 
                            htmlFor="password" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Your password
                        </label>
                        <input 
                            ref={passwordInputRef}
                            onFocus={handlePasswordFocus}
                            onBlur={handlePasswordBlur}
                            type="password" 
                            id="password" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required 
                        />
                        
                        {isPopoverVisible && (
                            <div 
                                className="absolute z-10 inline-block text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-lg w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                                style={{
                                    top: '100%',
                                    left: '0',
                                    marginTop: '0.5rem'
                                }}
                            >
                                <div className="p-3 space-y-2">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Must have at least 6 characters</h3>
                                    <div className="grid grid-cols-4 gap-2">
                                        <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
                                        <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
                                        <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
                                        <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
                                    </div>
                                    <p>It&apos;s better to have:</p>
                                    <ul>
                                        <li className="flex items-center mb-1">
                                            <svg className="w-3.5 h-3.5 me-2 text-green-400 dark:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                            </svg>
                                            Upper & lower case letters
                                        </li>
                                        <li className="flex items-center mb-1">
                                            <svg className="w-3 h-3 me-2.5 text-gray-300 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                            </svg>
                                            A symbol (#$&)
                                        </li>
                                        <li className="flex items-center">
                                            <svg className="w-3 h-3 me-2.5 text-gray-300 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                            </svg>
                                            A longer password (min. 12 chars.)
                                        </li>
                                    </ul>
                                </div>
                                <div data-popper-arrow></div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input 
                                id="remember" 
                                type="checkbox" 
                                className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" 
                                required 
                            />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>
                    <button 
                        type="submit" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
            )}
        </>
    );
};