import "./globals.css";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import MenuProvider from "./context/MenuContext";
import AuthProvider from "./context/AuthContext";
import ClientLayout from "./ClientLayout"; // Import the client layout

export const metadata = {
  title: "StayPoint",
  description: "An app for students to help them find the rooms, PGs, or flats",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body style={{ position: "relative" }}>
        <AuthProvider>
          <MenuProvider>
            <Navbar />
            <Sidebar />
            <ClientLayout>{children}</ClientLayout>
          </MenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
