import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader, Card, Button, Input } from "../components/UI";
import { isAdmin, isProfessor } from "../utils/role";

const mock = [
  { 
    id: 1, 
    name: "МУИС", 
    picture: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
    approved_by: "admin",
    approved_on: "2023-08-01"
  },
  { 
    id: 2, 
    name: "ШУТИС", 
    picture: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
    approved_by: "admin",
    approved_on: "2023-07-12"
  },
  { 
    id: 3, 
    name: "СЭЗИС", 
    picture: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop",
    approved_by: "editor",
    approved_on: "2023-09-02"
  },
  { 
    id: 4, 
    name: "Дархан Их Сургууль", 
    picture: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
    approved_by: "editor",
    approved_on: "2022-11-20"
  },
  { 
    id: 5, 
    name: "Эрдэнэт Политехник Коллеж", 
    picture: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    approved_by: "admin",
    approved_on: "2024-01-15"
  },
  { 
    id: 6, 
    name: "Монгол-Герман хамтарсан сургууль", 
    picture: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop",
    approved_by: "admin",
    approved_on: "2023-06-05"
  },
  { 
    id: 7, 
    name: "Хөвсгөл Политехник Коллеж", 
    picture: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    approved_by: "editor",
    approved_on: "2022-12-01"
  },
  { 
    id: 8, 
    name: "Өмнөговь Политехник Коллеж", 
    picture: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    approved_by: "editor",
    approved_on: "2023-02-04"
  },
  { 
    id: 9, 
    name: "Говь-Алтай Их Сургууль", 
    picture: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    approved_by: null,
    approved_on: null
  },
  { 
    id: 10, 
    name: "Завхан Их Сургууль", 
    picture: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
    approved_by: "admin",
    approved_on: "2023-05-09"
  },
  { 
    id: 11, 
    name: "Ховд Их Сургууль", 
    picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    approved_by: null,
    approved_on: null
  },
  { 
    id: 12, 
    name: "Баянхонгор Их Сургууль", 
    picture: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=300&fit=crop",
    approved_by: "system",
    approved_on: "2024-04-12"
  },
  { 
    id: 13, 
    name: "Дорнод Их Сургууль", 
    picture: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    approved_by: null,
    approved_on: null
  },
  { 
    id: 14, 
    name: "Сүхбаатар Их Сургууль", 
    picture: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    approved_by: null,
    approved_on: null
  },
  { 
    id: 15, 
    name: "Увс Их Сургууль", 
    picture: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
    approved_by: null,
    approved_on: null
  },
];

export default function SchoolsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [schools, setSchools] = useState(mock);

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (schoolId) => {
    setSchools(schools.map(school => 
      school.id === schoolId 
        ? { 
            ...school, 
            approved_by: "admin", 
            approved_on: new Date().toISOString().split('T')[0] 
          }
        : school
    ));
  };

  return (
    <div className="space-y-4">
      <PageHeader 
        title="Сургуулийн жагсаалт" 
        subtitle={isAdmin() ? "Байгууллагын бүртгэл" : isProfessor() ? "Сургуулийн мэдээлэл" : "Сургуулиуд"} 
        right={(isAdmin() || isProfessor()) ? <Link to="create"><Button>➕ Нэмэх</Button></Link> : null} 
      />
      
      {!isAdmin() && (
        <Card className="border-blue-500/30 bg-blue-500/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{isProfessor() ? "👨‍🏫" : "👨‍🎓"}</span>
            <div>
              <div className="text-white font-medium">
                {isProfessor() ? "Багшийн харагдац" : "Оюутны харагдац"}
              </div>
              <div className="text-slate-300 text-sm">
                {isProfessor() 
                  ? "Та зөвхөн сургуулийн мэдээллийг харах эрхтэй. Засах, нэмэх боломжгүй." 
                  : "Та зөвхөн үндсэн мэдээллийг харах боломжтой."}
              </div>
            </div>
          </div>
        </Card>
      )}
      
      <Card>
        <div className="mb-4">
          <Input
            label="Хайх"
            placeholder="Сургуулийн нэр..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      {isAdmin() && schools.filter(s => !s.approved_by).length > 0 && (
        <Card className="border-yellow-500/30 bg-yellow-500/10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <div className="text-white font-medium">
                Баталгаажаагүй сургуулиуд: {schools.filter(s => !s.approved_by).length}
              </div>
              <div className="text-slate-300 text-sm">
                Доорх сургуулиудыг баталгаажуулах шаардлагатай
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchools.map((school) => (
          <Card 
            key={school.id} 
            className={`overflow-hidden hover:bg-white/10 transition-all duration-300 group ${
              !school.approved_by && isAdmin() ? 'border-yellow-500/50 border-2' : ''
            }`}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={school.picture}
                alt={school.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg mb-1">{school.name}</h3>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="space-y-2 text-sm">
                {school.approved_by && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>✅</span>
                    <span>Баталсан: {school.approved_by}</span>
                  </div>
                )}
                {school.approved_on && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>📅</span>
                    <span>Огноо: {school.approved_on}</span>
                  </div>
                )}
                {!school.approved_by && !school.approved_on && (
                  <div className="flex items-center gap-2 text-slate-500">
                    <span>⏳</span>
                    <span>Баталгаажаагүй</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-white/10 space-y-2">
                <div className={`flex gap-2 ${(isAdmin() || isProfessor()) ? '' : 'justify-center'}`}>
                  <Link to={`${school.id}`} className={(isAdmin() || isProfessor()) ? "flex-1" : "w-full"}>
                    <Button variant="ghost" className="w-full">👁️ Харах</Button>
                  </Link>
                  {(isAdmin() || isProfessor()) && (
                    <Link to={`${school.id}/edit`} className="flex-1">
                      <Button variant="ghost" className="w-full">✏️ Засах</Button>
                    </Link>
                  )}
                </div>
                {isAdmin() && !school.approved_by && (
                  <Button 
                    variant="ghost" 
                    className="w-full bg-green-600/20 hover:bg-green-600/30 text-green-400 border-green-600/30"
                    onClick={() => handleApprove(school.id)}
                  >
                    ✅ Баталгаажуулах
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredSchools.length === 0 && (
        <Card>
          <div className="text-center py-8 text-slate-400">
            <p className="text-lg">Илэрц олдсонгүй</p>
            <p className="text-sm mt-2">Хайлтын үгээ өөрчилж үзнэ үү</p>
          </div>
        </Card>
      )}
    </div>
  );
}