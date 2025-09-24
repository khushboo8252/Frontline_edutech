import React, { useEffect, useState } from "react";
import { fetchCompanies, deleteCompany, updateCompany } from "../services/api";
import EditCompanyModal from "./EditCompanyModal";

const CompanyTable = ({ filters, onDelete }) => {
  const [editingCompany, setEditingCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoading(true);
        const data = await fetchCompanies(filters);
        setCompanies(data);
        setError(null);
      } catch (err) {
        setError("Failed to load companies. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, [filters]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await deleteCompany(id);
        if (onDelete) onDelete();
        // Refresh the companies list after deletion
        const data = await fetchCompanies(filters);
        setCompanies(data);
      } catch (err) {
        console.error("Error deleting company:", err);
      }
    }
  };

  const handleEditClick = (company) => {
    setEditingCompany(company);
  };

  const handleUpdateCompany = async (updatedData) => {
    try {
      const updatedCompany = await updateCompany(editingCompany._id, updatedData);
      setCompanies(companies.map(company => 
        company._id === updatedCompany._id ? updatedCompany : company
      ));
      setEditingCompany(null);
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        No companies found matching your criteria.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Industry
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Size
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Founded
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {companies.map((company) => (
            <tr key={company._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{company.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {company.industry}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {company.location || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {company.size ? company.size.toLocaleString() : '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {company.founded || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleDelete(company._id)}
                  className="text-red-600 hover:text-red-900 mr-3"
                >
                  Delete
                </button>
                <button 
                  onClick={() => handleEditClick(company)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {editingCompany && (
        <EditCompanyModal
          company={editingCompany}
          isOpen={!!editingCompany}
          onClose={() => setEditingCompany(null)}
          onSave={handleUpdateCompany}
        />
      )}
    </>
  );
};

export default CompanyTable;
