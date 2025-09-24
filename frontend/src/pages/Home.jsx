import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Filter from "../components/Filter";
import CompanyTable from "../components/CompanyTable";
import AddCompanyModal from "../components/AddCompanyModal";

const Home = () => {
  const [filters, setFilters] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCompanyAdded = () => {
    setRefreshKey((prev) => prev + 1); // Refresh table
  };

  const handleDelete = () => {
    setRefreshKey((prev) => prev + 1); // Refresh table
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">
          Company Directory
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          <FiPlus className="mr-2 text-lg" />
          Add Company
        </button>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <Filter setFilters={setFilters} />
      </div>

      {/* Company Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <CompanyTable
          key={refreshKey}
          filters={filters}
          onDelete={handleDelete}
        />
      </div>

      {/* Add Company Modal */}
      <AddCompanyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCompanyAdded={handleCompanyAdded}
      />
    </div>
  );
};

export default Home;
