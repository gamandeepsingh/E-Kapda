import Footer from "../footer/Footer"
import Navbar from "../navbar/Navbar"

const Layout = ({children}) => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6">
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout
