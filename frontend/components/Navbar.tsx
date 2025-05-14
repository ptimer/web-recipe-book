import Link from "next/link";

const Navbar = () => {
  return (
    <header className="p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 text-2xl font-semibold">
          <h1>The Recipe Book</h1>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;