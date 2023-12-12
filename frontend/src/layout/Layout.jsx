import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Layout = ({ children }) => {
   return (
      <>
         <Header />
         <main className="container">{children}</main>
         <Footer />
      </>
   );
};

export default Layout;
