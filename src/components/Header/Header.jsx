import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const navigate= useNavigate();
  const navItems = [
    { title: "Home", slug: "/", active: true },
    { title: "Login", slug: "/login", active: !authStatus },
    { title: "Signup", slug: "/signup", active: !authStatus },
    { title: "All Posts", slug: "/all-posts", active: authStatus },
    { title: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <Container>
        <nav className="flex justify-between items-center">
          <div>
            <Link to="/" className="focus:outline-none">
              <Logo className="h-10" />
            </Link>
          </div>
          <ul className="flex space-x-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.title}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 rounded text-white hover:bg-blue-500 transition"
                  >
                    {item.title}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 transition" />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
