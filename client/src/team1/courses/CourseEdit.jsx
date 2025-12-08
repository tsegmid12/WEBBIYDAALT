import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader, Card, Button, Input } from "../components/UI";

export default function CourseEdit() {
  const nav = useNavigate();
  const { course_id } = useParams();

  const allCourses = [
    { id: 11, name: "Вэб систем", clone_id: null, picture: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=240&fit=crop", start_date: "2025-02-01", end_date: "2025-05-25" },
    { id: 12, name: "Мэдээллийн аюулгүй байдал", clone_id: 11, picture: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=240&fit=crop", start_date: "2025-03-01", end_date: "2025-06-01" },
    { id: 13, name: "Өгөгдлийн бүтэц", clone_id: null, picture: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=400&h=240&fit=crop", start_date: "2025-01-15", end_date: "2025-04-30" },
    { id: 14, name: "Алгоритм ба анализ", clone_id: 13, picture: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=400&h=240&fit=crop", start_date: "2025-02-10", end_date: "2025-06-10" },
  ];

  const currentCourse = allCourses.find(c => c.id === Number(course_id)) || allCourses[0];

  // Image states
  const [imageUrl, setImageUrl] = useState(currentCourse.picture);
  const [imagePreview, setImagePreview] = useState("");
  const [fileKey, setFileKey] = useState(Date.now());
  const [imageError, setImageError] = useState("");

  const fileInputRef = useRef(null);

  // File select
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Зөвхөн зургийн файл сонгоно уу");
      setFileKey(Date.now());
      return;
    }

    setImageUrl("");
    setImageError("");

    const reader = new FileReader();
    reader.onload = () => setImagePreview(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  const openFileDialog = () => fileInputRef.current?.click();

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setImageError("");

    if (imagePreview) {
      setImagePreview("");
      setFileKey(Date.now());
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader title={`Хичээл засах #${course_id}`} />

      <Card>
        <form
          className="grid sm:grid-cols-2 gap-4"
          onSubmit={(e) => { e.preventDefault(); nav(".."); }}
        >
          <Input label="Нэр" defaultValue={currentCourse.name} required />
          <Input label="Хуулбарын ID" type="number" defaultValue={currentCourse.clone_id || ""} />

          {/* -------- Зураг оруулах хэсэг (URL + Upload) -------- */}
          <div>
            <div className="text-sm text-slate-200 mb-1">Зураг</div>

            <div className="flex items-center gap-3">
              <input
                type="url"
                placeholder="https://..."
                value={imageUrl}
                onChange={handleUrlChange}
                className="flex-1 rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2
                           text-slate-100 placeholder:text-slate-500 focus:outline-none
                           focus:ring-2 focus:ring-indigo-500/50"
              />

              <button
                type="button"
                onClick={openFileDialog}
                className="px-3 py-2 rounded-xl text-sm bg-white/10 hover:bg-white/20 border border-white/20"
              >
                Upload
              </button>
            </div>

            <input
              key={fileKey}
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileSelect}
            />

            {(imagePreview || imageUrl) && (
              <div className="mt-2 border border-white/10 rounded-lg p-2">
                <img
                  src={imagePreview || imageUrl}
                  alt="preview"
                  className="max-h-40 object-contain"
                  onError={() => setImageError("URL буруу байна")}
                />

                {imageError && (
                  <div className="text-sm text-rose-400 mt-1">{imageError}</div>
                )}

                {imagePreview && (
                  <div className="mt-2">
                    <button
                      type="button"
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10"
                      onClick={() => {
                        setImagePreview("");
                        setFileKey(Date.now());
                      }}
                    >
                      Цэвэрлэх
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* ------------------------------------------------------ */}

          <Input label="Эхлэх огноо" type="date" defaultValue={currentCourse.start_date} required />
          <Input label="Дуусах огноо" type="date" defaultValue={currentCourse.end_date} required />

          <div className="sm:col-span-2 flex items-center justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => nav(-1)}>Болих</Button>
            <Button type="submit">Хадгалах</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
