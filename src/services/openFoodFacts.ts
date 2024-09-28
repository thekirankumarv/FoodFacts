const BASE_URL = "https://world.openfoodfacts.org";

// Fetch products by category
export const getProductsByCategory = async (category: string) => {
  try {
    const response = await fetch(`${BASE_URL}/category/${category}.json?lc=en`);
    if (!response.ok) {
      const errorDetails = await response.text(); // Get the error details
      throw new Error(`Failed to fetch products by category: ${errorDetails}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error; // Rethrow to handle it in the calling function
  }
};

// Search products by name
export const searchProductsByName = async (name: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(name)}&json=true&action=process&page=1&page_size=20`
    );
    if (!response.ok) {
      const errorDetails = await response.text(); // Get the error details
      throw new Error(`Failed to search products by name: ${errorDetails}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error; // Rethrow to handle it in the calling function
  }
};

// Fetch product details by barcode
export const getProductByBarcode = async (barcode: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`);
    if (!response.ok) {
      const errorDetails = await response.text(); // Get the error details
      throw new Error(`Failed to fetch product details: ${errorDetails}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product by barcode:", error);
    throw error; // Rethrow to handle it in the calling function
  }
};

// Fetch product details by ID
export const getProductById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v0/product/${id}.json`);
    if (!response.ok) {
      const errorDetails = await response.text(); // Get the error details
      throw new Error(`Failed to fetch product details by ID: ${errorDetails}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error; // Rethrow to handle it in the calling function
  }
};

// Search products by barcode
export const searchProductsByBarcode = async (barcode: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`);
    if (!response.ok) {
      const errorDetails = await response.text(); // Get the error details
      throw new Error(`Failed to fetch product by barcode: ${errorDetails}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product by barcode:", error);
    throw error; // Rethrow to handle it in the calling function
  }
};

// Fetch all products with pagination
export const getAllProducts = async (page: number = 1, itemsPerPage: number = 1000) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v2/search?sort_by=popularity&page=${page}&page_size=${itemsPerPage}&fields=code,product_name,nutrition_grades,image_url,ingredients_text,categories,category_tags&lc=en`);
    if (!response.ok) {
      const errorDetails = await response.text(); // Get the error details
      throw new Error(`Failed to fetch all products: ${errorDetails}`);
    }
    const data = await response.json();

    if (data && data.products) {
      return { products: data.products };
    } else {
      return { products: [] };
    }
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error; // Rethrow to handle it in the calling function
  }
};

// Fetch all products with infinite pagination
export const fetchAllProducts = async () => {
  const allProducts = [];
  let page = 1;
  let keepFetching = true;

  while (keepFetching) {
    const data = await getAllProducts(page);
    if (data.products && data.products.length) {
      allProducts.push(...data.products);
      page += 1;
    } else {
      keepFetching = false; // Stop if no more products
    }

    await new Promise(resolve => setTimeout(resolve, 600)); // Respect rate limit
  }

  return { products: allProducts };
};

// Fetch available categories from the OpenFoodFacts API
export const getAvailableCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/v2/search?sort_by=popularity&page=1&page_size=1000&fields=categories_tags`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();

    console.log("Fetched categories data:", data); // Log the entire response
    const categoriesSet = new Set<string>(); // Use a Set to avoid duplicates

    // Extract categories from products
    data.products.forEach((product: { categories_tags: string[] }) => {
      if (product.categories_tags) {
        product.categories_tags.forEach((category: string) => {
          // Clean up the category name by removing language prefixes
          const cleanCategory = category.replace(/^(en:|fr:)/, '').replace(/-/g, ' '); // Replace hyphens with spaces
          const formattedCategoryName = cleanCategory.charAt(0).toUpperCase() + cleanCategory.slice(1); // Capitalize the first letter
          categoriesSet.add(formattedCategoryName.trim()); // Add the cleaned category
        });
      }
    });

    return Array.from(categoriesSet); // Convert Set back to Array
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // Rethrow to handle it in the calling function
  }
};