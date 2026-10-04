import { useEffect, useState } from "react";
import API from "../Services/api";

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    API.get("/messages")
      .then(({ data }) => setMessages(data))
      .catch((error) => console.log("Error fetching messages:", error))
      .finally(() => setLoading(false));
  }, [reloadKey]);

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this message?");
    if (!ok) return;

    try {
      await API.delete(`/messages/${id}`);
      setReloadKey((key) => key + 1);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-900">Messages</h2>
      <p className="mt-2 text-gray-600">Sent from the Contact Us page.</p>

      {loading ? (
        <p className="mt-8 text-gray-600">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="mt-8 text-gray-600">No messages yet.</p>
      ) : (
        <div className="mt-8 grid gap-4">
          {messages.map((item) => (
            <div key={item._id} className="rounded-xl bg-white p-4 shadow">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-bold text-blue-900">{item.name}</h3>
                  <a
                    href={`mailto:${item.email}`}
                    className="text-sm text-blue-700 hover:underline"
                  >
                    {item.email}
                  </a>
                  <p className="mt-1 text-sm text-gray-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="rounded bg-red-500 px-4 py-2 text-white"
                >
                  Delete
                </button>
              </div>

              <p className="mt-4 whitespace-pre-line text-gray-700">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageMessages;
