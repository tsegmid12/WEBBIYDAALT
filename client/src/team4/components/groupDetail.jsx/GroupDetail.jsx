import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { groupAPI } from '../../services/api';
import { ArrowLeft, Users, CalendarDays, Info } from 'lucide-react';

export default function GroupDetail() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const groupId = useMemo(() => Number(id) || id, [id]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [groupRes, membersRes] = await Promise.all([
          groupAPI.getGroupById(groupId),
          groupAPI.getGroupMembers(groupId),
        ]);
        if (!isMounted) return;
        setGroup(groupRes?.group || groupRes);
        setMembers(membersRes?.members || membersRes || []);
      } catch (e) {
        console.error('Failed to load group details, using mock data.', e);
        if (!isMounted) return;
        const mockMembers = Array.from({ length: 6 }).map((_, idx) => ({
          id: idx + 1,
          name: `Гишүүн ${idx + 1}`,
          role: idx === 0 ? 'Ахлагч' : 'Гишүүн',
          avatar: '/team4/student/profile.png',
        }));
        setGroup({
          id: groupId,
          name: `Team ${groupId.toString().padStart(2, '0')}`,
          course: 'Веб систем ба технологи /F.ITM301/',
          description:
            'Багаараа хамтарч 8 лаборатори болон 2 бие даалт гүйцэтгэнэ.',
          teacher: { name: 'Т.Золбоо /F.IT20/' },
          membersCount: mockMembers.length,
          color: 'bg-blue-500',
        });
        setMembers(mockMembers);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [groupId]);

  const laboratory = useMemo(
    () => [
      {
        id: 1,
        date: '2025.10.02 - 2025.10.09',
        topic: 'Лабораторийн ажил 1',
        allScore: 2,
        scoreObtained: 2,
        isOpened: true,
      },
      {
        id: 2,
        date: '2025.10.10 - 2025.10.17',
        topic: 'Лабораторийн ажил 2',
        allScore: 3,
        scoreObtained: 2,
        isOpened: true,
      },
      {
        id: 3,
        date: '2025.10.18 - 2025.10.25',
        topic: 'Лабораторийн ажил 3',
        allScore: 2,
        scoreObtained: 0,
        isOpened: true,
      },
      {
        id: 4,
        date: '2025.10.25 - 2025.11.02',
        topic: 'Лабораторийн ажил 4',
        allScore: 2,
        scoreObtained: 0,
        isOpened: false,
      },
      {
        id: 5,
        date: '2025.11.09 - 2025.11.16',
        topic: 'Лабораторийн ажил 5',
        allScore: 4,
        scoreObtained: 0,
        isOpened: false,
      },
      {
        id: 6,
        date: '2025.11.23 - 2025.11.30',
        topic: 'Лабораторийн ажил 6',
        allScore: 3,
        scoreObtained: 0,
        isOpened: false,
      },
      {
        id: 7,
        date: '2025.12.01 - 2025.12.08',
        topic: 'Лабораторийн ажил 7',
        allScore: 2,
        scoreObtained: 0,
        isOpened: false,
      },
      {
        id: 8,
        date: '2025.12.09 - 2025.12.16',
        topic: 'Лабораторийн ажил 8',
        allScore: 3,
        scoreObtained: 0,
        isOpened: false,
      },
    ],
    []
  );
  const biydaalt = useMemo(
    () => [
      {
        id: 1,
        date: '2025.10.02 - 2025.10.09',
        topic: 'Бие даалтын ажил 1',
        allScore: 6,
        scoreObtained: 6,
        isOpened: true,
      },
      {
        id: 2,
        date: '2025.10.10 - 2025.10.17',
        topic: 'Бие даалтын ажил 2',
        allScore: 7,
        scoreObtained: 0,
        isOpened: false,
      },
      {
        id: 3,
        date: '2025.10.18 - 2025.10.25',
        topic: 'Бие даалтын ажил 3',
        allScore: 6,
        scoreObtained: 0,
        isOpened: false,
      },
    ],
    []
  );

  if (loading) {
    return (
      <div className='min-h-[50vh] flex items-center justify-center text-gray-500'>
        Ачаалж байна...
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-6xl mx-auto'>
        <div className='mb-4'>
          <BackLink />
        </div>
        <div className='p-6 bg-red-50 border border-red-200 text-red-700 rounded-lg'>
          Алдаа: {error?.message || 'Тодорхойгүй алдаа гарлаа.'}
        </div>
      </div>
    );
  }

  if (!group) return null;

  return (
    <div className='min-h-[60vh]'>
      <div className='max-w-6xl mx-auto'>
        <div className='mb-6'>
          <BackLink />
        </div>

        <header className='bg-white rounded-2xl shadow-sm border p-6 mb-6'>
          <div className='flex items-start justify-between'>
            <div className='flex items-center gap-4'>
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${
                  group.color || 'bg-cyan-500'
                }`}>
                {String(group?.id || '')
                  .toString()
                  .slice(-2)}
              </div>
              <div>
                <h1 className='text-2xl font-bold text-gray-900'>
                  {group?.name || 'Group'}
                </h1>
                <p className='text-gray-600'>
                  {group?.course || 'Курсын нэр'} • Багш:{' '}
                  {group?.teacher?.name || 'Unknown'}
                </p>
              </div>
            </div>

            <div className='grid grid-cols-3 gap-4'>
              <StatCard
                icon={<Users size={18} />}
                label='Гишүүд'
                value={group?.membersCount || members.length}
              />
              <StatCard
                icon={<CalendarDays size={18} />}
                label='Лаборатори'
                value={`${laboratory.length}`}
              />
              <StatCard
                icon={<CalendarDays size={18} />}
                label='Бие даалт'
                value={`${biydaalt.length}`}
              />
            </div>
          </div>
        </header>

        <nav className='flex gap-2 mb-6 border-b'>
          {[
            { id: 'overview', label: 'Даалгавар' },
            { id: 'laboratory', label: 'Лаборатори' },
            { id: 'biydaalt', label: 'Бие даалт' },
            { id: 'members', label: 'Гишүүд' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-3 -mb-px border-b-2 transition-colors ${
                activeTab === t.id
                  ? 'border-cyan-500 text-cyan-600 font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}>
              {t.label}
            </button>
          ))}
        </nav>

        <section>
          {activeTab === 'overview' && (
            <div className='bg-white rounded-2xl shadow-sm border p-6'>
              <h2 className='text-lg font-semibold mb-2'>Даалгавар</h2>
              <p className='text-gray-700 leading-relaxed'>
                {group?.description || 'Одоогоор тайлбар байхгүй.'}
              </p>
            </div>
          )}

          {activeTab === 'members' && (
            <div className='bg-white rounded-2xl shadow-sm border p-6'>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {members.map(m => (
                  <div
                    key={m.id}
                    className='flex items-center gap-3 border rounded-xl p-3 hover:shadow-sm'>
                    <img
                      src={m.avatar || '/team4/student/profile.png'}
                      alt={m.name}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                    <div>
                      <p className='font-medium text-gray-900'>{m.name}</p>
                      <p className='text-xs text-gray-500'>
                        {m.role || 'Student'}
                      </p>
                    </div>
                  </div>
                ))}
                {members.length === 0 && (
                  <p className='text-gray-500'>Гишүүдийн мэдээлэл алга.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'laboratory' && (
            <div className='bg-white rounded-2xl shadow-sm border p-6'>
              <ul className='space-y-3'>
                {laboratory.map(item => (
                  <li
                    key={item.id}
                    className={`flex items-center justify-between border rounded-xl p-4 ${
                      item.isOpened ? 'border-green-400' : 'border-gray-200'
                    }`}>
                    <div>
                      <p className='font-medium text-gray-900'>{item.topic}</p>
                      <p className='text-sm text-gray-500'>{item.date}</p>
                    </div>
                    <span className='text-xs text-gray-500'>
                      {item.scoreObtained}/{item.allScore} оноо
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'biydaalt' && (
            <div className='bg-white rounded-2xl shadow-sm border p-6'>
              <ul className='space-y-3'>
                {biydaalt.map(item => (
                  <li
                    key={item.id}
                    className={`flex items-center justify-between border rounded-xl p-4 ${
                      item.isOpened ? 'border-green-400' : 'border-gray-200'
                    }`}>
                    <div>
                      <p className='font-medium text-gray-900'>{item.topic}</p>
                      <p className='text-sm text-gray-500'>{item.date}</p>
                    </div>
                    <span className='text-xs text-gray-500'>
                      {item.scoreObtained}/{item.allScore} оноо
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function BackLink() {
  return (
    <Link
      to='/team4/group'
      className='inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700'>
      <ArrowLeft size={18} /> Буцах
    </Link>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className='bg-gray-50 rounded-xl px-4 py-3 border text-left'>
      <div className='flex items-center gap-2 text-gray-500 text-xs mb-1'>
        {icon}
        <span>{label}</span>
      </div>
      <div className='text-gray-900 font-semibold'>{value}</div>
    </div>
  );
}
