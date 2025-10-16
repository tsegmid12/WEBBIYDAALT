import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TeamsTab() {
  const [favorites, setFavorites] = useState(new Set());
  const teams = [
    {
      id: 1,
      name: 'Team 01',
      course: 'Веб систем ба технологи',
      members: 12,
      color: 'bg-blue-500',
    },
    {
      id: 2,
      name: 'Team 02',
      course: 'Веб систем ба технологи',
      members: 12,
      color: 'bg-blue-500',
    },
    {
      id: 3,
      name: 'Team 03',
      course: 'Веб систем ба технологи',
      members: 12,
      color: 'bg-white',
      isActive: true,
    },
    {
      id: 4,
      name: 'Team 04',
      course: 'Веб систем ба технологи',
      members: 12,
      color: 'bg-blue-500',
    },
    {
      id: 5,
      name: 'Team 05',
      course: 'Веб систем ба технологи',
      members: 12,
      color: 'bg-blue-500',
    },
    {
      id: 6,
      name: 'Team 06',
      course: 'Веб систем ба технологи',
      members: 12,
      color: 'bg-blue-500',
    },
    {
      id: 7,
      name: 'Team 07',
      course: 'Веб систем ба технологи',
      members: 12,
      color: 'bg-blue-500',
    },
    {
      id: 8,
      name: 'Team 08',
      course: 'Веб систем ба технологи',
      members: 12,
      color: 'bg-blue-500',
    },
  ];
  const handleToggleFavorite = (e, teamId) => {
    e.preventDefault();
    e.stopPropagation();

    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(teamId)) {
        newFavorites.delete(teamId);
      } else {
        newFavorites.add(teamId);
      }
      return newFavorites;
    });
  };
  return (
    <div className='grid grid-cols-4 gap-6'>
      {teams.map(team => (
        <Link
          to={`/team4/group/${team.id}`}
          key={team.id}
          className={`rounded-xl p-6 shadow-sm hover:shadow-lg transition-all ${
            team.isActive ? 'bg-green-300' : 'bg-white'
          }`}>
          <div className='flex items-start justify-between mb-4'>
            <div
              className={`${team.color} ${
                team.isActive ? 'text-green-400' : 'text-white'
              } w-10 h-10 rounded-lg flex items-center justify-center font-bold`}>
              {team.id}
            </div>
            <button
              onClick={e => handleToggleFavorite(e, team.id)}
              className='hover:scale-110 transition-transform'>
              <Heart
                className='text-cyan-500'
                size={20}
                fill={favorites.has(team.id) ? '#00CBB8' : 'white'}
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
                  className={`w-8 h-8 rounded-full border-2 bg-gray-300 ${'border-white'}`}>
                  <img
                    src='/team4/student/profile.png'
                    alt='profile'
                    className='w-full h-full rounded-full object-cover'
                  />
                </div>
              ))}
            </div>
            <span
              className={`text-xs ${
                team.isActive ? 'text-white' : 'text-gray-500'
              }`}>
              {team.members} members
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
