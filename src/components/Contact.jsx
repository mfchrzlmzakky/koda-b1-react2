import { useEffect, useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    gender: "",
    age: "",
    messageType: [],
    message: "",
  });
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem("contactMessages");
      const data = saved ? JSON.parse(saved) : [];
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("contactMessages", JSON.stringify(messages));
  }, [messages]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((data) => {
      if (type === "checkbox") {
        const current = data[name];
        return {
          ...data,
          [name]: checked ? [...current, value] : current.filter((item) => item !== value),
        };
      }
      return { ...data, [name]: value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newMessage = {
      id: crypto.randomUUID(),
      email: form.email,
      name: form.name,
      gender: form.gender,
      age: form.age,
      messageType: form.messageType,
      pesan: form.message,
    };
    setMessages((data) => [newMessage, ...data]);

    setForm({
      email: "",
      name: "",
      gender: "",
      age: "",
      messageType: [],
      message: "",
    });
  }

  function handleDelete(id) {
    setMessages((data) => data.filter((item) => item.id !== id));
  }

  const genderLabel = { male: "Laki-Laki", female: "Perempuan" };
  const typeLabel = { criticism: "Kritik", suggestions: "Saran" };

  return (
    <section className="flex flex-col items-center justify-center text-gray-600">
      <h1 className="mt-7 font-medium">Kritik & Saran</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mt-5 w-sm">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={handleChange} value={form.email} className="p-1 border rounded-sm my-1" />
        <label htmlFor="name">Nama</label>
        <input type="text" id="name" name="name" onChange={handleChange} value={form.name} className="p-1 border rounded-sm my-1" />
        <div className="flex flex-col">
          <label>Jenis Kelamin</label>
          <span className="align-middle">
            <label className="mr-3">
              <input type="radio" name="gender" onChange={handleChange} value="male" checked={form.gender === "male"} className="mr-1" />
              Laki-Laki
            </label>
            <label className="align-middle">
              <input type="radio" name="gender" onChange={handleChange} value="female" checked={form.gender === "female"} className="mr-1" />
              Perempuan
            </label>
          </span>
        </div>
        <label htmlFor="age">Umur</label>
        <input type="number" id="age" name="age" onChange={handleChange} value={form.age} className="p-1 border rounded-sm my-1" />
        <div className="flex flex-col">
          <label>Jenis Pesan</label>
          <span className="align-middle">
            <label className="mr-3">
              <input type="checkbox" name="messageType" onChange={handleChange} value="criticism" checked={form.messageType.includes("criticism")} className="mr-1" />
              Kritik
            </label>
            <label className="align-middle">
              <input type="checkbox" name="messageType" onChange={handleChange} value="suggestions" checked={form.messageType.includes("suggestions")} className="mr-1" />
              Saran
            </label>
          </span>
        </div>
        <label htmlFor="message">Pesan</label>
        <textarea name="message" onChange={handleChange} id="message" value={form.message} className="p-1 border rounded-sm my-1"></textarea>
        <button className="border w-50 h-10 self-end rounded-sm bg-gray-600 text-white hover:bg-black" type="submit">
          Kirim
        </button>
      </form>

      <div className="w-sm mt-8 mb-10">
        <h2 className="font-medium mb-3">Pesan Terkirim ({messages.length})</h2>
        {messages.length === 0 ? (
          <p className="text-sm text-gray-400">Belum ada pesan.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {messages.map((item) => (
              <li key={item.id} className="border rounded-sm p-3 text-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500">{item.email}</p>
                  </div>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 text-xs border border-red-300 rounded-sm px-2 py-1">
                    Hapus
                  </button>
                </div>
                <p className="mt-2">
                  {genderLabel[item.gender] || "-"} | {item.age ? `${item.age} tahun` : "-"}
                </p>
                <p className="mt-1">Jenis: {item.messageType.length > 0 ? item.messageType.map((t) => typeLabel[t]).join(", ") : "-"}</p>
                <p className="mt-2 whitespace-pre-wrap">{item.pesan}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Contact;
