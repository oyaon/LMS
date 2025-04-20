import React from 'react';

interface NavbarProps {
  role: 'admin' | 'member' | 'guest';
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ role, onLogout }) => {
  const commonLinks = [
    { name: 'Home', href: '/' },
  ];

  const adminLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Manage Books', href: '/books' },
    { name: 'Reports', href: '/reports' },
  ];

  const memberLinks = [
    { name: 'Search Books', href: '/book-search' },
    { name: 'Borrow Book', href: '/borrow-book' },
    { name: 'Return Book', href: '/return-book' },
    { name: 'My Account', href: '/account' },
  ];

  let links = [...commonLinks];
  if (role === 'admin') {
    links = [...links, ...adminLinks];
  } else if (role === 'member') {
    links = [...links, ...memberLinks];
  }

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex flex-wrap items-center justify-between">
      <ul className="flex flex-wrap space-x-6">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      <button
        onClick={onLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded mt-2 sm:mt-0"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
