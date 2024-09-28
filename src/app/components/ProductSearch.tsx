import React, { useState } from 'react';
import { getProductByBarcode, searchProductsByName } from '../../services/openFoodFacts';

interface Product {
  code: string;
  product_name: string;
  image_url: string;
  categories_tags?: string[];
  nutrition_grades?: string;
  ingredients_text?: string;
}

interface BarcodeResult {
  product: Product;
}

interface NameSearchResult {
  products: Product[];
}

const ProductSearch: React.FC<{
  onSearch: (term: string, isBarcode: boolean, results?: Product | Product[]) => void;
  onSort: (sortBy: string) => void;
}> = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setError(null);
    setLoading(true);
    const isBarcode = /^[0-9]+$/.test(searchTerm);

    try {
      let result: BarcodeResult | NameSearchResult;

      if (isBarcode) {
        result = await getProductByBarcode(searchTerm);
        if ('product' in result) {
          onSearch(searchTerm, true, result.product);
        } else {
          throw new Error('Product not found');
        }
      } else {
        result = await searchProductsByName(searchTerm);
        if ('products' in result && result.products.length > 0) {
          onSearch(searchTerm, false, result.products);
        } else {
          throw new Error('No products found');
        }
      }

    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during the search.');
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
    onSort(selectedSort);
  };

  return (
    <div className="mb-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row flex-grow md:mr-4 w-full md:w-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter barcode or product name..."
            className="p-2 border border-gray-300 rounded w-full md:flex-grow bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="mt-2 md:mt-0 md:ml-2 p-2 bg-blue-500 text-white rounded w-full md:w-auto"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4 w-full md:w-auto">
          <label htmlFor="sortBy" className="mr-2">Sort by:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={handleSortChange}
            className="p-2 border border-gray-300 rounded bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
          >
            <option value="">Select</option>
            <option value="name-asc">Product Name (A-Z)</option>
            <option value="name-desc">Product Name (Z-A)</option>
            <option value="nutrition-asc">Nutrition Grade (A-E)</option>
            <option value="nutrition-desc">Nutrition Grade (E-A)</option>
          </select>
        </div>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ProductSearch;
