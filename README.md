# FoodFacts

**FoodFacts** is a web application that allows users to search, filter, and view detailed information about various food products using the [OpenFoodFacts API](https://world.openfoodfacts.org/). Whether you're looking to find healthier options, explore ingredients, or simply discover new products, Food Product Explorer provides an intuitive and responsive interface to meet your needs.

## Features

### 1. Homepage

- **Product List:** Displays a comprehensive list of food products fetched from the OpenFoodFacts API.
- **Key Information:** Each product showcases:
  - **Product Name**
  - **Image**
  - **Category**
  - **Ingredients**
  - **Nutrition Grade** (A, B, C, D, E)
- **Pagination:** Navigate through products seamlessly using infinite scroll or a "Load More" button.

### 2. Search Functionality

- **Name Search:** Use the search bar to find food products by their name. 

### 3. Barcode Search Functionality

- **Barcode Lookup:** Search for specific food products by entering their barcode, retrieving detailed information instantly.

### 4. Category Filter

- **Filter by Category:** Utilize a dropdown or side filter to narrow down products by categories such as beverages, dairy, snacks, etc. Categories are dynamically fetched from the OpenFoodFacts API.

### 5. Sort Functionality

- **Sorting Options:** Organize the product list based on:
  - **Product Name:** A-Z or Z-A
  - **Nutrition Grade:** Ascending or Descending

### 6. Product Detail Page

- **Detailed Information:** Click on any product to navigate to its detail page, which includes:
  - **Product Image**
  - **Full List of Ingredients**
  - **Nutritional Values:** Energy, fat, carbohydrates, proteins, etc.
  - **Labels:** Indications like vegan, gluten-free, etc.

### 7. Responsive Design

- **Mobile & Desktop Friendly:** The application is fully responsive, ensuring a seamless experience across all device sizes.

## Technologies Used

- **Front-end:** [Next.js](https://nextjs.org/) – For server-side rendering and building the React application.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) – A utility-first CSS framework for rapid UI development.
- **API Integration:** [OpenFoodFacts API](https://world.openfoodfacts.org/) – To fetch and display food product data.
- **Additional Libraries:**
  - [ShandCN](https://ui.shadcn.com/) – A collection of accessible design components that streamline development and maintain design consistency across applications.

## Installation

Follow these steps to set up and run the project locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/thekirankumarv/FoodFacts.git
   cd FoodFacts
   ```

2. **Install Dependencies**

   Ensure you have [Node.js](https://nodejs.org/) installed. Then, install the necessary packages:

   ```bash
   npm install
   ```

3. **Run the Development Server**

   Start the application in development mode:

   ```bash
   npm run dev
   ```

4. **Open in Browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

- **Search for Products:** Use the search bar on the homepage to find products by name or barcode.
- **Filter by Category:** Select a category from the dropdown to filter the product list.
- **Sort Products:** Choose your preferred sorting option to organize the products.
- **View Product Details:** Click on any product to see detailed information on a separate page.
- **Responsive Navigation:** Access all features seamlessly across different devices.

## API Integration

The application leverages the [OpenFoodFacts API](https://world.openfoodfacts.org/) to fetch real-time data about food products.

- **Base URL:** `https://world.openfoodfacts.org/`

## Contributing

Contributions are welcome! Follow these steps to contribute:


## License

This project is licensed under the [MIT License](./LICENSE).


