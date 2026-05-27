# react-api-cache-kit

A lightweight and production-ready React API caching library with retry handling, localStorage persistence, automatic refetching, and TypeScript support.

Built for modern frontend applications to reduce unnecessary API calls, improve performance, and simplify remote data management using an easy-to-use React hook API.

---

# Features

✅ Lightweight and fast
✅ React Hooks based API
✅ In-memory caching
✅ LocalStorage persistence
✅ Retry failed API requests
✅ Automatic refetching
✅ Configurable cache time & stale time
✅ TypeScript support
✅ Auto cache cleanup
✅ Minimal setup required
✅ Developer-friendly API
✅ Optimized for React applications

---

# Why Use react-api-cache-kit?

Modern React applications often make repeated API requests that slow down performance and create unnecessary backend load.

`react-api-cache-kit` helps solve these common frontend problems by providing:

* Faster data fetching using cache
* Reduced duplicate API calls
* Better user experience
* Offline-friendly persistence
* Automatic retry handling
* Cleaner frontend architecture
* Lightweight alternative to larger libraries

Unlike heavy state-management or query libraries, this package focuses on simplicity, performance, and easy integration.

Perfect for:

* Enterprise dashboards
* Admin panels
* Financial applications
* SaaS platforms
* Analytics systems
* Data-heavy frontend applications

---

# Installation

```bash
npm install react-api-cache-kit
```

or

```bash
yarn add react-api-cache-kit
```

---

# Quick Start

```tsx
import { useApiCache } from 'react-api-cache-kit';

function Users() {
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
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error loading users</h2>;
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

export default Users;
```

---

# API Documentation

## useApiCache

### Syntax

```tsx
useApiCache(
  key,
  fetcher,
  options
)
```

---

## Parameters

| Parameter | Type     | Description                       |
| --------- | -------- | --------------------------------- |
| key       | string   | Unique cache key                  |
| fetcher   | function | Async function returning API data |
| options   | object   | Optional configuration            |

---

## Options

| Option      | Type    | Default   | Description                   |
| ----------- | ------- | --------- | ----------------------------- |
| enabled     | boolean | true      | Enable or disable fetching    |
| retry       | number  | 3         | Retry failed requests         |
| cacheTime   | number  | 300000    | Cache cleanup time            |
| staleTime   | number  | 30000     | Data freshness duration       |
| persist     | boolean | false     | Persist cache in localStorage |
| initialData | any     | undefined | Initial default data          |

---

## Return Values

| Property | Description             |
| -------- | ----------------------- |
| data     | API response data       |
| loading  | Loading state           |
| error    | Error object            |
| refetch  | Manual refetch function |

---

# Advanced Example

```tsx
const { data, loading } = useApiCache(
  'products',
  async () => {
    const response = await fetch('/api/products');
    return response.json();
  },
  {
    retry: 5,
    persist: true,
    staleTime: 60000,
    cacheTime: 300000,
  }
);
```

---

# Package Structure

```bash
react-api-cache-kit/
│
├── cache/
├── hooks/
├── utils/
├── types/
└── index.ts
```

---

# Upcoming Features

* Request deduplication
* Suspense support
* SSR support
* Infinite queries
* Mutation support
* Devtools
* Optimistic updates
* WebSocket synchronization

---

# Screenshots

Coming soon.

Planned screenshots:

* API caching demo
* Performance comparison
* React DevTools integration
* Cache persistence examples

---

# Performance Goals

The package is optimized for:

* Small bundle size
* Fast cache retrieval
* Minimal re-renders
* Easy scalability
* Enterprise frontend performance

---

# Tech Stack

* React
* TypeScript
* tsup
* Vitest

---

# Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit pull requests.

---

# License

MIT

---

# Keywords

React Cache, React Query Alternative, React Hooks, API Cache, Frontend Optimization, React Performance, TypeScript React Library
