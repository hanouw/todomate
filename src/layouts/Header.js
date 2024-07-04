export default function Header() {
  return (
    <header className="flex flex-col items-center p-6">
      <div className="max-w-4xl w-full">
        <nav
          className="mx-auto flex items-center justify-between bg-white max-w-4xl w-full"
          aria-label="Global"
        >
          <div className="flex items-center gap-2">
            <div className="text-xl font-semibold">Username</div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </nav>
      </div>
    </header>
  );
}
