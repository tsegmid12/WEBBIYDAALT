import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, Card, Button, Input } from "../components/UI";
import { isAdmin } from "../utils/role";

export default function SchoolCreate() {
  const nav = useNavigate();
  const [photoPreview, setPhotoPreview] = useState("");

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader title="Шинэ сургууль бүртгэх" />
      <Card>
        <form className="grid sm:grid-cols-2 gap-4" onSubmit={(e)=>{e.preventDefault(); nav("..");}}>
          <Input label="Сургуулийн нэр" placeholder="ж: ШУТИС" required />
          
          <div className="sm:col-span-2">
            <label className="block text-sm text-slate-200 mb-2">Зураг</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
            />
          </div>

          {isAdmin() && (
            <>
              <Input label="Баталсан хэрэглэгч" placeholder="ж: admin" />
              <Input label="Батлагдсан огноо" type="date" />
            </>
          )}
          
          {photoPreview && (
            <div className="sm:col-span-2">
              <label className="block text-sm text-slate-200 mb-2">Зургийн урьдчилсан харагдац</label>
              <div className="rounded-xl overflow-hidden border border-white/10 bg-slate-900/60">
                <img 
                  src={photoPreview} 
                  alt="Preview" 
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
          
          <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-2 border-t border-white/10">
            <Button type="button" variant="ghost" onClick={()=>nav(-1)}>Болих</Button>
            <Button type="submit">💾 Хадгалах</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}