import NavBar from "../components/navBar";

const Layout = ({ children }) => {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    );
}

export default Layout;