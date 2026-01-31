import Sidebar from "../../components/Sidebar";
import AuthGuard from "../../components/AuthGuard";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}