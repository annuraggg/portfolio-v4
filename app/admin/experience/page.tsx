"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X } from "lucide-react";

interface Experience {
  id?: number;
  title: string;
  date: string;
  description: string;
  role: string;
}

export default function ExperienceManagementPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<Experience>({
    title: "",
    date: "",
    description: "",
    role: "",
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch("/api/admin/experience");
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
      toast.error("Failed to fetch experiences");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = editingExperience ? "PUT" : "POST";
      const body = editingExperience ? { id: editingExperience.id, ...formData } : formData;

      const response = await fetch("/api/admin/experience", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success(editingExperience ? "Experience updated!" : "Experience created!");
        setIsFormOpen(false);
        setEditingExperience(null);
        resetForm();
        fetchExperiences();
      } else {
        toast.error("Failed to save experience");
      }
    } catch (error) {
      console.error("Error saving experience:", error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      const response = await fetch("/api/admin/experience", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        toast.success("Experience deleted!");
        fetchExperiences();
      } else {
        toast.error("Failed to delete experience");
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast.error("An error occurred");
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData(experience);
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      description: "",
      role: "",
    });
  };

  if (isLoading && !isFormOpen) {
    return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Experience Management</h1>
        <Button onClick={() => { resetForm(); setIsFormOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingExperience ? "Edit Experience" : "Add New Experience"}
              </h2>
              <Button variant="ghost" onClick={() => { setIsFormOpen(false); setEditingExperience(null); }}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company/Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date/Period *</label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    placeholder="e.g., 2020 - 2023"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Role/Position *</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-background h-32"
                  placeholder="Describe your role and responsibilities"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : editingExperience ? "Update" : "Create"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingExperience(null);
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
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Period</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((experience) => (
              <tr key={experience.id} className="border-t border-secondary/20">
                <td className="px-4 py-3 font-medium">{experience.title}</td>
                <td className="px-4 py-3">{experience.role}</td>
                <td className="px-4 py-3">{experience.date}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(experience)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => experience.id && handleDelete(experience.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {experiences.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No experiences found. Add your first experience!
          </div>
        )}
      </div>
    </div>
  );
}
