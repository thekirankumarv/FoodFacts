import React, { useEffect, useState } from 'react';
import { getAvailableCategories } from '../../services/openFoodFacts';

interface CategoryFilterProps {
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch categories when the component mounts
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getAvailableCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to fetch categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle empty state while loading
  if (loading) {
    return <p>Loading categories...</p>;
  }

  // Handle error state
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col mb-4">
      <h2 className="text-lg font-semibold mb-2">Select a Category</h2>
      {/* Render the category dropdown */}
      <select
        onChange={(e) => onSelectCategory(e.target.value)}
        className="p-2 border border-border rounded-md bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"
      >
        {/* Default option for selecting all categories */}
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {/* Format category names for better readability */}
            {category
              .replace(/-/g, ' ') // Replace hyphens with spaces
              .replace(/(?:^|\s)\S/g, (c) => c.toUpperCase())} {/* Capitalize the first letter of each word */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;