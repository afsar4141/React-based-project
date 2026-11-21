# Ecomm Fullstack

React + Redux Toolkit storefront with a `json-server` backend.

## Run it

Two terminals:

```bash
# 1) backend  ->  http://localhost:3000  (/products, /users, /orders)
cd backend
npm install
npm start

# 2) frontend ->  http://localhost:5173
cd frontend
npm install
npm run dev
```

Optional: copy `frontend/.env.example` to `frontend/.env` to point at a different API URL.

Demo admin: `admin@master.com` / `123456`

## Features

- Product catalogue with search, category filter, sorting and infinite scroll
- Public product detail page (`/product/:id`)
- Sign up / sign in with form validation and duplicate-email check
- Cart with quantity controls, remove, clear, live total and nav badge
- Checkout that creates an order, plus an order-history page
- Admin-only create / edit / delete products
- Toast notifications for every action

## Structure

```
frontend/src
  api/        axios instance
  components/ Nav, ProductTemplate, ProductForm, FormField, LoadingProduct
  pages/      Products, ProductDetails, Cart, Orders, Settings, Signin, Signup...
  routes/     Mainroutes + Auth / Unauth / Admin guards
  store/      slices (reducers/) and thunks (actions/)
  utils/      format helpers, useAddToCart, useProductFilters
```
