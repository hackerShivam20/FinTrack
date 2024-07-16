import React from 'react'
import Head from 'next/head'
import Footer from '../_components/Footer'

function page() {
  return (
    <>
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Head>
        <title>Coming Soon</title>
        <meta name="description" content="Our site is coming soon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-gray-900 mb-4">
          Coming Soon
        </h1>

        <p className="text-xl sm:text-2xl text-center text-gray-600 mb-8">
          We're working hard to bring you something amazing. Stay tuned!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
        <a href="https://github.com/hackerShivam20/FinTrack" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Give us a Star on Github &rarr;</h2>
            <p className="text-gray-600">Get the latest updates about our launch.</p>
          </a>

          <a href="mailto:fintrackexpensetracker@gmail.com" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Contact Us &rarr;</h2>
            <p className="text-gray-600">Have questions? We'd love to hear from you.</p>
          </a>
        </div>
      </main>
    </div>
    <div className='position:fixed display-flex mt-9 justify-between width-full bottom-0'>
     <Footer /> {/* Add the Footer component here */}
   </div>
   </>
  )
}

export default page