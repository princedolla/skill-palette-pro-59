import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FolderKanban, FileText, GraduationCap, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const { data: projectCount } = useQuery({
    queryKey: ["admin-project-count"],
    queryFn: async () => {
      const { count } = await supabase.from("projects").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: blogCount } = useQuery({
    queryKey: ["admin-blog-count"],
    queryFn: async () => {
      const { count } = await supabase.from("blog_posts").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: courseCount } = useQuery({
    queryKey: ["admin-course-count"],
    queryFn: async () => {
      const { count } = await supabase.from("courses").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const stats = [
    { label: "Projects", value: projectCount ?? 0, icon: FolderKanban, color: "text-primary" },
    { label: "Blog Posts", value: blogCount ?? 0, icon: FileText, color: "text-secondary" },
    { label: "Courses", value: courseCount ?? 0, icon: GraduationCap, color: "text-primary" },
    { label: "Total Content", value: (projectCount ?? 0) + (blogCount ?? 0) + (courseCount ?? 0), icon: TrendingUp, color: "text-secondary" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Welcome back</h2>
        <p className="text-muted-foreground font-mono text-sm">Here's your content overview</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon size={18} className={stat.color} />
            </div>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-xl bg-card border border-border">
        <h3 className="font-semibold text-foreground mb-2">Quick Start</h3>
        <p className="text-sm text-muted-foreground">
          Use the sidebar to manage your projects, blog posts, and courses.
          All content changes are saved instantly to the database.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
