import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl px-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/"className="text-white font-bold text-lg">
              Sana Shop
            </Link>
          </div>
          <div className="flex">
            <Link href="/products" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Products
            </Link>
            <Link href="/cart" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
