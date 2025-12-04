import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageHeader, Card, Button } from "../components/UI";
import { isAdmin, isProfessor } from "../utils/role";

export default function SchoolView(){
  const { school_id } = useParams();
  const [data, setData] = useState({ 
    id: school_id, 
    name: "ШУТИС", 
    picture: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=500&fit=crop",
    approved_by: null,
    approved_on: null
  });

  const handleApprove = () => {
    setData({
      ...data,
      approved_by: "admin",
      approved_on: new Date().toISOString().split('T')[0]
    });
  };
  
  return (
    <div className="space-y-4">
      <PageHeader 
        title={`Сургуулийн мэдээлэл #${data.id}`}
      />
      
      {/* Photo Header */}
      {data.picture && (
        <Card className="overflow-hidden p-0">
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={data.picture}
              alt={data.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=500&fit=crop";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{data.name}</h2>
            </div>
          </div>
        </Card>
      )}

      {/* Main Information Card */}
      <Card>
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <dt className="text-slate-400 text-sm mb-1 flex items-center gap-2">
              <span>🏫</span> Нэр
            </dt>
            <dd className="text-white font-semibold text-lg">{data.name}</dd>
          </div>
          {data.approved_by && (
            <div>
              <dt className="text-slate-400 text-sm mb-1 flex items-center gap-2">
                <span>✅</span> Баталсан хэрэглэгч
              </dt>
              <dd className="text-white font-semibold text-lg">{data.approved_by}</dd>
            </div>
          )}
          {data.approved_on && (
            <div>
              <dt className="text-slate-400 text-sm mb-1 flex items-center gap-2">
                <span>📅</span> Батлагдсан огноо
              </dt>
              <dd className="text-white font-semibold text-lg">{data.approved_on}</dd>
            </div>
          )}
        </dl>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="flex gap-3 justify-end">
          <Link to="..">
            <Button variant="ghost">← Буцах</Button>
          </Link>
          {(isAdmin() || isProfessor()) && (
            <Link to="edit">
              <Button>✏️ Засах</Button>
            </Link>
          )}
        </div>
        {isAdmin() && !data.approved_by && (
          <div className="flex justify-end">
            <Button 
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
            >
              ✅ Баталгаажуулах
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}