import React, { useState } from 'react';
import { Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set());

  const teams = [
    {
      id: 1,
      name: 'Team 01',
      course: 'Веб систем ба технологи',
      members: 12,
      color: 'bg-white',
      isActive: true,
    },
    {
      id: 2,
      name: 'Team 02',
      course: 'Веб систем ба технологи',
      members: 12,
      color: 'bg-white',
      isActive: true,
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
      color: 'bg-white',
      isActive: true,
    },
  ];

  const filteredTeams = teams.filter(team => {
    if (searchQuery.trim() === '') return true;

    const searchLower = searchQuery.toLowerCase();
    return (
      team.name?.toLowerCase().includes(searchLower) ||
      team.course?.toLowerCase().includes(searchLower)
    );
  });

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
    <div className='min-h-[60vh] bg-gray-50'>
      <div className='border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6'>
          <div className='flex items-center gap-3 sm:gap-4'>
            <div className='relative flex-1 max-w-2xl'>
              <Search
                className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'
                size={20}
              />
              <input
                type='text'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder='Баг хайх...'
                className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8'>
        <p className='text-gray-600 mb-6'>
          {filteredTeams.length} баг олдлоо
          {searchQuery && ` "${searchQuery}" хайлтаар`}
        </p>

        {filteredTeams.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>Баг олдсонгүй</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {filteredTeams.map(team => (
              <Link
                to={`/team4/group/${team.id}`}
                key={team.id}
                className={`rounded-xl p-6 shadow-sm hover:shadow-lg transition-all ${
                  team.isActive ? 'bg-green-400' : 'bg-white'
                }`}>
                <div className='flex items-start justify-between mb-4'>
                  <div
                    className={`${team.color} ${
                      team.isActive ? 'textGreen' : 'text - white'
                    }  w-10 h-10 rounded-lg flex items-center justify-center font-bold`}>
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
                    team.isActive
                      ? 'text-white text-opacity-90'
                      : 'text-gray-600'
                  }`}>
                  {team.course}
                </p>

                <div className='flex items-center justify-between'>
                  {/* <div className='flex -space-x-2'>
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
                  </div> */}
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
        )}
      </div>
    </div>
  );
}
