"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FolderKanban, 
  Wrench, 
  Briefcase, 
  Award, 
  MessageSquare, 
  Flag 
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/auth/session");
        const data = await response.json();

        if (!data.authenticated) {
          router.push("/admin/login");
        } else {
          setUsername(data.username);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const sections = [
    {
      title: "Projects",
      description: "Manage your portfolio projects",
      icon: FolderKanban,
      href: "/admin/projects",
      color: "text-blue-500",
    },
    {
      title: "Skills",
      description: "Add and update your skills",
      icon: Wrench,
      href: "/admin/skills",
      color: "text-green-500",
    },
    {
      title: "Experience",
      description: "Manage your work experience",
      icon: Briefcase,
      href: "/admin/experience",
      color: "text-purple-500",
    },
    {
      title: "Credentials",
      description: "Add your certifications",
      icon: Award,
      href: "/admin/credentials",
      color: "text-yellow-500",
    },
    {
      title: "Messages",
      description: "View portfolio form responses",
      icon: MessageSquare,
      href: "/admin/messages",
      color: "text-pink-500",
    },
    {
      title: "Feature Flags",
      description: "Toggle application features",
      icon: Flag,
      href: "/admin/feature-flags",
      color: "text-orange-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {username}!</h1>
        <p className="text-muted-foreground">
          Manage your portfolio content from here
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="block p-6 bg-secondary/10 rounded-lg border hover:border-primary transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-secondary/20 ${section.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">{section.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
