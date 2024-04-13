import React from 'react'
import Sidebar from '../../components/Sidebar'

function OpeningDashboardPage() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 flex flex-col items-center p-4">
        <h1 className="text-3xl">Opening Page</h1>
      </main>
    </div>
  )
}

export default OpeningDashboardPage