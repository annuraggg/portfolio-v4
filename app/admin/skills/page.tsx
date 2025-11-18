"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X } from "lucide-react";

interface Skill {
  id?: number;
  title: string;
  progress?: string;
}

export default function SkillsManagementPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState<Skill>({
    title: "",
    progress: "",
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/admin/skills");
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
      toast.error("Failed to fetch skills");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = editingSkill ? "PUT" : "POST";
      const body = editingSkill ? { id: editingSkill.id, ...formData } : formData;

      const response = await fetch("/api/admin/skills", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success(editingSkill ? "Skill updated!" : "Skill created!");
        setIsFormOpen(false);
        setEditingSkill(null);
        resetForm();
        fetchSkills();
      } else {
        toast.error("Failed to save skill");
      }
    } catch (error) {
      console.error("Error saving skill:", error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const response = await fetch("/api/admin/skills", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        toast.success("Skill deleted!");
        fetchSkills();
      } else {
        toast.error("Failed to delete skill");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      toast.error("An error occurred");
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData(skill);
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      progress: "",
    });
  };

  if (isLoading && !isFormOpen) {
    return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Skills Management</h1>
        <Button onClick={() => { resetForm(); setIsFormOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingSkill ? "Edit Skill" : "Add New Skill"}
              </h2>
              <Button variant="ghost" onClick={() => { setIsFormOpen(false); setEditingSkill(null); }}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  placeholder="e.g., JavaScript, React, Python"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Progress/Level (Optional)</label>
                <input
                  type="text"
                  value={formData.progress || ""}
                  onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  placeholder="e.g., Expert, Intermediate, Advanced"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : editingSkill ? "Update" : "Create"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingSkill(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-secondary/10 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-secondary/20">
            <tr>
              <th className="px-4 py-3 text-left">Skill Name</th>
              <th className="px-4 py-3 text-left">Progress/Level</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id} className="border-t border-secondary/20">
                <td className="px-4 py-3 font-medium">{skill.title}</td>
                <td className="px-4 py-3">{skill.progress || "-"}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(skill)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => skill.id && handleDelete(skill.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {skills.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No skills found. Add your first skill!
          </div>
        )}
      </div>
    </div>
  );
}
