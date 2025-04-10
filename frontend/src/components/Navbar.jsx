import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const navigation = [
  // { name: "Home", href: "#" },
  { name: "Weekly Tracker", href: "#tracker" },
  { name: "Community", href: "#community" },
  { name: "Tools", href: "#tools" },
  { name: "Blog", href: "#blog" },
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("pregnancyProfileData");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("pregnancyProfileData");
    setIsLoggedIn(false); // Or redirect to home/login page
    navigate("/");
  };
  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <nav
        className="container-width mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="font-display text-2xl font-bold text-primary-600">
                PregaCare
              </span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <FiMenu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:items-center lg:gap-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors"
              >
                {item.name}
              </a>
            ))}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="btn-primary text-sm">
                Logout
              </button>
            ) : (
              <a href="/login" className="btn-primary text-sm">
                Sign In
              </a>
            )}
          </div>
        </div>
      </nav>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="font-display text-2xl font-bold text-primary-600">
                PregaCare
              </span>
            </a>
            <button
              type="button"
              className="rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiX className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 rounded-lg"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="block w-full px-3 py-2.5 text-base font-semibold leading-7 text-white bg-primary-600 rounded-lg text-center"
                  >
                    Logout
                  </button>
                ) : (
                  <a
                    href="/auth"
                    className="block px-3 py-2.5 text-base font-semibold leading-7 text-white bg-primary-600 rounded-lg text-center"
                  >
                    Sign In
                  </a>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default Navbar;
