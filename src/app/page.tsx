"use client";

import React, { useState } from 'react';
import CategoryFilter from './components/CategoryFilter'; 
import ProductSearch from './components/ProductSearch'; 
import ProductList from './components/ProductList'; 

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [isBarcodeSearch, setIsBarcodeSearch] = useState(false); 
  const [sortBy, setSortBy] = useState(''); 

  // Handle the search input and set the type of search (barcode or name)
  const handleSearch = (term: string, isBarcode: boolean) => {
    setSearchTerm(term); 
    setIsBarcodeSearch(isBarcode); 
  };

  // Handle sort changes
  const handleSort = (sortBy: string) => {
    setSortBy(sortBy); 
  };

  // Handle category selection
  const handleCategorySelection = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto p-4">
      
      {/* Category Filter Section */}
      <div className="mb-4">
        <CategoryFilter onSelectCategory={handleCategorySelection} />
      </div>
      
      {/* Search and Sort Section */}
      <ProductSearch 
        onSearch={handleSearch} 
        onSort={handleSort} 
      />

      {/* Product List Section */}
      <ProductList 
        category={selectedCategory} 
        searchTerm={searchTerm} 
        isBarcodeSearch={isBarcodeSearch} 
        sortBy={sortBy} 
      />
    </div>
  );
};

export default Home;
