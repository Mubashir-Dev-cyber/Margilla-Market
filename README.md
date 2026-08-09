# Margilla Market

Margilla Market is a modern, e-commerce storefront built with Next.js and MongoDB. Customers can browse a product catalog, search using natural-language queries, add items to a client-side cart, and place cash-on-delivery orders with local delivery details.

The project also includes an optional OpenAI integration. When an API key is available, search queries are expanded into product keywords and product seed data can be enriched with embeddings for future MongoDB Atlas Vector Search work.

## Features

- Responsive storefront with home, about, products, product details, cart, and checkout pages
- MongoDB-backed product catalog and order storage using Mongoose
- Natural-language product search through OpenAI keyword expansion
- Search fallback that works without an OpenAI key by using the words in the query
- Optional product embeddings generated with `text-embedding-3-small` during seeding
- Client-side cart with quantity controls, item removal, and cart totals
- Islamabad delivery checkout with customer validation and cash-on-delivery messaging
- REST-style Next.js route handlers for products, search, seeding, and orders
- Tailwind CSS styling with the Next.js App Router

## Tech stack

- Next.js 16
- React 19
- MongoDB with Mongoose
- OpenAI API (optional)
- Tailwind CSS 4
- Next.js App Router and route handlers

## Requirements

- Node.js 18.18 or newer
- npm
- A MongoDB database, such as MongoDB Atlas
- An OpenAI API key only if you want AI keyword expansion and embedding generation

## Getting started

1. Clone the repository and enter the project directory:

   ```bash
   git clone <your-repository-url>
   cd mongo-ecom
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root:

   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
   OPENAI_API_KEY=sk-...
   ```

   `MONGO_URI` is also supported as an alternative to `MONGODB_URI`. `OPENAI_API_KEY` is optional; without it, the application still supports catalog browsing and basic keyword search.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Seed the catalog

After configuring MongoDB, open the following URL in a browser or call it with an HTTP client:

```text
GET http://localhost:3000/api/seed
```

The seed route inserts the sample catalog and generates embeddings when `OPENAI_API_KEY` is configured. It deletes the existing `Product` documents before inserting the sample data, so use it only when you intentionally want to reset the product catalog.

## Search behavior

The products page sends searches to `POST /api/ai-search`.

- With `OPENAI_API_KEY`: OpenAI converts the natural-language query into up to 10 product keywords. The API then searches product titles, descriptions, and categories in MongoDB.
- Without `OPENAI_API_KEY`: the query is split into words and those words are used for the same MongoDB field matching.

The product schema and seed flow include an `embedding` field, and the search route contains a MongoDB `$vectorSearch` prototype for learning and future extension. The active production path currently uses keyword-based MongoDB matching rather than executing `$vectorSearch`.

## Application routes

| Route | Purpose |
| --- | --- |
| `/` | Marketplace landing page |
| `/products` | Product catalog and search |
| `/products/[id]` | Product details |
| `/cart` | Client-side shopping cart |
| `/checkout` | Delivery details and order placement |
| `/about` | About page |

## API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/products` | Return all products |
| `GET` | `/api/products/[id]` | Return one product |
| `GET` / `POST` | `/api/ai-search` | Search products using a query string or JSON body |
| `GET` | `/api/seed` | Reset and seed the sample product catalog |
| `POST` | `/api/orders` | Validate and save an order |

Example search request:

```bash
curl -X POST http://localhost:3000/api/ai-search \
  -H "Content-Type: application/json" \
  -d '{"query":"comfortable shoes for running"}'
```

Example order request:

```json
{
  "customer": {
    "name": "Ayesha Khan",
    "phone": "03001234567",
    "area": "F-6",
    "pincode": "44000",
    "address": "House 12, Street 4"
  },
  "items": [
    {
      "_id": "product-id",
      "title": "Running Shoes",
      "price": 99.99,
      "quantity": 1,
      "image": "https://example.com/image.jpg"
    }
  ]
}
```

Orders use a fixed Islamabad delivery fee of PKR 250. The server calculates the subtotal and total before saving the order.

## Available scripts

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run start     # Start the production server
npm run lint      # Run ESLint
```

## Project structure

```text
mongo-ecom/
├── app/
│   ├── api/              # Product, search, seed, and order APIs
│   ├── components/      # Shared navigation and footer
│   ├── products/         # Catalog and product detail pages
│   ├── cart/             # Shopping cart page
│   ├── checkout/         # Checkout page
│   └── page.js           # Landing page
├── app/lib/cart.js       # Browser cart persistence helpers
├── lib/db.js             # MongoDB connection helper
├── models/               # Product and Order Mongoose models
├── public/               # Static assets
└── package.json
```

## Deployment

The application can be deployed to platforms that support Next.js, including Vercel. Configure `MONGODB_URI` and, if desired, `OPENAI_API_KEY` as deployment environment variables before building. Seed the database against the intended environment, not a production database containing live catalog data unless a reset is expected.

## Security notes

- Never commit `.env`, `.env.local`, or API keys to source control.
- Keep the seed endpoint private or remove it before exposing the application publicly, because it resets the product collection.
- Add authentication and authorization before exposing order-management or catalog-management features beyond this demo storefront.

## License

Add the license that matches how you plan to distribute this project.
