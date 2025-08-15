export default function NotAuthenticated() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
      <p className="mt-4 text-gray-600">YOU ARE UNAUTHORIZED</p>
    </div>
  );
}