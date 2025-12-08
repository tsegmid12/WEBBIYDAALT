import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader, Card, Button, Input, Textarea, Select } from "../components/UI";

export default function LessonCreate(){
  const { course_id } = useParams();
  const nav = useNavigate();
  
  // ERD-д нийцсэн талбарууд
  const [name, setName] = useState("");
  const [typeId, setTypeId] = useState("");
  const [parentId, setParentId] = useState("");
  const [content, setContent] = useState("");
  const [point, setPoint] = useState("");
  const [isAttainable, setIsAttainable] = useState(true);

  const errors = useMemo(() => {
    const e = {};
    if (!name.trim()) e.name = "Нэр шаардлагатай";
    if (point !== "" && Number(point) < 0) e.point = "Эерэг тоо эсвэл 0 оруулна уу";
    return e;
  }, [name, point]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length) return;
    // TODO: call API with course_id, type_id, parent_id, name, content, point, is_attainable
    nav("..");
  };

  const onKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      if (!Object.keys(errors).length) nav("..");
    }
  };
  
  return (
    <div className="space-y-4">
      <PageHeader title={`Шинэ сэдэв бүртгэх (Хичээл #${course_id})`} />
      <Card>
        <form className="grid sm:grid-cols-2 gap-4" onSubmit={handleSubmit} onKeyDown={onKeyDown}>
          <Input 
            label="Нэр" 
            placeholder="ж: React Router үндэс" 
            value={name} 
            onChange={(e)=>setName(e.target.value)} 
            required 
            hint={errors.name} 
          />
          <Input 
            label="Төрлийн ID" 
            type="number" 
            placeholder="ж: 1" 
            value={typeId} 
            onChange={(e)=>setTypeId(e.target.value)} 
          />

          <Input 
            label="Эцэг сэдвийн ID" 
            type="number" 
            placeholder="Дэд сэдэв бол..." 
            value={parentId} 
            onChange={(e)=>setParentId(e.target.value)} 
          />
          <Input 
            label="Оноо" 
            type="number" 
            placeholder="ж: 10" 
            value={point} 
            onChange={(e)=>setPoint(e.target.value)} 
            hint={errors.point} 
          />

          <div className="sm:col-span-2">
            <Textarea 
              label="Агуулга" 
              placeholder="Сэдвийн дэлгэрэнгүй агуулга..." 
              value={content} 
              onChange={(e)=>setContent(e.target.value)} 
              rows={6}
            />
            <div className="mt-1 text-xs text-slate-400">{content.length} тэмдэгт</div>
          </div>

          <div className="sm:col-span-2">
            <label className="flex items-center gap-2 text-slate-200">
              <input 
                type="checkbox" 
                checked={isAttainable} 
                onChange={(e)=>setIsAttainable(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Хүртэж авах боломжтой</span>
            </label>
          </div>

          <div className="sm:col-span-2 flex items-center justify-end gap-2">
            <Button type="button" variant="ghost" onClick={()=>nav(-1)}>Болих</Button>
            <Button type="submit" disabled={Object.keys(errors).length>0}>Хадгалах</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}