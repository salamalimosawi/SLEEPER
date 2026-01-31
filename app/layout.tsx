import "./globals.css";

export const metadata = {
  title: "Code Sleep",
  description: "Sleep tracking and CBT-I app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="p-4 border-b flex gap-6 text-sm">
          <a href="/" className="font-bold">🌙 Code Sleep</a>
          <a href="/dashboard">🔥 Dashboard</a>
          <a href="/sleep-diary">😴 Diary</a>
          <a href="/relaxation">🧘 Relax</a>
        </nav>
        {children}
      </body>
    </html>
  );
}