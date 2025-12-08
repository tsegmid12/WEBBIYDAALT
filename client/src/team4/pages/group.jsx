import React, { useState, useEffect } from 'react';
import { Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { courseAPI } from '../services/usedAPI';

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserGroups();
    loadFavoritesFromStorage();
  }, []);

  const fetchUserGroups = async () => {
    try {
      setLoading(true);
      setError(null);

      // Хичээлүүдийн мэдээлэл авах
      const coursesData = await courseAPI.getMyCourses();
      const coursesArray =
        coursesData.items || coursesData.courses || coursesData || [];

      // Бүх хичээлийн сурагчдаас группуудыг цуглуулах
      const groupsMap = new Map();

      for (const course of coursesArray) {
        try {
          const courseUsers = await courseAPI.getCourseUsers(course.id);
          const items = courseUsers.items || [];

          items.forEach(item => {
            try {
              const groupData = JSON.parse(item.group);
              const courseInfo = {
                id: course.id,
                name: course.name || course.title || 'Хичээлийн нэр',
              };

              if (groupData && groupData.id) {
                if (!groupsMap.has(groupData.id)) {
                  groupsMap.set(groupData.id, {
                    id: groupData.id,
                    name: groupData.name || `Group ${groupData.id}`,
                    course: courseInfo.name,
                    courseId: courseInfo.id,
                    members: 0,
                    color: 'bg-white',
                    isActive: true,
                  });
                }
                // Сурагчдын тоог нэмэх
                const group = groupsMap.get(groupData.id);
                group.members += 1;
              }
            } catch (e) {
              console.error('Error parsing group data:', e);
            }
          });
        } catch (e) {
          console.error(`Error fetching users for course ${course.id}:`, e);
        }
      }

      // Map-аас array руу хөрвүүлэх
      const teamsArray = Array.from(groupsMap.values());
      setTeams(teamsArray);
    } catch (err) {
      console.error('Error fetching user groups:', err);
      setError(err.message);
      // Demo data fallback
      setTeams([
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
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadFavoritesFromStorage = () => {
    try {
      const favs = JSON.parse(localStorage.getItem('favoriteGroups') || '[]');
      setFavorites(new Set(favs));
    } catch (err) {
      console.error('Error loading favorites:', err);
    }
  };

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
      try {
        localStorage.setItem(
          'favoriteGroups',
          JSON.stringify([...newFavorites])
        );
      } catch (err) {
        console.error('Error saving favorites:', err);
      }
      return newFavorites;
    });
  };

  if (loading) {
    return (
      <div className='min-h-[60vh] bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4'></div>
          <p className='text-gray-600'>Багуудыг ачааллаж байна...</p>
        </div>
      </div>
    );
  }

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
        {error && (
          <div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6'>
            <div className='flex items-start'>
              <div className='flex-1'>
                <p className='text-yellow-800 font-medium'>Анхааруулга</p>
                <p className='text-yellow-700 text-sm mt-1'>
                  Багуудыг ачааллахад алдаа гарлаа. Demo өгөгдөл харуулж байна.
                </p>
              </div>
            </div>
          </div>
        )}

        <p className='text-gray-600 mb-6'>
          {filteredTeams.length} баг олдлоо
          {searchQuery && ` "${searchQuery}" хайлтаар`}
        </p>

        {filteredTeams.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>Баг олдсонгүй</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className='mt-4 text-cyan-600 hover:text-cyan-700 underline'>
                Хайлт арилгах
              </button>
            )}
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
                      team.isActive ? 'textGreen' : 'text-white'
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
                    team.isActive
                      ? 'text-white text-opacity-90'
                      : 'text-gray-600'
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
        )}
      </div>
    </div>
  );
}
