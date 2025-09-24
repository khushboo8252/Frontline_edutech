import React, { useState, useEffect } from 'react';
import { fetchCompanies } from '../services/api';

const Filter = ({ setFilters }) => {
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    location: '',
    minSize: '',
    maxSize: ''
  });
  const [industries, setIndustries] = useState([]);
  const [locations, setLocations] = useState([]);

  // Fetch unique industries and locations for dropdowns
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const data = await fetchCompanies();
        
        // Extract unique industries
        const uniqueIndustries = [...new Set(data.map(company => company.industry).filter(Boolean))];
        setIndustries(uniqueIndustries);
        
        // Extract unique locations
        const uniqueLocations = [...new Set(data.map(company => company.location).filter(Boolean))];
        setLocations(uniqueLocations);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilters();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Remove empty filters
    const activeFilters = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v !== '')
    );
    setFilters(activeFilters);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      industry: '',
      location: '',
      minSize: '',
      maxSize: ''
    });
    setFilters({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Filter Companies</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Search by name"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="minSize" className="block text-sm font-medium text-gray-700 mb-1">
            Min Employees
          </label>
          <input
            type="number"
            id="minSize"
            name="minSize"
            min="0"
            value={formData.minSize}
            onChange={handleChange}
            placeholder="Min size"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="maxSize" className="block text-sm font-medium text-gray-700 mb-1">
            Max Employees
          </label>
          <input
            type="number"
            id="maxSize"
            name="maxSize"
            min="0"
            value={formData.maxSize}
            onChange={handleChange}
            placeholder="Max size"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-end space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
