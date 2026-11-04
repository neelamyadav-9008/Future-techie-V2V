import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserShield,
  FaPhoneAlt,
  FaHeart,
  FaPlusCircle,
  FaTrash,
  FaAddressBook,
  FaShieldAlt,
} from "react-icons/fa";

function Profile() {
  const [contacts, setContacts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("emergencyContacts") || "[]");
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
    localStorage.setItem("emergencyContacts", JSON.stringify(updatedContacts));

    setName("");
    setPhone("");
    setRelationship("");
  }

  function removeContact(id) {
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== id
    );

    setContacts(updatedContacts);
    localStorage.setItem("emergencyContacts", JSON.stringify(updatedContacts));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-5 py-8 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-pink-700 hover:text-purple-700 font-semibold transition mb-8"
        >
          <FaArrowLeft />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-pink-100 flex items-center justify-center shadow-sm">
            <FaUserShield className="text-4xl text-pink-600" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Emergency Contacts
          </h1>

          <p className="text-gray-600 max-w-xl mx-auto leading-7">
            Your safety circle matters. Add trusted people who can support
            you whenever you need help.
          </p>
        </div>

        {/* Information Card */}
        <div className="bg-white/80 border border-pink-100 rounded-3xl p-6 sm:p-8 mb-10 shadow-sm flex items-start gap-4">
          <div className="bg-purple-100 p-3 rounded-2xl shrink-0">
            <FaHeart className="text-purple-600 text-xl" />
          </div>
          <div>
            <h2 className="font-bold text-gray-800 text-lg mb-2">
              Your trusted safety circle
            </h2>
            <p className="text-gray-600 leading-7">
              Keep your family members and close friends saved here so
              their contact details are easy to access.
            </p>
          </div>
        </div>

        {/* Add Contact Form */}
        <div className="bg-white rounded-3xl shadow-md border border-pink-100 p-6 sm:p-10 mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-pink-100 p-4 rounded-2xl">
              <FaPlusCircle className="text-pink-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Add a Trusted Contact
              </h2>
              <p className="text-gray-500 mt-1">
                Enter the details of someone you trust.
              </p>
            </div>
          </div>

          <form onSubmit={addContact} className="space-y-7">
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Contact Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                required
                className="w-full border border-pink-200 bg-pink-50/40 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                required
                pattern="[0-9+() -]{7,20}"
                className="w-full border border-pink-200 bg-pink-50/40 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Relationship
              </label>
              <input
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="e.g. Mother, Father, Friend"
                className="w-full border border-pink-200 bg-pink-50/40 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-4 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-3"
            >
              <FaPlusCircle />
              Add Contact
            </button>
          </form>
        </div>

        {/* Contact List */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Your Trusted Contacts
              </h2>
              <p className="text-gray-500 mt-2">
                People who are part of your safety circle.
              </p>
            </div>

            <span className="bg-pink-100 text-pink-700 px-5 py-2 rounded-full font-semibold text-sm w-fit">
              {contacts.length} Saved
            </span>
          </div>

          {contacts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-12 text-center">
              <FaAddressBook className="text-5xl text-pink-300 mx-auto mb-5" />
              <h3 className="text-xl font-bold text-gray-700 mb-3">
                No contacts added yet
              </h3>
              <p className="text-gray-500 leading-7">
                Add your first trusted contact using the form above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white rounded-3xl border border-pink-100 shadow-sm hover:shadow-md transition p-7"
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center shrink-0">
                        <FaUserShield className="text-purple-600 text-xl" />
                      </div>

                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
                          {contact.name}
                        </h3>
                        <p className="text-sm text-purple-600 mt-1">
                          {contact.relationship || "Trusted Contact"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-pink-50 rounded-xl p-4 mb-6 flex items-center gap-3">
                    <FaPhoneAlt className="text-pink-600" />
                    <span className="text-gray-700 font-medium break-all">
                      {contact.phone}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex-1 bg-pink-500 hover:bg-pink-600 text-white text-center font-semibold py-3 rounded-xl transition"
                    >
                      Call Contact
                    </a>

                    <button
                      type="button"
                      onClick={() => removeContact(contact.id)}
                      className="px-5 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition"
                      aria-label={`Remove ${contact.name}`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Safety Note */}
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 flex items-start gap-4">
          <FaShieldAlt className="text-purple-600 text-2xl shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-800 mb-2">
              A little safety reminder
            </h3>
            <p className="text-gray-600 text-sm leading-7">
              Make sure the phone numbers are correct and your trusted
              contacts know they have been added to your safety circle.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;