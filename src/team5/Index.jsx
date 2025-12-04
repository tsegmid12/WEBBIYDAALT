import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import Login from "../layout/Login"

const Index = () => {
    const { user } = useContext(UserContext)
    return user ? <div>Hello, {user.first_name}!!!</div> : <Login />
}
export default Index
