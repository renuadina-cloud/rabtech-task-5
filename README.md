 Dynamic JavaScript DOM Logic & RESTful API Client

A dynamic product store web application built using HTML, CSS, and JavaScript ES6+.  
The application fetches live product data from a public REST API and provides dynamic search, category filtering, sorting, cart management, loading states, and error handling.

 Features

- Fetches live product data using REST API
- Uses JavaScript `async/await` and `fetch()`
- Real-time product search
- Category-based filtering
- Product sorting
  - Price: Low to High
  - Price: High to Low
  - Name: A-Z
- Dynamic DOM manipulation
- Add products to cart
- Cart state management using `localStorage`
- Loading state while fetching data
- User-friendly error handling
- Responsive product grid
- Modular JavaScript files

Technologies Used

- HTML5
- CSS3
- JavaScript ES6+
- REST API
- Fetch API
- Async/Await
- DOM Manipulation
- LocalStorage
- Git & GitHub

API Used

This project uses the Fake Store API to retrieve product and category data.

API Endpoint:

https://fakestoreapi.com/products

Categories Endpoint:

https://fakestoreapi.com/products/categories

 Project Structure

```text
dynamic-product-store/
│
├── index.html
├── style.css
├── api.js
├── app.js
└── README.md
