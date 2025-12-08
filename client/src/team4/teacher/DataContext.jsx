import React, { createContext, useContext, useState, useEffect } from 'react';
import { uuid } from './utils';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // Initial mock data
  // Basic teacher profile information.  The institution has been set to
  // ШУТИС-МХТС as requested.  Additional properties can be updated from
  // the settings page via setProfile.
  const [profile, setProfile] = useState({
    name: 'Б.Болд',
    nick: 'Болд багш',
    institution: 'ШУТИС-МХТС',
    department: 'Мэдээллийн технологийн сургууль',
    avatarColor: '#3B82F6'
  });

  // Course definitions.  Each course now contains a complete 8‑week
  // syllabus.  This allows the teacher to add, edit and remove
  // assignments/lessons per week.  Schedules are defined so they can
  // appear on the calendar view.
  const [courses, setCourses] = useState([
    {
      id: 'course-1',
      title: 'Web программчлал',
      teacher: 'Б.Болд',
      colour: '#FF6B6B',
      // Each course should have between 10 and 30 students.  Assign all
      // available student IDs to satisfy the minimum requirement.
      students: ['student-1', 'student-2', 'student-3', 'student-4', 'student-5', 'student-6', 'student-7', 'student-8', 'student-9', 'student-10'],
      favourites: false,
      image: null,
      schedule: [
        { day: 0, start: '09:40', end: '11:10' },
        { day: 2, start: '13:20', end: '14:50' }
      ],
      weeks: Array.from({ length: 8 }).map((_, idx) => ({
        title: `${idx + 1}-р долоо хоног: Сэдэв ${idx + 1}`,
        lessons: idx === 0
          ? [
              { id: uuid(), title: 'HTML үндэс', type: 'video', duration: '45 мин' },
              { id: uuid(), title: 'CSS үндэс', type: 'lecture', duration: '90 мин' }
            ]
          : []
      }))
    },
    {
      id: 'course-2',
      title: 'Өгөгдлийн сан',
      teacher: 'Б.Болд',
      colour: '#4ECDC4',
      students: ['student-1', 'student-2', 'student-3', 'student-4', 'student-5', 'student-6', 'student-7', 'student-8', 'student-9', 'student-10'],
      favourites: false,
      image: null,
      schedule: [
        { day: 1, start: '11:20', end: '12:50' }
      ],
      weeks: Array.from({ length: 8 }).map((_, idx) => ({
        title: `${idx + 1}-р долоо хоног: SQL сэдэв ${idx + 1}`,
        lessons: idx === 0
          ? [
              { id: uuid(), title: 'SQL Танилцуулга', type: 'video', duration: '60 мин' }
            ]
          : []
      }))
    },
    {
      id: 'course-3',
      title: 'Программчлалын үндэс',
      teacher: 'Б.Болд',
      colour: '#45B7D1',
      students: ['student-1', 'student-2', 'student-3', 'student-4', 'student-5', 'student-6', 'student-7', 'student-8', 'student-9', 'student-10'],
      favourites: false,
      image: null,
      schedule: [
        { day: 3, start: '15:00', end: '16:30' }
      ],
      weeks: Array.from({ length: 8 }).map((_, idx) => ({
        title: `${idx + 1}-р долоо хоног: Python сэдэв ${idx + 1}`,
        lessons: idx === 0
          ? [
              { id: uuid(), title: 'Python суулгах', type: 'lecture', duration: '30 мин' }
            ]
          : []
      }))
    }
  ]);

  // Students now include grades and attendance for each course.  Grades are
  // percentages from 0‑100 and attendance tracks how many sessions a
  // student has attended out of the total.  These values are used
  // throughout the application for progress bars and grade editing.
  const [students, setStudents] = useState([
    {
      id: 'student-1',
      name: 'Д.Дорж',
      code: 'SW21D001',
      email: 'dorj@student.edu.mn',
      phone: '99001122',
      address: 'УБ хот',
      avatarColor: '#FFA07A',
      favourites: false,
      progress: {
        'course-1': { completed: 1, total: 2 },
        'course-2': { completed: 0, total: 1 }
      },
      grades: {
        'course-1': 85,
        'course-2': 78
      },
      attendance: {
        'course-1': { attended: 3, total: 4 },
        'course-2': { attended: 1, total: 2 }
      }
    },
    {
      id: 'student-2',
      name: 'Б.Бат',
      code: 'SW21D002',
      email: 'bat@student.edu.mn',
      phone: '99112233',
      address: 'УБ хот',
      avatarColor: '#98D8C8',
      favourites: false,
      progress: {
        'course-1': { completed: 2, total: 2 },
        'course-3': { completed: 1, total: 1 }
      },
      grades: {
        'course-1': 92,
        'course-3': 88
      },
      attendance: {
        'course-1': { attended: 4, total: 4 },
        'course-3': { attended: 2, total: 2 }
      }
    },
    {
      id: 'student-3',
      name: 'С.Сүх',
      code: 'SW21D003',
      email: 'sukh@student.edu.mn',
      phone: '99223344',
      address: 'УБ хот',
      avatarColor: '#F7DC6F',
      favourites: false,
      progress: {
        'course-1': { completed: 1, total: 2 },
        'course-3': { completed: 0, total: 1 }
      },
      grades: {
        'course-1': 70,
        'course-3': 64
      },
      attendance: {
        'course-1': { attended: 2, total: 4 },
        'course-3': { attended: 1, total: 2 }
      }
    },
    {
      id: 'student-4',
      name: 'Г.Ганболд',
      code: 'SW21D004',
      email: 'ganbold@student.edu.mn',
      phone: '99334455',
      address: 'УБ хот',
      avatarColor: '#BB8FCE',
      favourites: false,
      progress: {
        'course-2': { completed: 1, total: 1 },
        'course-3': { completed: 1, total: 1 }
      },
      grades: {
        'course-2': 95,
        'course-3': 82
      },
      attendance: {
        'course-2': { attended: 2, total: 2 },
        'course-3': { attended: 2, total: 2 }
      }
    },
    {
      id: 'student-5',
      name: 'Ө.Өнөр',
      code: 'SW21D005',
      email: 'onor@student.edu.mn',
      phone: '99445566',
      address: 'УБ хот',
      avatarColor: '#85C1E2',
      favourites: false,
      progress: {
        'course-3': { completed: 0, total: 1 }
      },
      grades: {
        'course-3': 55
      },
      attendance: {
        'course-3': { attended: 0, total: 1 }
      }
    }
    ,
    // Additional mock students to populate the teacher dashboard.  These
    // learners follow the same data structure as the existing
    // students above.  Each student has a unique ID, basic profile
    // information and optional progress/grade/attendance mappings.
    {
      id: 'student-6',
      name: 'Л.Лхагва',
      code: 'SW21D006',
      email: 'lhagva@student.edu.mn',
      phone: '99556677',
      address: 'УБ хот',
      avatarColor: '#E58E26',
      favourites: false,
      progress: {
        'course-1': { completed: 0, total: 2 }
      },
      grades: {
        'course-1': 60
      },
      attendance: {
        'course-1': { attended: 1, total: 4 }
      }
    },
    {
      id: 'student-7',
      name: 'М.Мөнх-Эрдэнэ',
      code: 'SW21D007',
      email: 'monh@student.edu.mn',
      phone: '99667788',
      address: 'УБ хот',
      avatarColor: '#2ECC71',
      favourites: false,
      progress: {
        'course-2': { completed: 1, total: 1 }
      },
      grades: {
        'course-2': 88
      },
      attendance: {
        'course-2': { attended: 2, total: 2 }
      }
    },
    {
      id: 'student-8',
      name: 'С.Саруул',
      code: 'SW21D008',
      email: 'saruul@student.edu.mn',
      phone: '99778899',
      address: 'Дархан хот',
      avatarColor: '#A569BD',
      favourites: false,
      progress: {
        'course-3': { completed: 0, total: 1 }
      },
      grades: {
        'course-3': 72
      },
      attendance: {
        'course-3': { attended: 1, total: 1 }
      }
    },
    {
      id: 'student-9',
      name: 'Б.Бямбасүрэн',
      code: 'SW21D009',
      email: 'byamba@student.edu.mn',
      phone: '99889900',
      address: 'Эрдэнэт хот',
      avatarColor: '#F5B041',
      favourites: false,
      progress: {},
      grades: {},
      attendance: {}
    },
    {
      id: 'student-10',
      name: 'Д.Дөлгөөн',
      code: 'SW21D010',
      email: 'dulguun@student.edu.mn',
      phone: '99887766',
      address: 'УБ хот',
      avatarColor: '#17A589',
      favourites: false,
      progress: {},
      grades: {},
      attendance: {}
    }
  ]);

  // Groups per course.  Each course has between 1 and 4 teams.  Teams
  // contain members (student IDs) as well as lists of assignments and
  // labs.  The favourites flag allows a team to be bookmarked.  You
  // can add or remove members and tasks from the group detail view.
  const [groups, setGroups] = useState([
    // Groups for course-1
    {
      id: 'group-1',
      courseId: 'course-1',
      name: 'Баг 1',
      colour: '#FF6B6B',
      members: ['student-1', 'student-2'],
      assignments: [
        { id: uuid(), title: 'HTML даалгавар', date: '2025.11.15', complete: false }
      ],
      labs: [
        { id: uuid(), title: 'CSS лаб', date: '2025.11.20', complete: false }
      ],
      favourites: false,
      grades: { 'student-1': 85, 'student-2': 92 }
    },
    {
      id: 'group-2',
      courseId: 'course-1',
      name: 'Баг 2',
      colour: '#FF6B6B',
      members: ['student-3'],
      assignments: [],
      labs: [],
      favourites: false,
      grades: { 'student-3': 70 }
    },
    {
      id: 'group-3',
      courseId: 'course-2',
      name: 'Баг 1',
      colour: '#4ECDC4',
      members: ['student-1', 'student-4'],
      assignments: [],
      labs: [],
      favourites: false,
      grades: { 'student-1': 78, 'student-4': 95 }
    },
    {
      id: 'group-4',
      courseId: 'course-3',
      name: 'Баг 1',
      colour: '#45B7D1',
      members: ['student-2', 'student-3'],
      assignments: [],
      labs: [],
      favourites: false,
      grades: { 'student-2': 88, 'student-3': 64 }
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      type: 'system',
      title: 'Системийн мэдэгдэл',
      message: 'Системд шинэчлэлт хийгдлээ',
      time: '2025-11-07T09:00:00',
      read: false
    },
    {
      id: 'notif-2',
      type: 'course',
      title: 'Хичээлийн мэдэгдэл',
      message: 'Web программчлал хичээлд шинэ даалгавар нэмэгдлээ',
      time: '2025-11-07T10:30:00',
      read: false
    },
    {
      id: 'notif-3',
      type: 'system',
      title: 'Системийн сануулга',
      message: 'Та профайлаа шинэчлээрэй',
      time: '2025-11-06T15:45:00',
      read: true
    },
    {
      id: 'notif-4',
      type: 'course',
      title: 'Өгөгдлийн сан даалгавар',
      message: 'SQL үндэс даалгавар нэмэгдлээ',
      time: '2025-11-05T13:00:00',
      read: false
    }
  ]);

  // Helper functions
  const getCourseById = (id) => courses.find(c => c.id === id);
  const getStudentById = (id) => students.find(s => s.id === id);
  const getGroupById = (id) => groups.find(g => g.id === id);

  const updateCourse = (id, updates) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const updateStudent = (id, updates) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const updateGroup = (id, updates) => {
    setGroups(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
  };

  const updateNotification = (id, updates) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
  };

  const addGroup = (group) => {
    setGroups(prev => [...prev, { ...group, id: uuid() }]);
  };

  const addLesson = (courseId, weekIndex, lesson) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const newWeeks = [...c.weeks];
        newWeeks[weekIndex].lessons.push({ ...lesson, id: uuid() });
        return { ...c, weeks: newWeeks };
      }
      return c;
    }));
  };

  const deleteLesson = (courseId, weekIndex, lessonIndex) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const newWeeks = [...c.weeks];
        newWeeks[weekIndex].lessons.splice(lessonIndex, 1);
        return { ...c, weeks: newWeeks };
      }
      return c;
    }));
  };

  // Update a specific lesson.  Used when editing an assignment title or
  // other metadata.  Accepts the course ID, the week index and the
  // lesson index along with a set of property updates.
  const updateLesson = (courseId, weekIndex, lessonIndex, updates) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const weeksCopy = c.weeks.map((week, wIdx) => {
          if (wIdx !== weekIndex) return week;
          const lessons = week.lessons.map((lesson, lIdx) => {
            if (lIdx !== lessonIndex) return lesson;
            return { ...lesson, ...updates };
          });
          return { ...week, lessons };
        });
        return { ...c, weeks: weeksCopy };
      }
      return c;
    }));
  };

  // Update a student's grade for a specific course.  Grades live on the
  // student object under the `grades` map.  Passing a new grade will
  // overwrite any existing value.
  const updateStudentGrade = (studentId, courseId, grade) => {
    setStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      return {
        ...s,
        grades: {
          ...s.grades,
          [courseId]: grade
        }
      };
    }));
  };

  // Update a student's attendance record.  Accepts attended and total
  // sessions.  Use this to track attendance percentage next to the
  // student name in course detail.
  const updateStudentAttendance = (studentId, courseId, attended, total) => {
    setStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      return {
        ...s,
        attendance: {
          ...s.attendance,
          [courseId]: { attended, total }
        }
      };
    }));
  };

  // Update the members list of a group.  This is useful when adding or
  // removing students from a team.  The provided members array will
  // completely replace the existing one.
  const updateGroupMembers = (groupId, members) => {
    setGroups(prev => prev.map(g => g.id === groupId ? { ...g, members } : g));
  };

  // Update the grade mapping for a group.  Grades are stored per
  // student in the group context.  Use this when grading team
  // members.  The provided grades object should map student IDs to
  // their grade percentage.
  const updateGroupGrades = (groupId, grades) => {
    setGroups(prev => prev.map(g => g.id === groupId ? { ...g, grades } : g));
  };

  // Save to localStorage
  useEffect(() => {
    const data = {
      profile,
      courses,
      students,
      groups,
      notifications
    };
    localStorage.setItem('teacherData', JSON.stringify(data));
  }, [profile, courses, students, groups, notifications]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('teacherData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.profile) setProfile(data.profile);
        if (data.courses) setCourses(data.courses);
        if (data.students) setStudents(data.students);
        if (data.groups) setGroups(data.groups);
        if (data.notifications) setNotifications(data.notifications);
      } catch (e) {
        console.error('Failed to load data:', e);
      }
    }
  }, []);

  const value = {
    profile,
    setProfile,
    courses,
    setCourses,
    students,
    setStudents,
    groups,
    setGroups,
    notifications,
    setNotifications,
    getCourseById,
    getStudentById,
    getGroupById,
    updateCourse,
    updateStudent,
    updateGroup,
    updateNotification,
    addGroup,
    addLesson,
    deleteLesson,
    updateLesson,
    updateStudentGrade,
    updateStudentAttendance,
    updateGroupMembers,
    updateGroupGrades
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
