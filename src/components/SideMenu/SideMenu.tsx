const SideMenu = () => {
  return (
    <nav className="w-80 h-full bg-teal-100 z-[100] fixed top-0 right-0">
      <ul>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </li>
      </ul>
    </nav>
  );
};

export default SideMenu;
