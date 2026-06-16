import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Check, Play, Zap, Star } from "lucide-react";

export default function Index() {
  const [isDark, setIsDark] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Check subscription status on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("muvin-dark-mode");
    // If no save exists, we force Light Mode (false)
    const isDarkMode = savedTheme === "true";
    
    setIsDark(isDarkMode);
    
    // Force the HTML class to match the state exactly
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const newDark = !prev;
      localStorage.setItem("muvin-dark-mode", String(newDark));
      
      if (newDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newDark;
    });
  };

  const handleSubscribe = (plan: string) => {
    localStorage.setItem("muvin-subscription", "true");
    localStorage.setItem("muvin-plan", plan);
    setIsSubscribed(true);
    // Redirect to dashboard after a brief delay
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 500);
  };

  const pricing = [
    {
      name: "Free",
      price: "$0",
      period: "Forever",
      description: "Perfect to get started",
      features: [
        "Video Editor (Basic)",
        "Audio Editor",
        "Music Editor (Limited)",
        "Up to 5 projects",
        "720p export",
      ],
      cta: "Start Free",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "For content creators",
      features: [
        "All Free features",
        "Advanced Video Editor",
        "Video Merge Tool",
        "Unlimited projects",
        "1080p export",
        "No watermark",
        "Priority support",
      ],
      cta: "Subscribe",
      highlighted: true,
    },
    {
      name: "Premium",
      price: "$49",
      period: "/month",
      description: "For professionals",
      features: [
        "All Pro features",
        "AI Subtitle Generator",
        "AI Voiceover",
        "AI Music Generator",
        "AI Style Effects",
        "4K export",
        "Batch processing",
        "Dedicated support",
      ],
      cta: "Subscribe",
      highlighted: false,
    },
  ];

