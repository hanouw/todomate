import { Link } from "react-router-dom";
import useCustomMove from "../hooks/useCustomMove";

export default function Header() {
  return (
    <header className="flex flex-col items-center p-4">
      <nav
        className="mx-auto flex items-center justify-between bg-white max-w-4xl w-full"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/">
            <span className="sr-only">TodoMate</span>
            <img
              className="h-3 lg:h-8 w-auto"
              src={process.env.PUBLIC_URL + "/assets/imgs/todoLogo.png"}
              alt="Logo"
            />
          </Link>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 mr-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </nav>
    </header>
  );
}
