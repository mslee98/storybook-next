import Link from 'next/link';
import { ButtonHTMLAttributes, useState } from 'react';

interface TailwindTabsProps {
  children: React.ReactNode;
  variant?: 'default' | 'vertical';
}

export const TailwinTabs = ({
  children,
  variant = 'default',
}: TailwindTabsProps) => {

  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
  <>
    {variant === 'default' && (
      <div className="w-full h-full bg-white dark:bg-gray-900">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li className="me-2">
                  <Link 
                    onClick={() => setActiveTab('profile')}
                    href="#" 
                    className={`inline-flex items-center justify-center p-4 rounded-t-lg group ${
                      activeTab === 'profile' 
                        ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' 
                        : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                    }`}
                    aria-current={activeTab === 'profile' ? 'page' : undefined}
                  >
                      <svg className={`w-4 h-4 me-2 mr-2 ${
                        activeTab === 'profile' 
                          ? 'text-blue-600 dark:text-blue-500' 
                          : 'text-gray-400 dark:text-gray-500'
                      }`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                      </svg>Profile
                  </Link>
              </li>
              <li className="me-2">
                  <Link 
                    onClick={() => setActiveTab('dashboard')}
                    href="#" 
                    className={`inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                      activeTab === 'dashboard' 
                        ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' 
                        : 'border-b-2 border-transparent'
                    }`}
                    aria-current={activeTab === 'dashboard' ? 'page' : undefined}
                  >
                      <svg className={`w-4 h-4 me-2 mr-2 ${
                        activeTab === 'dashboard' 
                          ? 'text-blue-600 dark:text-blue-500' 
                          : 'text-gray-400 dark:text-gray-500'
                      }`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                          <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                      </svg>Dashboard
                  </Link>
              </li>
              <li className="me-2">
                  <Link 
                    onClick={() => setActiveTab('settings')}
                    href="#" 
                    className={`inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                      activeTab === 'settings' 
                        ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' 
                        : 'border-b-2 border-transparent'
                    }`}
                    aria-current={activeTab === 'settings' ? 'page' : undefined}
                  >
                      <svg className={`w-4 h-4 me-2 mr-2 ${
                        activeTab === 'settings' 
                          ? 'text-blue-600 dark:text-blue-500' 
                          : 'text-gray-400 dark:text-gray-500'
                      }`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z"/>
                      </svg>Settings
                  </Link>
              </li>
              <li className="me-2">
                  <Link 
                    onClick={() => setActiveTab('contacts')}
                    href="#" 
                    className={`inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                      activeTab === 'contacts' 
                        ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' 
                        : 'border-b-2 border-transparent'
                    }`}
                    aria-current={activeTab === 'contacts' ? 'page' : undefined}
                  >
                      <svg className={`w-4 h-4 me-2 mr-2 ${
                        activeTab === 'contacts' 
                          ? 'text-blue-600 dark:text-blue-500' 
                          : 'text-gray-400 dark:text-gray-500'
                      }`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                          <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                      </svg>Contacts
                  </Link>
              </li>
              <li>
                  <Link href="#" className="inline-flex items-center justify-center p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
                      <svg className="w-4 h-4 me-2 mr-2 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                      </svg>Disabled
                  </Link>
              </li>
          </ul>
        </div>
      </div>
      
    )}

    {variant === 'vertical' && (
        <div className="dark:bg-black md:flex">
            <ul className="flex-column space-y space-y-4 text-sm mr-2 font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                <li>
                    <Link 
                      onClick={() => setActiveTab('profile')}
                      href="#" 
                      className={`inline-flex items-center px-4 py-3 rounded-lg w-full
                      ${activeTab === 'profile'
                        ? "text-white bg-blue-700 dark:bg-blue-600"
                        : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                      }`
                    }>
                        <svg 
                          className={`w-4 h-4 mr-2 
                          ${activeTab === 'profile'
                            ? "text-white"
                            : "text-gray-500 dark:text-gray-400"
                          }`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                        Profile
                    </Link>
                </li>
                <li>
                    <Link 
                      onClick={() => setActiveTab('dashboard')}
                      href="#" className={`inline-flex items-center px-4 py-3 rounded-lg w-full
                      ${activeTab === 'dashboard'
                        ? "text-white bg-blue-700 dark:bg-blue-600"
                        : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                      }`
                    }>
                        <svg 
                        className={`w-4 h-4 mr-2 
                          ${activeTab === 'dashboard'
                            ? "text-white"
                            : "text-gray-500 dark:text-gray-400"
                          }`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"><path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/></svg>
                        Dashboard
                    </Link>
                </li>
                <li>
                  <Link 
                    onClick={() => setActiveTab('settings')}
                    href="#" 
                    className={`inline-flex items-center px-4 py-3 rounded-lg w-full
                      ${activeTab === 'settings'
                        ? "text-white bg-blue-700 dark:bg-blue-600"
                        : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                      }`
                    }>
                        <svg 
                        className={`w-4 h-4 mr-2 
                          ${activeTab === 'settings'
                            ? "text-white"
                            : "text-gray-500 dark:text-gray-400"
                          }`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"/>
                        </svg>
                        Settings
                    </Link>
                </li>
                <li>
                <Link 
                    onClick={() => setActiveTab('contact')}
                    href="#" 
                    className={`inline-flex items-center px-4 py-3 rounded-lg w-full
                      ${activeTab === 'contact'
                        ? "text-white bg-blue-700 dark:bg-blue-600"
                        : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                      }`
                    }>
                        <svg 
                        className={`w-4 h-4 mr-2 
                          ${activeTab === 'contact'
                            ? "text-white"
                            : "text-gray-500 dark:text-gray-400"
                          }`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M7.824 5.937a1 1 0 0 0 .726-.312 2.042 2.042 0 0 1 2.835-.065 1 1 0 0 0 1.388-1.441 3.994 3.994 0 0 0-5.674.13 1 1 0 0 0 .725 1.688Z"/>
                            <path d="M17 7A7 7 0 1 0 3 7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V7a5 5 0 1 1 10 0v7.083A2.92 2.92 0 0 1 12.083 17H12a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a1.993 1.993 0 0 0 1.722-1h.361a4.92 4.92 0 0 0 4.824-4H17a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3Z"/>
                        </svg>
                        Contact
                    </Link>
                </li>
                <li>
                    <Link href="#" className="inline-flex items-center px-4 py-3 text-gray-400 rounded-lg cursor-not-allowed bg-gray-50 w-full dark:bg-gray-800 dark:text-gray-500">
                        <svg className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                        </svg>
                    Disabled
                    </Link>
                </li>
            </ul>

            <div className="p-4 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full min-h-[200px] flex flex-col">
                {activeTab === 'profile' && (
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Profile Tab</h3>
                        <p className="mb-2">This is some placeholder content for the Profile tab&apos;s associated content. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                    </div>
                )}
                
                {activeTab === 'dashboard' && (
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Dashboard Tab</h3>
                        <p className="mb-2">Welcome to your dashboard! Here you can view your key metrics and important information at a glance. This dashboard provides an overview of your account activity and recent updates.</p>
                    </div>
                )}
                
                {activeTab === 'settings' && (
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Settings Tab</h3>
                        <p className="mb-2">Manage your account settings and preferences here. You can customize your experience and control various options.</p>
                        <p>All changes are automatically saved and applied to your account.</p>
                    </div>
                )}
                
                {activeTab === 'contact' && (
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Contacts Tab</h3>
                        <p className="mb-2">View and manage your contacts list. You can add new contacts, edit existing ones, and organize them into groups.</p>
                        <p>Your contacts are synced across all your devices for easy access.</p>
                    </div>
                )}
            </div>

        </div>
    
    )}
  </>
  );
};