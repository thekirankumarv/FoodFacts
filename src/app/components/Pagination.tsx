import React from 'react';
import { Pagination, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'; // Keep the Shadcn imports

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  // Function to generate the page numbers based on the current state
  const renderPageNumbers = () => {
    const pageItems = [];
    const maxDisplayedPages = 3; // Number of pages to show before and after the current page

    // Start and end points for visible page numbers
    const startPage = Math.max(2, currentPage - maxDisplayedPages);
    const endPage = Math.min(totalPages - 1, currentPage + maxDisplayedPages);

    // Add the "Previous" button
    if (currentPage > 1) {
      pageItems.push(
        <PaginationItem key="prev">
          <PaginationPrevious href="#" onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </PaginationPrevious>
        </PaginationItem>
      );
    }

    // Always show the first page link
    pageItems.push(
      <PaginationItem key={1}>
        <PaginationLink href="#" onClick={() => handlePageChange(1)} className={currentPage === 1 ? 'font-bold' : ''}>
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Show ellipsis before the current range if necessary
    if (startPage > 2) {
      pageItems.push(
        <PaginationItem key="start-ellipsis">
          <span>...</span>
        </PaginationItem>
      );
    }

    // Generate the page links dynamically
    for (let i = startPage; i <= endPage; i++) {
      pageItems.push(
        <PaginationItem key={i}>
          <PaginationLink href="#" onClick={() => handlePageChange(i)} className={currentPage === i ? 'font-bold' : ''}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Show ellipsis after the current range if necessary
    if (endPage < totalPages - 1) {
      pageItems.push(
        <PaginationItem key="end-ellipsis">
          <span>...</span>
        </PaginationItem>
      );
    }

    // Always show the last page link
    if (totalPages > 1) {
      pageItems.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(totalPages)}
            className={currentPage === totalPages ? 'font-bold' : ''}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add the "Next" button
    if (currentPage < totalPages) {
      pageItems.push(
        <PaginationItem key="next">
          <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </PaginationNext>
        </PaginationItem>
      );
    }

    return pageItems;
  };

  return (
    <Pagination>
      <nav className="flex justify-center mt-4">
        <ul className="flex items-center space-x-2">{renderPageNumbers()}</ul>
      </nav>
    </Pagination>
  );
};

export default PaginationComponent;