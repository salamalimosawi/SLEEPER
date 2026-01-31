import "./globals.css";
import AuthProvider from "../components/AuthProvider";

export const metadata = {
  title: "Code Sleep",
  description: "A CBT-I based sleep improvement app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}