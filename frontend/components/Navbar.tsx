import Link from "next/link";

const Navbar = () => {
  return (
    <header className="navbar">
      <nav>
        <Link href="/">
          <h1>The Recipe Book</h1>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;