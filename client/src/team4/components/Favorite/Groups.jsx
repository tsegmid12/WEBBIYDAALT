import React, { useState } from 'react';
import { Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Groups() {
  const [searchQuery, setSearchQuery] = useState('UI/UX Design');

  const teams = [
    {
      id: 1,
      name: 'Team 01',
      course: 'Веб систем ба технологи',
      members: 12,
      color: 'bg-blue-500',
      isFavorite: true,
    },
    {
      id: 2,
      name: 'Team 02',
      course: 'Веб систем ба технологи',
      members: 12,
      color: 'bg-blue-500',
      isFavorite: true,
    },
    {
      id: 3,
      name: 'Team 03',
      course: 'Веб систем ба технологи',
      members: 12,
      color: 'bg-blue-400',
      isFavorite: true,
    },
    {
      id: 4,
      name: 'Team 04',
      course: 'Веб систем ба технологи',
      members: 12,
      color: 'bg-blue-500',
      isFavorite: true,
    },
  ];

  return (
    <div className=' bg-gray-50'>
      <div className='max-w-7xl mx-auto px-8 '>
        <div className='grid grid-cols-4 gap-6'>
          {teams.map(team => (
            <div
              key={team.id}
              className={`rounded-xl p-6 shadow-sm hover:shadow-lg transition-all ${
                team.isActive ? 'bg-green-400' : 'bg-white'
              }`}>
              <div className='flex items-start justify-between mb-4'>
                <div
                  className={`${team.color} text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold`}>
                  {team.id}
                </div>
                <button className='hover:scale-110 transition-transform'>
                  <Heart
                    className='textBlue'
                    size={20}
                    style={
                      team.isFavorite ? { fill: '#44B1D2' } : { fill: 'white' }
                    }
                  />
                </button>
              </div>

              <h3
                className={`font-bold mb-2 ${
                  team.isActive ? 'text-white' : 'text-gray-900'
                }`}>
                {team.name}
              </h3>
              <p
                className={`text-sm mb-4 ${
                  team.isActive ? 'text-white text-opacity-90' : 'text-gray-600'
                }`}>
                {team.course}
              </p>

              <div className='flex items-center justify-between'>
                <div className='flex -space-x-2'>
                  {[1, 2, 3, 4, 5].map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-8 h-8 rounded-full border-2 ${
                        team.isActive
                          ? 'border-green-400 bg-gray-300'
                          : 'border-white bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span
                  className={`text-xs ${
                    team.isActive ? 'text-white' : 'text-gray-500'
                  }`}>
                  {team.members} members
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
