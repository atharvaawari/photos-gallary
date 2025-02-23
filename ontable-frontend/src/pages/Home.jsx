import { useGetUserQuery } from "@/store/api/authApi";

function Home() {
  // const user = useSelector((state) => state.authSlice?.userData);

  const { data, isLoading, error  } = useGetUserQuery();
  
  const { userName, email } = data?.data || {};

  if (isLoading) return <h1 className="text-center">Profile is Loading...</h1>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to Home Page</h1>
      {data ? (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-lg">
            <strong>Name:</strong> {userName}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {email}
          </p>
        </div>
      ) : (
        <p className="text-lg text-red-500 mt-4">No user data found.</p>
      )}
    </div>
  );
}

export default Home;
