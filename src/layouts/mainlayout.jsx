import Navbar from "../components/navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#fff5fa] via-[#f8f4ff] to-[#f1f7ff]">

      {/* Sidebar */}
      <aside className="shrink-0">
        <Sidebar />
      </aside>

      {/* Main Section */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Navbar */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-pink-100 shadow-sm">
          <Navbar />
        </header>

        {/* Page Content */}
        <main className="flex-1 w-full px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
          <div className="w-full max-w-[1500px] mx-auto">
            <div className="bg-white/75 backdrop-blur-sm rounded-[28px] border border-white shadow-[0_8px_35px_rgba(219,160,190,0.10)] p-5 sm:p-7 lg:p-9 min-h-[calc(100vh-150px)]">
              {children}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-4 text-center text-xs text-gray-400">
          Made with 💗 for your safety | She Shield
        </footer>

      </div>
    </div>
  );
}

export default MainLayout;