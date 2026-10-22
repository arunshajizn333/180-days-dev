import UserContext from "../../utils/UserContext";
import { useContext, useState } from "react";

const Profile = () => {
  const { loggedInUser, setUserName } = useContext(UserContext);
  const [editName, setEditName] = useState(loggedInUser);
  const [saved, setSaved] = useState(false);

  const avatarInitial = loggedInUser
    ? loggedInUser.charAt(0).toUpperCase()
    : "?";

  const handleSave = () => {
    if (editName.trim()) {
      setUserName(editName.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
  };

  return (
    <main className="w-[min(100%-48px,720px)] mx-auto pt-10 pb-24 max-md:w-[min(100%-24px,720px)] max-md:pt-6 max-md:pb-16">
      {/* ───── Hero Header ───── */}
      <section className="relative overflow-hidden bg-white border border-[#eceef2] rounded-3xl shadow-[0_12px_36px_rgba(24,28,36,0.04)]">
        {/* Top accent gradient */}
        <div className="h-28 bg-gradient-to-br from-[#ff5200] via-[#ff7b3a] to-[#ffb088] relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.06%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        </div>

        {/* Avatar overlapping the gradient */}
        <div className="flex flex-col items-center -mt-14 pb-8 px-8">
          <div className="
            relative flex items-center justify-center
            w-28 h-28 rounded-full
            bg-gradient-to-br from-[#ff5200] to-[#ff7b3a]
            text-white text-4xl font-extrabold
            border-4 border-white
            shadow-[0_8px_30px_rgba(255,82,0,0.3)]
          ">
            {avatarInitial}
            {/* Online indicator */}
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-400 border-[3px] border-white"></span>
          </div>

          <h1 className="mt-4 text-2xl font-extrabold text-[#1a1a1a] tracking-[-0.03em]">
            {loggedInUser}
          </h1>
          <p className="mt-1 text-sm text-[#9ca3af] font-medium">
            Foodie Member
          </p>
        </div>
      </section>

      {/* ───── Edit Profile Card ───── */}
      <section className="mt-6 bg-white border border-[#eceef2] rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.02)] p-8 max-md:p-5">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#fff5f0]">
            <svg className="w-5 h-5 text-[#ff5200]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[#1a1a1a] tracking-[-0.02em]">
              Edit Profile
            </h2>
            <p className="text-xs text-[#9ca3af] font-medium">
              Update your display name
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Name Field */}
          <div>
            <label
              htmlFor="profile-name"
              className="block text-xs font-bold text-[#4b515d] uppercase tracking-[0.06em] mb-2"
            >
              Display Name
            </label>
            <input
              id="profile-name"
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your name"
              className="
                w-full px-4 py-3 rounded-xl
                bg-[#f8f8f6] border border-[#eceef2]
                text-[15px] font-semibold text-[#1a1a1a]
                placeholder:text-[#c4c8d0] placeholder:font-medium
                outline-none
                transition-all duration-200
                focus:border-[#ff5200] focus:bg-white
                focus:shadow-[0_0_0_3px_rgba(255,82,0,0.08)]
              "
            />
          </div>

          {/* Live Preview */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#fdfaf7] border border-[#f3ebe1]">
            <div className="
              flex items-center justify-center
              w-8 h-8 rounded-full
              bg-gradient-to-br from-[#ff5200] to-[#ff7b3a]
              text-white text-xs font-bold
              shrink-0
            ">
              {editName.trim() ? editName.trim().charAt(0).toUpperCase() : "?"}
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-[10px] font-medium text-[#9ca3af] uppercase tracking-wide">
                Preview
              </span>
              <span className="text-sm font-bold text-[#1a1a1a] truncate">
                {editName.trim() || "Enter a name..."}
              </span>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={!editName.trim() || editName.trim() === loggedInUser}
            className={`
              w-full py-3.5 rounded-xl
              text-[15px] font-bold tracking-[-0.01em]
              transition-all duration-200 ease-in-out
              cursor-pointer
              ${
                !editName.trim() || editName.trim() === loggedInUser
                  ? "bg-[#f1f3f6] text-[#b0b5bf] cursor-not-allowed"
                  : "bg-gradient-to-r from-[#ff5200] to-[#ff7b3a] text-white shadow-[0_4px_16px_rgba(255,82,0,0.3)] hover:shadow-[0_6px_24px_rgba(255,82,0,0.4)] hover:-translate-y-0.5 active:translate-y-0"
              }
            `}
          >
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </div>
      </section>

      {/* ───── Account Info Card ───── */}
      <section className="mt-6 bg-white border border-[#eceef2] rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.02)] p-8 max-md:p-5">
        <h3 className="text-base font-extrabold text-[#1a1a1a] tracking-[-0.02em] mb-5">
          Account Details
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-[#f3f4f6]">
            <span className="text-sm text-[#727782] font-medium">Email</span>
            <span className="text-sm font-semibold text-[#1a1a1a]">
              {loggedInUser.toLowerCase().replace(/\s+/g, ".")}@foodie.com
            </span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-[#f3f4f6]">
            <span className="text-sm text-[#727782] font-medium">Member Since</span>
            <span className="text-sm font-semibold text-[#1a1a1a]">
              {new Date().toLocaleDateString("en-IN", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-[#727782] font-medium">Account Type</span>
            <span className="
              inline-flex items-center gap-1.5 px-3 py-1 rounded-full
              bg-[#fff5f0] text-[#ff5200] text-xs font-bold
            ">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5200]"></span>
              Foodie Pro
            </span>
          </div>
        </div>
      </section>

      {/* ───── Success Toast ───── */}
      <div
        className={`
          fixed bottom-8 left-1/2 -translate-x-1/2 z-50
          flex items-center gap-2.5 px-5 py-3 rounded-2xl
          bg-[#1a1a1a] text-white text-sm font-semibold
          shadow-[0_12px_40px_rgba(0,0,0,0.2)]
          transition-all duration-300 ease-in-out
          ${saved ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
        `}
      >
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        Profile updated successfully!
      </div>
    </main>
  );
};

export default Profile;