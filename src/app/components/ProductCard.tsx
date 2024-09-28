import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './ProductCard.css';

interface Product {
  code: string;
  product_name?: string;  
  image_url?: string;     
  categories_tags?: string[];
  categories?: string;
  category_tags?: string[];
  nutrition_grades?: string;
  ingredients_text?: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to get the category
  const getCategory = () => {
    const cleanCategoryName = (category: string) => {
      return category
        .replace(/^en:/, '') // Remove 'en:' prefix
        .split('_').join(' ') // Replace underscores with spaces
        .split('-').join(' ') // Replace hyphens with spaces
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    if (product.categories_tags) {
      const englishCategory = product.categories_tags.find((cat: string) => cat.startsWith('en:'));
      if (englishCategory) {
        return cleanCategoryName(englishCategory);
      }
    }

    if (product.categories) {
      const categories = product.categories.split(',');
      return cleanCategoryName(categories[0].trim());
    }

    if (product.category_tags && product.category_tags.length > 0) {
      return cleanCategoryName(product.category_tags[0]);
    }

    return 'N/A';
  };

  return (
    <Link href={`/products/${product.code}`} passHref>
      <div className="product-card flex flex-col h-full p-4 relative border rounded shadow-lg hover:shadow-xl transition">
        <Image
          src={product.image_url || '/default_image_url.jpg'}
          alt={product.product_name || 'Product Image'} // Fallback if product_name is missing
          width={300}
          height={200}
          className="h-40 w-full object-cover mb-2"
        />
        <h2 className="text-lg font-semibold">{product.product_name || 'Unnamed Product'}</h2>

        <p className="text-gray-600">
          <strong>Category:</strong> {getCategory()}
        </p>

        <p className="text-gray-600">
          <strong>Nutrition Grade:</strong> {(product.nutrition_grades || 'N/A').toUpperCase()}
        </p>

        <p className="text-gray-600">
          <strong>Ingredients:</strong>
          {isExpanded
            ? product.ingredients_text || 'N/A'
            : `${(product.ingredients_text || 'N/A').slice(0, 50)}...`}
        </p>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleReadMore();
          }}
          className="text-blue-500 underline mt-auto self-end text-sm"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
