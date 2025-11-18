"use client";

import { ExternalLink, Flag, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FeatureFlagsPage() {
  const flags = [
    { key: "enableprojectratings", name: "Project Ratings", description: "Allow users to rate projects" },
    { key: "enablecontactform", name: "Contact Form", description: "Enable the contact form" },
    { key: "enableprojects", name: "Projects Section", description: "Show projects section on homepage" },
    { key: "enableexperience", name: "Experience Section", description: "Show experience section" },
    { key: "enablethemeswitcher", name: "Theme Switcher", description: "Enable dark/light theme switcher" },
    { key: "enablemousefollower", name: "Mouse Follower", description: "Enable custom mouse follower effect" },
    { key: "showdevelopmentprojects", name: "Development Projects", description: "Show projects marked as in development" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Feature Flags Management</h1>
        <p className="text-muted-foreground mb-4">
          Feature flags are managed via ConfigCat service
        </p>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex gap-3">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm mb-2">
              This portfolio uses ConfigCat for feature flag management. To modify feature flags,
              please visit the ConfigCat dashboard.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://app.configcat.com", "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open ConfigCat Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-secondary/10 rounded-lg overflow-hidden">
        <div className="bg-secondary/20 px-4 py-3 font-semibold flex items-center gap-2">
          <Flag className="w-5 h-5" />
          Available Feature Flags
        </div>
        <div className="divide-y divide-secondary/20">
          {flags.map((flag) => (
            <div key={flag.key} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold mb-1">{flag.name}</div>
                  <div className="text-sm text-muted-foreground mb-2">{flag.description}</div>
                  <code className="text-xs bg-secondary/30 px-2 py-1 rounded">
                    {flag.key}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-secondary/10 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3">How to Update Feature Flags</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Visit the ConfigCat dashboard using the button above</li>
          <li>Log in with your ConfigCat credentials</li>
          <li>Navigate to your project/environment</li>
          <li>Toggle feature flags on or off as needed</li>
          <li>Changes will be reflected in the application automatically</li>
        </ol>
      </div>
    </div>
  );
}
