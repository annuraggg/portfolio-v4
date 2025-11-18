"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import FileUpload from "@/components/admin/FileUpload";

interface Project {
  id?: string;
  title: string;
  date: string;
  cover?: string;
  role: string;
  timeline: string;
  waiter?: string;
  summary: string;
  description: string;
  problem?: string;
  solution?: string;
  highlights: { title: string; desc: string }[];
  technologies: string[];
  screenshots?: string[];
  links?: {
    github?: string[];
    demo?: string;
  };
  development?: boolean;
  group?: string;
}

export default function ProjectsManagementPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: "",
    date: "",
    role: "",
    timeline: "",
    summary: "",
    description: "",
    highlights: [{ title: "", desc: "" }],
    technologies: [],
    development: false,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = editingProject ? "PUT" : "POST";
      const body = editingProject ? { id: editingProject.id, ...formData } : formData;

      const response = await fetch("/api/admin/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success(editingProject ? "Project updated!" : "Project created!");
        setIsFormOpen(false);
        setEditingProject(null);
        resetForm();
        fetchProjects();
      } else {
        toast.error("Failed to save project");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch("/api/admin/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        toast.success("Project deleted!");
        fetchProjects();
      } else {
        toast.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("An error occurred");
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      role: "",
      timeline: "",
      summary: "",
      description: "",
      highlights: [{ title: "", desc: "" }],
      technologies: [],
      development: false,
    });
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...formData.highlights, { title: "", desc: "" }],
    });
  };

  const removeHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index),
    });
  };

  const updateHighlight = (index: number, field: "title" | "desc", value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index][field] = value;
    setFormData({ ...formData, highlights: newHighlights });
  };

  if (isLoading && !isFormOpen) {
    return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects Management</h1>
        <Button onClick={() => { resetForm(); setIsFormOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto p-4">
          <div className="bg-background rounded-lg p-6 max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <Button variant="ghost" onClick={() => { setIsFormOpen(false); setEditingProject(null); }}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date *</label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    placeholder="e.g., 2024"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Role *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Timeline *</label>
                  <input
                    type="text"
                    required
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>
              </div>

              <div>
                <FileUpload
                  label="Cover Image"
                  type="cover"
                  currentUrl={formData.cover}
                  onUpload={(url) => setFormData({ ...formData, cover: url })}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Or enter URL manually:
                </p>
                <input
                  type="text"
                  value={formData.cover || ""}
                  onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-background mt-1"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Summary *</label>
                <textarea
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-background h-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-background h-32"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Problem</label>
                <textarea
                  value={formData.problem || ""}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-background h-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Solution</label>
                <textarea
                  value={formData.solution || ""}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-background h-20"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Highlights *</label>
                  <Button type="button" size="sm" onClick={addHighlight}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Highlight
                  </Button>
                </div>
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Title"
                      value={highlight.title}
                      onChange={(e) => updateHighlight(index, "title", e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-md bg-background"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={highlight.desc}
                      onChange={(e) => updateHighlight(index, "desc", e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-md bg-background"
                      required
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeHighlight(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Technologies (comma-separated) *</label>
                <input
                  type="text"
                  required
                  value={formData.technologies.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      technologies: e.target.value.split(",").map((t) => t.trim()),
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  placeholder="React, Node.js, TypeScript"
                />
              </div>

              <div>
                <FileUpload
                  label="Upload Screenshot"
                  type="screenshot"
                  onUpload={(url) => {
                    const currentScreenshots = formData.screenshots || [];
                    setFormData({
                      ...formData,
                      screenshots: [...currentScreenshots, url],
                    });
                  }}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Or enter URLs manually (comma-separated):
                </p>
                <input
                  type="text"
                  value={formData.screenshots?.join(", ") || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      screenshots: e.target.value
                        ? e.target.value.split(",").map((s) => s.trim())
                        : undefined,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md bg-background mt-1"
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">GitHub URLs (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.links?.github?.join(", ") || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        links: {
                          ...formData.links,
                          github: e.target.value
                            ? e.target.value.split(",").map((u) => u.trim())
                            : undefined,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Demo URL</label>
                  <input
                    type="text"
                    value={formData.links?.demo || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        links: {
                          ...formData.links,
                          demo: e.target.value || undefined,
                        },
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Group</label>
                  <input
                    type="text"
                    value={formData.group || ""}
                    onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="development"
                    checked={formData.development}
                    onChange={(e) => setFormData({ ...formData, development: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="development" className="text-sm font-medium">
                    In Development
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : editingProject ? "Update" : "Create"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingProject(null);
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
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-secondary/20">
                <td className="px-4 py-3 font-medium">{project.title}</td>
                <td className="px-4 py-3">{project.date}</td>
                <td className="px-4 py-3">{project.role}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      project.development
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-green-500/20 text-green-500"
                    }`}
                  >
                    {project.development ? "In Development" : "Completed"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(project)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => project.id && handleDelete(project.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {projects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No projects found. Add your first project!
          </div>
        )}
      </div>
    </div>
  );
}
