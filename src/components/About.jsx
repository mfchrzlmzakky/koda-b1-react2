import { useEffect, useState } from "react";

const url = "https://jsonplaceholder.typicode.com/users";

function About() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("loading");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function ambilData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setUsers(data);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    }
    ambilData();
  }, []);

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));

  if (status === "loading") return <p className="text-center mt-7">Memuat...</p>;
  if (status === "error") return <p className="text-center mt-7">Gagal memuat data.</p>;

  return (
    <section className="p-6 text-gray-600">
      <h1 className="text-center mb-5">Daftar Pengguna</h1>

      <input type="text" placeholder="Cari nama..." value={search} onChange={(n) => setSearch(n.target.value)} className="p-1 border rounded-sm mb-5 w-full" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="border rounded-sm p-4">
            <h2 className="font-semibold">{user.name}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
