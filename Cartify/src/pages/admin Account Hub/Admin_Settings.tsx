import { useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "./../../components/Header";
import { FiSave } from "react-icons/fi";

const Admin_Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "Cartify",
    storeEmail: "admin@cartify.com",
    storePhone: "+1 (555) 123-4567",
  });

  const handleGeneralChange = (field: string, value: string) => {
    setGeneralSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving settings:", generalSettings);
    alert("Settings saved successfully!");
  };

  return (
    <div>
      <Header />
      <div className="flex flex-row max-w-screen-2xl mx-auto">
        <Sidebar />
        <div className="mt-24 mx-12 lg:ml-96 flex flex-col z-10 w-3/4 gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">Settings</h1>
            <p className="text-gray-500">Manage your store settings and preferences</p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="btn bg-teal-600 text-white hover:bg-teal-700"
            >
              <FiSave size={18} />
              Save Changes
            </button>
          </div>

          <div className="border rounded-xl p-6 bg-white">
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Store Information</h2>
                <p className="text-gray-500 text-sm">
                  Basic information about your store
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Store Name *</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={generalSettings.storeName}
                      onChange={(e) =>
                        handleGeneralChange("storeName", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Store Email *</span>
                    </label>
                    <input
                      type="email"
                      className="input input-bordered w-full"
                      value={generalSettings.storeEmail}
                      onChange={(e) =>
                        handleGeneralChange("storeEmail", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium">Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    className="input input-bordered w-full"
                    value={generalSettings.storePhone}
                    onChange={(e) =>
                      handleGeneralChange("storePhone", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Settings;