return (
    <div className={isDark ? "dark" : ""}>
    {/* bg-white for normal background, #030712 for the premium dark mood */}
    <div className="min-h-screen bg-white dark:bg-[#030712] text-slate-900 dark:text-slate-50 transition-colors duration-500">
    {/* Header */}
    {/* Updated to blend with white and navy backgrounds */}
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Muvin
              </span>
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-smooth"
            >
            {/* SWAPPED LOGIC: If background is Dark, show Moon. If White, show Sun. */}
            {isDark ? (
              <Moon className="w-5 h-5 text-blue-400" /> 
              ) : (
               <Sun className="w-5 h-5 text-yellow-500" />
              )}
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32 min-h-[calc(100vh-80px)] flex items-center">
          <div className="max-w-7xl mx-auto">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-purple-600/20 dark:bg-purple-600/30 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-600/20 dark:bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="text-center animate-slide-in-up">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
                All-in-One{" "}
                <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                  Short Video Creation
                </span>
                <br />
                Platform
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                Everything you need to create stunning videos, podcasts, and
                audio content. One subscription unlocks all professional tools.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={() => handleSubscribe("free")}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-smooth transform hover:scale-105"
                >
                  Start Free Trial
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("pricing")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-4 border-2 border-gray-300 dark:border-slate-700 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-slate-900 transition-smooth"
                >
                  View Pricing
                </button>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  { icon: Zap, text: "Lightning Fast" },
                  { icon: Star, text: "Professional Quality" },
                  { icon: Play, text: "Easy to Use" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 rounded-full text-sm font-medium"
                  >
                    <item.icon className="w-4 h-4 text-purple-600" />
                    {item.text}
                  </div>
                ))}
              </div>
              {/* Floating Video Editor Mockup - ADD THIS BLOCK */}
              <div className="mt-16 sm:mt-24 mx-auto max-w-5xl relative animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                {/* Extra glow specifically for the mockup window */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-[80px] rounded-full translate-y-12"></div>
                
                {/* The Editor Window Frame */}
                <div className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-[#454545] backdrop-blur-2xl shadow-2xl overflow-hidden">
                  
                  {/* Window Controls (Mac Style) */}
                  <div className="h-10 border-b border-gray-200 dark:border-slate-800/50 flex items-center px-4 gap-2 bg-gray-50/30 dark:bg-slate-950/30">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-4 text-[10px] text-gray-400 font-mono tracking-widest uppercase">muvin_vlog_edit.mp4</div>
                  </div>
                  
                  {/* Editor Interface Content */}
                  <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Video Preview Panel */}
                    <div className="md:col-span-1 aspect-video bg-black/10 dark:bg-black/60 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-200/50 dark:border-slate-800">
                      <Play className="w-10 h-10 text-purple-500/50" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                        00:04:12:15
                      </div>
                    </div>
                    
                    {/* Multitrack Timeline Panel */}
                    <div className="md:col-span-2 space-y-3 relative py-1">
                      {/* Interactive Red Playhead */}
                      <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-red-500 z-10 shadow-[0_0_10px_rgba(239,68,68,0.6)]">
                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full absolute -top-1 -left-[4px]"></div>
                      </div>
                      
                      {/* Video Track */}
                      <div className="h-10 bg-gray-100/50 dark:bg-slate-800/30 rounded flex items-center px-2 gap-2 border border-gray-200/50 dark:border-slate-700/30">
                        <div className="h-7 w-2/5 bg-purple-600/60 rounded border border-purple-400/50 flex items-center px-2 text-[9px] text-white truncate shadow-sm">Intro_Clip.mp4</div>
                        <div className="h-7 w-1/4 bg-blue-600/60 rounded border border-blue-400/50 flex items-center px-2 text-[9px] text-white truncate shadow-sm">B-Roll.mp4</div>
                      </div>
                      
                      {/* Audio Track with Waves */}
                      <div className="h-10 bg-gray-100/50 dark:bg-slate-800/30 rounded flex items-center px-2 gap-1 border border-gray-200/50 dark:border-slate-700/30 overflow-hidden">
                        {[...Array(50)].map((_, i) => (
                          <div key={i} className="w-0.5 bg-emerald-500/40 rounded-full" style={{ height: `${Math.random() * 70 + 10}%` }}></div>
                        ))}
                      </div>

                      {/* AI Subtitle Track */}
                      <div className="h-7 bg-gray-100/50 dark:bg-slate-800/30 rounded flex items-center px-2 gap-2 border border-gray-200/50 dark:border-slate-700/30">
                        <div className="h-4 w-1/5 bg-amber-500/40 rounded border border-amber-400/30 ml-8 flex items-center justify-center text-[8px] text-white font-bold">AI CAPTION</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-32 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-slide-in-up">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Choose the perfect plan for your content creation needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricing.map((plan, index) => (
                <div
                key={index}
                className={`relative rounded-2xl transition-smooth transform hover:scale-105 ${
                plan.highlighted
                ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-2xl shadow-purple-500/30 ring-2 ring-purple-400 dark:ring-purple-500"
                : "bg-slate-50/50 dark:bg-[#454545] border border-slate-200 dark:border-white/10 shadow-sm"
                }`}
                >
                  {plan.highlighted && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p
                      className={
                        plan.highlighted
                          ? "text-white/90"
                          : "text-gray-600 dark:text-gray-400"
                      }
                    >
                      {plan.description}
                    </p>

                    <div className="my-6">
                      <span className="text-5xl font-bold">{plan.price}</span>
                      <span
                        className={
                          plan.highlighted
                            ? "text-white/80 ml-2"
                            : "text-gray-600 dark:text-gray-400 ml-2"
                        }
                      >
                        {plan.period}
                      </span>
                    </div>

                    <button
                      onClick={() => handleSubscribe(plan.name.toLowerCase())}
                      className={`w-full py-3 rounded-lg font-semibold transition-smooth mb-8 ${
                        plan.highlighted
                          ? "bg-white text-purple-600 hover:bg-gray-50"
                          : "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700"
                      }`}
                    >
                      {plan.cta}
                    </button>

                    <div className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check
                            className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                              plan.highlighted
                                ? "text-white"
                                : "text-purple-600"
                            }`}
                          />
                          <span
                            className={
                              plan.highlighted
                                ? "text-white/95"
                                : "text-gray-700 dark:text-gray-300"
                            }
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50">
          {/* Newsletter & Feedback Section */}
          <div className="px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Newsletter */}
                <div>
                  <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Subscribe to get the latest updates about new features and tools
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    <button className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-smooth">
                      Subscribe
                    </button>
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <h3 className="text-lg font-bold mb-2">Share Your Feedback</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Help us improve Muvin by sharing your thoughts and suggestions
                  </p>
                  <button className="px-6 py-2 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-lg font-semibold hover:bg-purple-50 dark:hover:bg-slate-800 transition-smooth">
                    Send Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-5 gap-8 mb-12">
                {/* Brand */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold">Muvin</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Professional video and media creation made simple.
                  </p>
                </div>

                {/* Product */}
                <div>
                  <h4 className="font-semibold mb-4">Product</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>
                      <button className="hover:text-purple-600 transition-smooth">
                        Features
                      </button>
                    </li>
                    <li>
                      <button className="hover:text-purple-600 transition-smooth">
                        Pricing
                      </button>
                    </li>
                    <li>
                      <button className="hover:text-purple-600 transition-smooth">
                        Security
                      </button>
                    </li>
                    <li>
                      <button className="hover:text-purple-600 transition-smooth">
                        Roadmap
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h4 className="font-semibold mb-4">Company</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>
                      <button className="hover:text-purple-600 transition-smooth">
                        About
                      </button>
                    </li>
                    <li>
                      <button className="hover:text-purple-600 transition-smooth">
                        Blog
                      </button>
                    </li>
                    <li>
                      <button className="hover:text-purple-600 transition-smooth">
                        Careers
                      </button>
                    </li>
                    <li>
                      <button className="hover:text-purple-600 transition-smooth">
                        Press
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Support */}
                <div>
                  <h4 className="font-semibold mb-4">Support</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>
                      <button className="hover:text-purple-600 transition-smooth">
                        Help Center
                      </button>
                    </li>
                    <li>
                      <button className="hover:text-purple-600 transition-smooth">
                        Documentation
                      </button>
                    </li>
                    <li>
                      <button className="hover:text-purple-600 transition-smooth">
                        Community
                      </button>
                    </li>
                    <li>
                      <button className="hover:text-purple-600 transition-smooth">
                        Status
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h4 className="font-semibold mb-4">Contact</h4>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a
                        href="mailto:support@muvin.com"
                        className="text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-smooth"
                      >
                        📧 support@muvin.com
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+1-800-MUVIN-00"
                        className="text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-smooth"
                      >
                        📞 +1 (800) 688-4600
                      </a>
                    </li>
                    <li className="text-gray-600 dark:text-gray-400">
                      💬 Live Chat Available 24/7
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="border-t border-gray-200 dark:border-slate-700 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    © 2024 Muvin. All rights reserved.
                  </p>
                  <div className="flex gap-6 text-sm">
                    <button className="text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-smooth">
                      Privacy Policy
                    </button>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-smooth">
                      Terms of Service
                    </button>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-smooth">
                      Cookie Policy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
