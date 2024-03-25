import { Poppins } from "next/font/google";
import "./global.css";
import { Header } from "@/_components";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "QT",
  description: "A simple interface for questions CRUD operation",
};

export default function RootLayout({
  children,
  modal,
  auth,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ToastContainer />
        <Header />
        {modal}
        {auth}
        {children}
        <div id="modal-root" />
      </body>
    </html>
  );
}
