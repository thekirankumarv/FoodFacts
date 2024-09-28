"use client"; 

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getProductByBarcode } from '../../../services/openFoodFacts'; 

interface Product {
  product_name: string;
  image_url: string;
  labels_tags: string[];
  ingredients_text: string;
  nutriments: { [key: string]: string | number }; 
  categories_tags: string[];
  code: string;
  nutrition_grade_fr: string;
}

const ProductPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('Fetching product with ID:', params.id);
        const productData = await getProductByBarcode(params.id); // Fetch product details
        console.log('Fetched product data:', productData); // Log the fetched data
        if (productData && productData.product) {
          setProduct(productData.product);
          console.log('Product state updated:', productData.product); // Log the updated product state
        } else {
          throw new Error('Product not found in the response.');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>No product found.</p>;

  // Extract labels, filtering only English labels and removing the "en:" prefix
  const labelsArray: string[] = product.labels_tags?.filter(label => label.startsWith('en:'))
    .map(label => label.replace(/^en:/, '').trim()) || [];

  // Prepare ingredients as bullet points
  const ingredientsList: string[] = product.ingredients_text
    ? product.ingredients_text.replace(/\s*[\n\r]+\s*/g, ', ')
        .split(/,\s*(?=\w)/)
        .map(ingredient => ingredient.trim())
    : [];

  // Prepare nutritional values
  const nutritionalValuesList: { name: string; value: string | number }[] = Object.entries(product.nutriments || {}).map(
    ([key, value]) => ({
      name: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      value,
    })
  );

  // Filter and format the category, removing "en:" and ensuring it's English
  const categoryTag = product.categories_tags?.find(cat => cat.startsWith('en:'));
  const category: string | undefined = categoryTag ? categoryTag.replace(/^en:/, '').trim() : undefined;

  // Capitalize the first letter of the category
  const formattedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() : 'N/A';

  // Format Nutrition Grade to uppercase
  const nutritionGrade = product.nutrition_grade_fr?.toUpperCase() || 'N/A';

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{product.product_name}</h1>

        {product.image_url && (
          <div className="image-frame mb-4" style={{ height: '300px', width: '300px', overflow: 'hidden', position: 'relative' }}>
            <Image
              src={product.image_url}
              alt={product.product_name}
              fill // Make the image fill the container
              style={{ objectFit: 'contain' }} // Ensure the image fits within the frame
              className="object-contain"
            />
          </div>
        )}

        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Category:</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">{formattedCategory}</p>

        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Barcode:</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">{product.code || 'N/A'}</p>

        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Nutrition Grade:</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">{nutritionGrade}</p>

        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Ingredients:</h2>
        <ul className="mb-4 list-disc list-inside text-gray-700 dark:text-gray-300">
          {ingredientsList.length > 0 ? (
            ingredientsList.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))
          ) : (
            <li>No ingredients available.</li>
          )}
        </ul>

        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Nutritional Values:</h2>
        <ul className="mb-4 list-disc list-inside text-gray-700 dark:text-gray-300">
          {nutritionalValuesList.length > 0 ? (
            nutritionalValuesList.map((nutrient, index) => (
              <li key={index}>
                {nutrient.name}: {nutrient.value}
              </li>
            ))
          ) : (
            <li>No nutritional values available.</li>
          )}
        </ul>

        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Labels:</h2>
        <ul className="flex flex-wrap">
          {labelsArray.length > 0 ? (
            labelsArray.map((label, index) => (
              <li key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2 dark:bg-blue-700 dark:text-white">
                {label} {/* Display the label without "en:" prefix */}
              </li>
            ))
          ) : (
            <li>No labels available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductPage;
