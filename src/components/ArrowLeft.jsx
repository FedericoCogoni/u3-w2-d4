import { Button, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { ArrowReturnLeft } from "react-bootstrap-icons"

const MyNav = () => {
  return (
    <Navbar className="custom-navbar fixed-top bg-transparent">
      <Nav className="w-100">
        <Button className="mt-2" variant="bg-transparent rounded-5">
          <NavLink className="nav-button" to="/">
            <ArrowReturnLeft className="flip display-3" />
          </NavLink>
        </Button>
      </Nav>
    </Navbar>
  )
}

export default MyNav
