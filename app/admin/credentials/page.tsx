"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X } from "lucide-react";

interface Credential {
  id?: number;
  title: string;
  date: string;
  link: string;
  organization: string;
}

export default function CredentialsManagementPage() {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCredential, setEditingCredential] = useState<Credential | null>(null);
  const [formData, setFormData] = useState<Credential>({
    title: "",
    date: "",
    link: "",
    organization: "",
  });

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      const response = await fetch("/api/admin/credentials");
      if (response.ok) {
        const data = await response.json();
        setCredentials(data);
      }
    } catch (error) {
      console.error("Error fetching credentials:", error);
      toast.error("Failed to fetch credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const method = editingCredential ? "PUT" : "POST";
      const body = editingCredential ? { id: editingCredential.id, ...formData } : formData;

      const response = await fetch("/api/admin/credentials", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success(editingCredential ? "Credential updated!" : "Credential created!");
        setIsFormOpen(false);
        setEditingCredential(null);
        resetForm();
        fetchCredentials();
      } else {
        toast.error("Failed to save credential");
      }
    } catch (error) {
      console.error("Error saving credential:", error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this credential?")) return;

    try {
      const response = await fetch("/api/admin/credentials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        toast.success("Credential deleted!");
        fetchCredentials();
      } else {
        toast.error("Failed to delete credential");
      }
    } catch (error) {
      console.error("Error deleting credential:", error);
      toast.error("An error occurred");
    }
  };

  const handleEdit = (credential: Credential) => {
    setEditingCredential(credential);
    setFormData(credential);
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      link: "",
      organization: "",
    });
  };

  if (isLoading && !isFormOpen) {
    return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Credentials Management</h1>
        <Button onClick={() => { resetForm(); setIsFormOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Credential
        </Button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingCredential ? "Edit Credential" : "Add New Credential"}
              </h2>
              <Button variant="ghost" onClick={() => { setIsFormOpen(false); setEditingCredential(null); }}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title/Name *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  placeholder="e.g., AWS Certified Solutions Architect"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    placeholder="e.g., Amazon Web Services"
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
                    placeholder="e.g., 2023"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Certificate Link *</label>
                <input
                  type="url"
                  required
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  placeholder="https://..."
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : editingCredential ? "Update" : "Create"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingCredential(null);
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
              <th className="px-4 py-3 text-left">Organization</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Link</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {credentials.map((credential) => (
              <tr key={credential.id} className="border-t border-secondary/20">
                <td className="px-4 py-3 font-medium">{credential.title}</td>
                <td className="px-4 py-3">{credential.organization}</td>
                <td className="px-4 py-3">{credential.date}</td>
                <td className="px-4 py-3">
                  <a
                    href={credential.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View
                  </a>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(credential)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => credential.id && handleDelete(credential.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {credentials.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No credentials found. Add your first credential!
          </div>
        )}
      </div>
    </div>
  );
}
