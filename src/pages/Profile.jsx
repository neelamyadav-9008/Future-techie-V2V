
import { useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [contacts, setContacts] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("emergencyContacts") || "[]"
      );
    } catch {
      return [];
    }
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("");

  function addContact(e) {
    e.preventDefault();

    const newContact = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      relationship: relationship.trim(),
    };

    const updatedContacts = [...contacts, newContact];

    setContacts(updatedContacts);
    localStorage.setItem(
      "emergencyContacts",
      JSON.stringify(updatedContacts)
    );

    setName("");
    setPhone("");
    setRelationship("");
  }

  function removeContact(id) {
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== id
    );

    setContacts(updatedContacts);
    localStorage.setItem(
      "emergencyContacts",
      JSON.stringify(updatedContacts)
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/dashboard"
          className="text-pink-700 font-semibold"
        >
          ← Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h1 className="text-3xl font-bold text-pink-700 mb-2">
            Emergency Contacts
          </h1>

          <p className="text-gray-600 mb-6">
            Add trusted people you can contact in an emergency.
          </p>

          <form onSubmit={addContact} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">
                Contact Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                required
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                required
                pattern="[0-9+() -]{7,20}"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                Relationship
              </label>
              <input
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="e.g. Mother, Friend"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold p-3 rounded-lg"
            >
              Add Contact
            </button>
          </form>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your Trusted Contacts ({contacts.length})
          </h2>

          {contacts.length === 0 ? (
            <p className="bg-white rounded-xl p-5 text-gray-500">
              No contacts added yet.
            </p>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white rounded-xl shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div>
                    <h3 className="font-bold text-lg">
                      {contact.name}
                    </h3>
                    <p className="text-gray-600">
                      {contact.relationship || "Trusted contact"}
                    </p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-pink-700 underline"
                    >
                      {contact.phone}
                    </a>
                  </div>

                  <button
                    onClick={() => removeContact(contact.id)}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
