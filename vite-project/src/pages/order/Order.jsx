import { useContext } from "react"
import Layout from "../../components/layout/Layout"
import myContext from "../../context/data/MyContext"

const Order = () => {
  const context = useContext(myContext);
  return (
    <Layout>
      Order
    </Layout>
  )
}

export default Order
