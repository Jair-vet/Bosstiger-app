import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-screen flex items-center justify-center text-center p-8">
        <div>
            <h1 className="text-coverColor text-5xl font-extrabold uppercase font-sans"><span className="text-skyblueColor text-7xl">{error.status}</span>  Error</h1>
            <p className="text-coverColor text-2xl mt-6">Oops! Sorry, an unexpected error has occurred.</p>
            <p className="text-coverColor text-2xl">
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    </div>
  );
}