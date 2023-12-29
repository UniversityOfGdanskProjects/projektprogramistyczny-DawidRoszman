import Link from "next/link";

function NavBar() {
  const isLoggedIn = false; //TODO: Replace this with your actual login state

  return (
    <nav className="bg-neutral p-4 flex justify-between items-center">
      <h1 className="text-white font-bold">Cinema</h1>
      {isLoggedIn ? (
        <div className="text-white">Profile Icon</div> //TODO: Replace this with your actual profile icon
      ) : (
        <div className="flex space-x-4">
          <Link className="text-white" href="/login">
            Login
          </Link>
          <Link className="text-white" href="/register">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
