import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const AdminBlog = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-blog"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const emptyPost = { title: "", slug: "", content: "", excerpt: "", cover_image: "", published: false };

  const saveMutation = useMutation({
    mutationFn: async (post: any) => {
      if (post.id) {
        const { error } = await supabase.from("blog_posts").update(post).eq("id", post.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert({ ...post, author_id: user?.id });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
      toast.success("Post saved!");
      setEditing(null);
      setShowForm(false);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
      toast.success("Post deleted");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const openForm = (post?: any) => {
    setEditing(post || { ...emptyPost });
    setShowForm(true);
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const { id, created_at, updated_at, author_id, ...rest } = editing;
    if (!rest.slug) rest.slug = generateSlug(rest.title);
    saveMutation.mutate(id ? { id, ...rest } : rest);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Blog Posts</h2>
        <button onClick={() => openForm()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:shadow-[0_0_20px_hsl(190_100%_50%/0.3)] transition-all">
          <Plus size={16} /> New Post
        </button>
      </div>

      {showForm && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <form onSubmit={handleSave} className="w-full max-w-lg bg-card border border-border rounded-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{editing.id ? "Edit" : "New"} Post</h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1 block">Title</label>
              <input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: generateSlug(e.target.value) })} required className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1 block">Slug</label>
              <input type="text" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1 block">Excerpt</label>
              <textarea value={editing.excerpt || ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1 block">Content (Markdown)</label>
              <textarea value={editing.content || ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} rows={8} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm font-mono focus:outline-none focus:border-primary transition-colors resize-none" />
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1 block">Cover Image URL</label>
              <input type="text" value={editing.cover_image || ""} onChange={(e) => setEditing({ ...editing, cover_image: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="accent-primary" /> Published
            </label>
            <button type="submit" disabled={saveMutation.isPending} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-50">
              {saveMutation.isPending ? "Saving..." : "Save Post"}
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
                <th className="text-left px-4 py-3 text-muted-foreground font-mono text-xs hidden md:table-cell">Slug</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-mono text-xs hidden md:table-cell">Status</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-mono text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((post) => (
                <tr key={post.id} className="border-t border-border hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 text-foreground font-medium">{post.title}</td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs hidden md:table-cell">{post.slug}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`px-2 py-0.5 rounded text-xs font-mono ${post.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openForm(post)} className="p-1.5 rounded text-muted-foreground hover:text-primary transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => deleteMutation.mutate(post.id)} className="p-1.5 rounded text-muted-foreground hover:text-destructive transition-colors ml-1"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
              {(!posts || posts.length === 0) && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No blog posts yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
