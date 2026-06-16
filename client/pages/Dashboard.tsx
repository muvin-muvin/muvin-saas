import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Moon,
  Sun,
  LogOut,
  Lock,
  Video,
  Music,
  Mic2,
  GitMerge,
  Wand2,
  FileText,
  Zap,
  Settings,
} from "lucide-react";

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);
  const [plan, setPlan] = useState<string>("free");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is subscribed
    const isSubscribed = localStorage.getItem("muvin-subscription") === "true";
    if (!isSubscribed) {
      navigate("/");
      return;
    }

    const isDarkMode = localStorage.getItem("muvin-dark-mode") === "true";
    const savedPlan = localStorage.getItem("muvin-plan") || "free";
    setIsDark(isDarkMode);
    setPlan(savedPlan);

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, [navigate]);

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem("muvin-dark-mode", String(newDark));
    if (newDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("muvin-subscription");
    localStorage.removeItem("muvin-plan");
    navigate("/");
  };

  // Check if tool is locked based on plan
  const isToolLocked = (toolPlan: string) => {
    if (plan === "premium") return false;
    if (plan === "pro" && toolPlan !== "premium") return false;
    if (plan === "free" && toolPlan === "free") return false;
    return true;
  };

  const tools = [
    {
      id: "video-editor",
      name: "Video Editor",
      description: "Professional video editing with timeline",
      icon: Video,
      plan: "free",
      comingSoon: false,
    },
    {
      id: "audio-editor",
      name: "Audio Editor",
      description: "Edit and enhance audio tracks",
      icon: Mic2,
      plan: "free",
      comingSoon: false,
    },
    {
      id: "music-editor",
      name: "Music Editor",
      description: "Add and mix background music",
      icon: Music,
      plan: "free",
      comingSoon: false,
    },
    {
      id: "video-merge",
      name: "Video Merge",
      description: "Combine multiple clips seamlessly",
      icon: GitMerge,
      plan: "pro",
      comingSoon: false,
    },
    {
      id: "timeline",
      name: "Timeline Editor",
      description: "Advanced timeline control and effects",
      icon: Zap,
      plan: "pro",
      comingSoon: false,
    },
    {
      id: "ai-subtitle",
      name: "AI Subtitle",
      description: "Auto-generate subtitles with AI",
      icon: FileText,
      plan: "premium",
      comingSoon: true,
    },
    {
      id: "ai-voiceover",
      name: "AI Voiceover",
      description: "Create natural voiceovers instantly",
      icon: Mic2,
      plan: "premium",
      comingSoon: true,
    },
    {
      id: "ai-music",
      name: "AI Music",
      description: "Generate royalty-free music tracks",
      icon: Music,
      plan: "premium",
      comingSoon: true,
    },
    {
      id: "ai-effects",
      name: "AI Effects",
      description: "Apply AI-powered style effects",
      icon: Wand2,
      plan: "premium",
      comingSoon: true,
    },
  ];

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-50 transition-smooth">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-smooth">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Muvin
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-slate-800 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-semibold capitalize">{plan} Plan</span>
              </div>

              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-smooth"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-smooth"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome Section */}
          <div className="mb-12 animate-slide-in-up">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Welcome to Your Studio
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Choose a tool to start creating amazing content
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => {
              const locked = isToolLocked(tool.plan);
              const Icon = tool.icon;

              return (
                <div
                  key={tool.id}
                  className="group relative"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`h-full rounded-2xl p-6 border-2 transition-smooth cursor-pointer transform hover:scale-105 ${
                      locked
                        ? "bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:bg-slate-800/50 border-purple-300/50 dark:border-slate-700 opacity-70"
                        : "bg-gradient-to-br from-purple-50/80 to-blue-50/80 dark:bg-slate-800 border-purple-300/60 dark:border-slate-700 hover:border-purple-500 shadow-lg hover:shadow-purple-500/20"
                    } ${
                      selectedTool === tool.id
                        ? "ring-2 ring-purple-500"
                        : ""
                    }`}
                    onClick={() =>
                      !locked && !tool.comingSoon && setSelectedTool(tool.id)
                    }
                  >
                    {/* Coming Soon Badge */}
                    {tool.comingSoon && (
                      <div className="absolute top-4 right-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-xs font-semibold">
                        Coming Soon
                      </div>
                    )}

                    {/* Lock Badge */}
                    {locked && !tool.comingSoon && (
                      <div className="absolute top-4 right-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Locked
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          locked || tool.comingSoon
                            ? "bg-gray-200 dark:bg-slate-700"
                            : "bg-gradient-to-br from-purple-500 to-blue-500"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            locked || tool.comingSoon
                              ? "text-gray-500"
                              : "text-white"
                          }`}
                        />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-2">{tool.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {tool.description}
                    </p>

                    {locked && !tool.comingSoon && (
                      <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-semibold">
                        Unlock with {tool.plan === "pro" ? "Pro" : "Premium"}
                      </div>
                    )}

                    {tool.comingSoon && (
                      <div className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg text-sm font-semibold">
                        Coming Soon
                      </div>
                    )}

                    {!locked && !tool.comingSoon && (
                      <div className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-semibold">
                        Ready to Use
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tool Details Panel */}
          {selectedTool && (
            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 border border-purple-200 dark:border-slate-700 animate-slide-in-up">
              <button
                onClick={() => setSelectedTool(null)}
                className="mb-4 text-purple-600 dark:text-purple-400 hover:underline text-sm font-semibold"
              >
                ← Back to Tools
              </button>

              {selectedTool === "video-editor" && (
                <div>
                  <h2 className="text-3xl font-bold mb-4">Video Editor</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Professional video editing with our intuitive timeline
                    interface. Trim clips, add transitions, and arrange your
                    content exactly how you want it.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span>Drag-and-drop timeline editor</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span>Trim and reorder clips</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span>Real-time preview</span>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-smooth">
                    Open Video Editor
                  </button>
                </div>
              )}

              {selectedTool === "audio-editor" && (
                <div>
                  <h2 className="text-3xl font-bold mb-4">Audio Editor</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Edit audio tracks with precision. Adjust volume, trim
                    sections, and enhance your audio quality with built-in
                    effects.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span>Volume control and mixing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span>Waveform visualization</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span>Audio effects and filters</span>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-smooth">
                    Open Audio Editor
                  </button>
                </div>
              )}

              {selectedTool === "music-editor" && (
                <div>
                  <h2 className="text-3xl font-bold mb-4">Music Editor</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Add and mix background music to your projects. Choose from
                    our library of royalty-free tracks or upload your own.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span>Royalty-free music library</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span>Audio mixing and blending</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span>BPM and tempo control</span>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-smooth">
                    Open Music Editor
                  </button>
                </div>
              )}

              {selectedTool === "video-merge" && (
                <div>
                  <h2 className="text-3xl font-bold mb-4">Video Merge</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Combine multiple video clips into one seamless video.
                    Perfect for creating compilations or combining takes.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span>Merge unlimited clips</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span>Automatic format detection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span>Custom transitions between clips</span>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-smooth">
                    Open Video Merge
                  </button>
                </div>
              )}

              {selectedTool === "timeline" && (
                <div>
                  <h2 className="text-3xl font-bold mb-4">Timeline Editor</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Advanced timeline control for professional video editing.
                    Layer multiple tracks and apply complex effects.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span>Multi-track editing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span>Keyframe animation support</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span>Professional effects library</span>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-smooth">
                    Open Timeline
                  </button>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 py-12 mt-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                © 2024 Muvin. All rights reserved.
              </p>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-smooth"
              >
                Logout
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
