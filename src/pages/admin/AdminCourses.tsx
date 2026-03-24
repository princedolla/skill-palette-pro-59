import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const AdminCourses = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: courses, isLoading } = useQuery({
    queryKey: ["admin-courses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const emptyCourse = { title: "", description: "", cover_image: "", category: "General", difficulty: "Beginner", published: false };

  const saveMutation = useMutation({
    mutationFn: async (course: any) => {
      if (course.id) {
        const { error } = await supabase.from("courses").update(course).eq("id", course.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("courses").insert(course);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      toast.success("Course saved!");
      setEditing(null);
      setShowForm(false);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("courses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      toast.success("Course deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const openForm = (course?: any) => {
    setEditing(course || { ...emptyCourse });
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const { id, created_at, updated_at, ...rest } = editing;
    saveMutation.mutate(id ? { id, ...rest } : rest);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Courses</h2>
        <button onClick={() => openForm()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:shadow-[0_0_20px_hsl(190_100%_50%/0.3)] transition-all">
          <Plus size={16} /> New Course
        </button>
      </div>

      {showForm && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <form onSubmit={handleSave} className="w-full max-w-lg bg-card border border-border rounded-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{editing.id ? "Edit" : "New"} Course</h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            {[
              { key: "title", label: "Title", required: true },
              { key: "description", label: "Description", textarea: true },
              { key: "cover_image", label: "Cover Image URL" },
              { key: "category", label: "Category" },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-xs font-mono text-muted-foreground mb-1 block">{field.label}</label>
                {field.textarea ? (
                  <textarea value={editing[field.key] || ""} onChange={(e) => setEditing({ ...editing, [field.key]: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
                ) : (
                  <input type="text" value={editing[field.key] || ""} onChange={(e) => setEditing({ ...editing, [field.key]: e.target.value })} required={field.required} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors" />
                )}
              </div>
            ))}
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1 block">Difficulty</label>
              <select value={editing.difficulty} onChange={(e) => setEditing({ ...editing, difficulty: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="accent-primary" /> Published
            </label>
            <button type="submit" disabled={saveMutation.isPending} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-50">
              {saveMutation.isPending ? "Saving..." : "Save Course"}
            </button>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="text-muted-foreground font-mono text-sm animate-pulse">Loading...</div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 text-muted-foreground font-mono text-xs">Title</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-mono text-xs hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-mono text-xs hidden md:table-cell">Difficulty</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-mono text-xs hidden md:table-cell">Status</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-mono text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses?.map((course) => (
                <tr key={course.id} className="border-t border-border hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 text-foreground font-medium">{course.title}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{course.category}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{course.difficulty}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`px-2 py-0.5 rounded text-xs font-mono ${course.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {course.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openForm(course)} className="p-1.5 rounded text-muted-foreground hover:text-primary transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => deleteMutation.mutate(course.id)} className="p-1.5 rounded text-muted-foreground hover:text-destructive transition-colors ml-1"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
              {(!courses || courses.length === 0) && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No courses yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
