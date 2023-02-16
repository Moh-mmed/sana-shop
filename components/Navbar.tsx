import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Navbar: React.FC = () => {

  const cart = useSelector((state:any) => state.cart);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a:any, c:any) => a + c.quantity, 0));
  }, [cart.cartItems]);


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
            <Link href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                login
            </Link>
            <Link href="/cart" className="relative text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Cart
                {cartItemsCount > 0 && (
                  <span className="absolute top-[-2px] right-[-2px] flex items-center justify-center ml-1 bg-red-600 w-4 h-4 rounded-full text-[10px] leading-4 font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
            </Link>
          </div>
        </div>
      </div>
    </nav>

    
  );
};

export default Navbar;
