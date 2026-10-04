import { useEffect, useState } from "react";
import API from "../Services/api";
import { Inbox, Trash2 } from "lucide-react";

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
      <h2 className="flex items-center gap-3 text-2xl font-bold text-maroon-900">
        <Inbox className="h-7 w-7 text-maroon-700" aria-hidden="true" />
        Messages
      </h2>
      <p className="mt-2 text-stone-600">Sent from the Contact Us page.</p>

      {loading ? (
        <p className="mt-8 text-stone-600">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="mt-8 text-stone-600">No messages yet.</p>
      ) : (
        <div className="mt-8 grid gap-4">
          {messages.map((item) => (
            <div
              key={item._id}
              className="animate-fade-up rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200/70 transition hover:shadow-md"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-bold text-maroon-900">{item.name}</h3>
                  <a
                    href={`mailto:${item.email}`}
                    className="text-sm text-maroon-700 hover:underline"
                  >
                    {item.email}
                  </a>
                  <p className="mt-1 text-sm text-stone-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Delete
                </button>
              </div>

              <p className="mt-4 whitespace-pre-line text-stone-700">
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
