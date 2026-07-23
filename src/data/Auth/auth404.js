import { Link } from "react-router-dom";

export default function Auth404() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{position:'relative' , textAlign:'center'}}>
        <h1 class="text-9xl md:text-[300px] w-full select-none  text-center font-black  text-gray-400 dark:text-[#373A40]  ">
          404
        </h1>
        <p style={{fontSize:'20px'}}>
          You have discovered a secret place
        </p>
        <p style={{fontSize:'18px'}}>
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </p>
        <div>
          <Link
            to="/"
            class="btn btn-primary"
            style={{marginRight:'50px'}}
          >
            Go back to Previous Page
          </Link>
          <Link
            to="/"
            class="btn btn-primary"
          >
            Go back to Home Page
          </Link>
        </div>
      </div>
    </main>
  );
}
