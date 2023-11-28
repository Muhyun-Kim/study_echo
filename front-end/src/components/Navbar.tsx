const Navbar = () => {
  return (
    <nav>
      <ul className="flex my-4">
        <li className="ml-4">
          <a href="/">Home</a>
        </li>
        <li className="ml-4">
          <a href="/login">Login</a>
        </li>
        <li className="ml-4">
          <a href="/signin">Sign In</a>
        </li>
        <li className="ml-4">
          <a href="/memos/upload">Upload</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
