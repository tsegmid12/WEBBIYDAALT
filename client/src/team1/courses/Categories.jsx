import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { PageHeader, Card, Button, Input, Table } from "../components/UI";
import { isAdmin } from "../utils/role";

export default function Categories() {
  if (!isAdmin()) {
    return <Navigate to="/team1/courses" replace />;
  }

  // Энд localStorage-оос унших логик байгаагүй — зөвхөн анхны default массив ашиглана
  const [categories, setCategories] = useState([
    "Кибер",
    "Мэдээллийн технологи",
    "Програмчлал",
    "Сүлжээ",
    "Хиймэл оюун",
    "Өгөгдөл"
  ]);

  const [name, setName] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingName, setEditingName] = useState("");

  // CREATE
  const addCategory = (e) => {
    e.preventDefault();
    const v = name.trim();
    if (!v) return;
    setCategories([...categories, v]);
    setName("");
  };

  // DELETE → шууд устгана (confirm байхгүй)
  const deleteCategory = (index) => {
    setCategories((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingName("");
    }
  };

  // EDIT flow
  const startEdit = (index) => {
    setEditingIndex(index);
    setEditingName(categories[index]);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingName("");
  };

  const saveEdit = (index) => {
    const v = editingName.trim();
    if (!v) return;
    setCategories(categories.map((c, i) => (i === index ? v : c)));
    setEditingIndex(null);
    setEditingName("");
  };

  return (
    <div className="space-y-4">
      <PageHeader title="Хичээлийн ангилал" />

      <div className="grid sm:grid-cols-3 gap-4">
        {/* CREATE form */}
        <Card>
          <form className="space-y-3" onSubmit={addCategory}>
            <Input
              label="Ангилалын нэр"
              placeholder="ж: Программчлал"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button type="submit">Нэмэх</Button>
          </form>
        </Card>

        {/* LIST */}
        <div className="sm:col-span-2">
          <Card>
            <Table columns={["#", "Нэр", "Үйлдэл"]}>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-slate-400">
                    Ангилал алга.
                  </td>
                </tr>
              ) : (
                categories.map((name, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3">{i + 1}</td>

                    <td className="px-4 py-3">
                      {editingIndex === i ? (
                        <input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-3 py-1 text-slate-100"
                        />
                      ) : (
                        name
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {editingIndex === i ? (
                          <>
                            <Button onClick={() => saveEdit(i)}>Хадгалах</Button>
                            <Button variant="ghost" onClick={cancelEdit}>Болих</Button>
                          </>
                        ) : (
                          <>
                            <Button variant="ghost" onClick={() => startEdit(i)}>Засах</Button>
                            <Button variant="ghost" onClick={() => deleteCategory(i)}>Устгах</Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}
