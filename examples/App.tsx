import { useApiCache } from '../src';

function App() {
  const { data, loading, error, refetch } = useApiCache(
    'users',
    async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );

      return response.json();
    },
    {
      retry: 2,
      persist: true,
    }
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error loading users</h1>;
  }

  return (
    <div>
      <button onClick={refetch}>Refetch</button>

      {data?.map((user: any) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default App;