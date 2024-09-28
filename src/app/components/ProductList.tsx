import React, { useEffect, useState, useMemo } from 'react';
import {
  getProductsByCategory,
  searchProductsByName,
  searchProductsByBarcode,
  getAllProducts,
} from '../../services/openFoodFacts';
import ProductCard from './ProductCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Define the Product interface with the required properties
interface Product {
  code: string;
  product_name?: string;
  nutrition_grade_fr?: string;
  image_url?: string;
}

// Define a type for the structure of the response data from the API calls
interface ProductData {
  status?: number;
  product?: Product;
  products?: Product[];
}

interface ProductListProps {
  category: string;
  searchTerm: string;
  isBarcodeSearch: boolean;
  sortBy: string;
}

const ProductList: React.FC<ProductListProps> = ({
  category,
  searchTerm,
  isBarcodeSearch,
  sortBy,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isBarcodeNotFound, setIsBarcodeNotFound] = useState<boolean>(false);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let data: ProductData = {};

        if (isBarcodeSearch && searchTerm) {
          data = await searchProductsByBarcode(searchTerm);

          if (data && data.status === 1 && data.product) {
            setProducts([data.product]);
            setIsBarcodeNotFound(false);
          } else {
            setProducts([]);
            setIsBarcodeNotFound(true);
          }
        } else if (searchTerm) {
          data = await searchProductsByName(searchTerm);

          if (data && data.products) {
            setProducts(data.products);
          } else {
            setProducts([]);
          }
          setIsBarcodeNotFound(false);
        } else if (category) {
          data = await getProductsByCategory(category);

          if (data && data.products) {
            setProducts(data.products);
          } else {
            setProducts([]);
          }
          setIsBarcodeNotFound(false);
        } else {
          data = await getAllProducts();

          if (data && data.products) {
            setProducts(data.products);
          } else {
            setProducts([]);
          }
          setIsBarcodeNotFound(false);
        }

        console.log(
          "Total products fetched:",
          data?.products?.length || (data?.status === 1 ? 1 : 0)
        );
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchProducts();
  }, [category, searchTerm, isBarcodeSearch]);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    if (sortBy) {
      switch (sortBy) {
        case 'name-asc':
          sorted.sort((a, b) =>
            a.product_name && b.product_name
              ? a.product_name.localeCompare(b.product_name)
              : 0
          );
          break;
        case 'name-desc':
          sorted.sort((a, b) =>
            a.product_name && b.product_name
              ? b.product_name.localeCompare(a.product_name)
              : 0
          );
          break;
        case 'nutrition-asc':
          sorted.sort((a, b) =>
            a.nutrition_grade_fr && b.nutrition_grade_fr
              ? a.nutrition_grade_fr.localeCompare(b.nutrition_grade_fr)
              : 0
          );
          break;
        case 'nutrition-desc':
          sorted.sort((a, b) =>
            a.nutrition_grade_fr && b.nutrition_grade_fr
              ? b.nutrition_grade_fr.localeCompare(a.nutrition_grade_fr)
              : 0
          );
          break;
        default:
          break;
      }
    }

    return sorted;
  }, [products, sortBy]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pages: JSX.Element[] = [];
    const maxDisplayedPages = 3;
    const startPage = Math.max(2, currentPage - maxDisplayedPages);
    const endPage = Math.min(totalPages - 1, currentPage + maxDisplayedPages);

    pages.push(
      <PaginationItem key="prev">
        {currentPage > 1 ? (
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
          >
            Previous
          </PaginationPrevious>
        ) : (
          <span className="text-gray-400">Previous</span>
        )}
      </PaginationItem>
    );

    pages.push(
      <PaginationItem key={1}>
        <PaginationLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(1);
          }}
          className={currentPage === 1 ? 'font-bold' : ''}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (startPage > 2) {
      pages.push(
        <PaginationItem key="startEllipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
            className={currentPage === i ? 'font-bold' : ''}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages - 1) {
      pages.push(
        <PaginationItem key="endEllipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(totalPages);
            }}
            className={currentPage === totalPages ? 'font-bold' : ''}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    pages.push(
      <PaginationItem key="next">
        {currentPage < totalPages ? (
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
          >
            Next
          </PaginationNext>
        ) : (
          <span className="text-gray-400">Next</span>
        )}
      </PaginationItem>
    );

    return pages;
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (isBarcodeNotFound) {
    return <div className="text-gray-500">No products found for the given barcode. Please try again.</div>;
  }

  if (!sortedProducts.length) {
    return <div className="text-gray-500">No products found. Please select a category or search for a product.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.code} product={product} />
        ))}
      </div>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>{renderPagination()}</PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ProductList;
