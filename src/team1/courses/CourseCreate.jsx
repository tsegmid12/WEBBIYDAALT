import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, Card, Button } from "../components/UI";

export default function CourseCreate(){
  const nav = useNavigate();

  // State
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef(null);

  // Файл оруулах үед preview хийх
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Зөвхөн зургийн файлыг сонгоно уу.");
      setFileInputKey(Date.now());
      return;
    }

    // upload priority → URL-ыг цэвэрлэнэ
    setImageUrl("");
    setImageError("");

    const reader = new FileReader();
    reader.onload = () => setImagePreview(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  // Upload товч → file input ажиллуулах
  const openFileDialog = () => fileInputRef.current?.click();

  // URL input дээр бичигдэхэд file preview-ыг арилгана
  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setImageError("");
    if (imagePreview) {
      setImagePreview("");
      setFileInputKey(Date.now());
    }
  };

  const handleImgError = () => {
    setImageError("Зураг ачаалахад алдаа гарлаа — URL эсвэл файлыг шалгана уу.");
  };

  return (
    <div className="space-y-4">
      <PageHeader title="Шинэ хичээл бүртгэх" />

      <Card>
        <form
          className="grid sm:grid-cols-2 gap-4"
          onSubmit={(e)=>{e.preventDefault(); nav("..");}}
        >
          <div>
            <label className="block text-sm">
              <div className="text-slate-200 mb-1">Нэр</div>
              <input
                placeholder="ж: Вэб систем"
                required
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm">
              <div className="text-slate-200 mb-1">Хуулбарын ID</div>
              <input
                type="number"
                placeholder="ж: 12"
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </label>
          </div>

          {/* ---------- Зураг: flex inline (input + Upload button) ---------- */}
          <div className="sm:col-span-1">
            <div className="text-sm text-slate-200 mb-1">Зураг</div>

            <div className="flex items-center gap-3">
              {/* Input field (looks like your Input component) */}
              <input
                type="url"
                placeholder="https://..."
                value={imageUrl}
                onChange={handleUrlChange}
                className="flex-1 rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />

              {/* Upload button aligned center with input */}
              <button
                type="button"
                onClick={openFileDialog}
                className="px-3 py-2 rounded-xl text-sm bg-white/6 hover:bg-white/10 border border-white/10"
              >
                Upload
              </button>
            </div>

            {/* Hidden file input */}
            <input
              key={fileInputKey}
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />

            {/* Preview */}
            {(imagePreview || imageUrl) && (
              <div className="mt-2 rounded-md border border-white/10 p-2">
                <img
                  src={imagePreview || imageUrl}
                  alt="preview"
                  onError={handleImgError}
                  className="max-h-40 object-contain"
                />
                {imageError && (
                  <div className="mt-2 text-sm text-rose-400">{imageError}</div>
                )}
                {imagePreview && (
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      className="px-3 py-1 rounded-lg text-sm bg-transparent border border-white/10"
                      onClick={() => {
                        setImagePreview("");
                        setFileInputKey(Date.now());
                      }}
                    >
                      Цэвэрлэх
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* -------------------------------------------------- */}

          <div>
            <label className="block text-sm">
              <div className="text-slate-200 mb-1">Эхлэх огноо</div>
              <input
                type="date"
                required
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm">
              <div className="text-slate-200 mb-1">Дуусах огноо</div>
              <input
                type="date"
                required
                className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </label>
          </div>

          <div className="sm:col-span-2 flex items-center justify-end gap-2">
            <Button type="button" variant="ghost" onClick={()=>nav(-1)}>
              Болих
            </Button>
            <Button type="submit">Хадгалах</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
