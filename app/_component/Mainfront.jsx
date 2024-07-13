import React from 'react'
import Image from 'next/image'

function Mainfront() {
  return (
    <section className="bg-gray-50 flex items-center flex-col">
      <div className="mx-auto max-w-screen-xl px-4 py-32">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
          Stay on Budget
            <strong className="font-extrabold text-primary sm:block">  Stay in Control !</strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
          Effortless Tracking, Effective Saving !
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-violet-600 focus:outline-none focus:ring active:bg-primary sm:w-auto"
              href='/sign-in'
            >
              Get Started
            </a>

          </div>
        </div>
      </div>
      <Image src={'/dashboard.png'}
      alt='dashboard'
      width={1000}
      height={700}
      className='-mt-9 rounded-xl border-2'
      />
    </section>
  )
}

export default Mainfront