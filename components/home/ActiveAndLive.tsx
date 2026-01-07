import { Bus, Map } from 'lucide-react'
import React from 'react'
import ProgressBar from './ProgressBar'

const ActiveAndLive = () => {
  return (
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Live Seat Availability */}
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Live Seat Availability
          </h3>
          <ProgressBar
            label="Standard Buses"
            current={150}
            total={200}
            color="bg-indigo-500"
          />
          <ProgressBar
            label="Luxury Coaches"
            current={75}
            total={100}
            color="bg-blue-500"
          />
          <ProgressBar
            label="Mini Vans"
            current={30}
            total={40}
            color="bg-purple-500"
          />
          <ProgressBar
            label="Executive Class"
            current={20}
            total={20}
            color="bg-indigo-400"
          />
        </div>

        {/* Active Buses Status */}
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-500">Active Buses</h3>
            <Bus className="w-5 h-5 text-indigo-500" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">45</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">On Road</span>
              <span className="font-semibold text-green-500">38</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">In Maintenance</span>
              <span className="font-semibold text-yellow-500">7</span>
            </div>
          </div>
        </div>

        {/* Active Routes Status */}
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-500">Active Routes</h3>
            <Map className="w-5 h-5 text-blue-500" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">15</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">High Demand</span>
              <span className="font-semibold text-red-500">5</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Normal</span>
              <span className="font-semibold text-green-500">10</span>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ActiveAndLive