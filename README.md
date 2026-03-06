# Ecommerce Backend API

A comprehensive RESTful API backend for an ecommerce platform built with modern Node.js technologies. The API implements core shopping features including user authentication, product management, shopping cart, order processing, and integrated payment solutions.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Authentication](#authentication)
- [Development](#development)
- [Scripts](#scripts)
- [Code Quality](#code-quality)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Ecommerce Backend is a production-ready REST API designed to power modern ecommerce platforms. It provides comprehensive endpoints for managing users, products, categories, inventory, shopping carts, orders, and payments. The system is built with scalability, security, and maintainability in mind.

**Current Version:** 1.0.0

---

## Tech Stack

### Core Framework

- **Runtime:** Node.js with TypeScript
- **Web Framework:** Express.js v5
- **Database:** PostgreSQL with Prisma ORM v7

### Authentication & Security

- **JWT:** JSON Web Tokens (Access + Refresh tokens)
- **Password Hashing:** bcryptjs
- **Validation:** Zod schema validation

### Payment Integration

- **Payment Gateway:** VNPay
- **Payment Methods:** Cash on Delivery (COD) & VNPay

### Development Tools

- **Linting:** ESLint with Prettier
- **Testing:** Jest with ts-jest
- **Code Generation:** Prisma Client
- **File Watching:** Nodemon
- **Task Running:** pnpm v10.28.0

---

## Architecture

### Layered Architecture Pattern

```
Request → Route → Middleware → Controller → Service → Repository → Database
```

### Directory Structure

```
src/
├── modules/              # Feature modules (domain-driven)
│   ├── auth/            # Authentication & authorization
│   ├── user/            # User profile management
│   ├── product/         # Product & variant management
│   ├── category/        # Category management
│   ├── cart/            # Shopping cart operations
│   ├── order/           # Order management
│   ├── address/         # Delivery address management
│   └── payment/         # Payment processing
├── config/              # Configuration files
├── middlewares/         # Express middlewares
├── lib/                 # Utility libraries
├── utils/               # Helper functions
├── errors/              # Error handling
├── routes/              # API route definitions
├── app.ts               # Express app setup
└── index.ts             # Application entry point

prisma/
├── schema.prisma        # Database schema definition
└── migrations/          # Database migration files

generated/               # Auto-generated Prisma client
docs/                    # API documentation
```

### Key Architectural Decisions

- **Module-Based Organization:** Features are organized as self-contained modules with their own controllers, services, repositories, and schemas
- **Separation of Concerns:** Clear separation between routing, business logic, and data access layers
- **Centralized Error Handling:** Global error middleware for consistent error responses
- **Request Validation:** Zod schemas validate all incoming requests at the middleware level
- **Role-Based Access Control:** Authorization middleware enforces role-based permissions

---

## Features

### 🔐 Authentication & Authorization

- User registration with email and phone validation
- Secure login with JWT tokens (access + refresh)
- Token refresh mechanism for session management
- Role-based access control (ADMIN, USER)
- Logout with token invalidation

### 👤 User Management

- User profile retrieval
- Update user information (name, email, phone)
- Account management
- Multiple authentication providers support (Local, Google)

### 📦 Product Management

- Create, read, update, delete products
- Product variants with different SKUs and pricing
- Product images with primary image selection
- Product search and pagination
- Active/inactive product status
- Soft delete support

### 🏷️ Category Management

- Hierarchical category structure (parent-child relationships)
- Category creation and management
- URL-friendly slugs for SEO
- Soft delete support

### 🛒 Shopping Cart

- Add products to cart
- Update item quantities
- Remove items from cart
- Automatic total calculation
- Cart state management per user

### 📋 Order Management

- Create orders from cart items
- Order status tracking (PENDING, APPROVED, SHIPPING, DELIVERED, CANCELED)
- Order snapshots with shipping details
- Order item quantity and pricing snapshots
- Order cancellation
- User order history

### 💳 Payment Processing

- **Cash on Delivery (COD):** Simple payment method
- **VNPay Integration:** Secure online payment gateway
  - Payment URL generation
  - Transaction verification
  - Secure hash validation
  - Payment status tracking
- Payment status management (PENDING, SUCCESS, FAILED, CANCELED)
- Transaction tracking and reconciliation

### 📍 Address Management

- Create and manage delivery addresses
- Set default delivery address
- Update and delete addresses
- User address history

---

## Project Structure

### Database Models

```
User
├── RefreshToken
├── Account
├── Cart
│   └── CartItem
│       └── ProductVariant
├── Order
│   ├── OrderItem
│   └── Payment
├── Address
└── (Many-to-many with other entities)

Product
├── ProductVariant
│   ├── ProductImage
│   ├── CartItem
│   └── OrderItem
└── Category
    ├── Parent Category
    └── Sub Categories
```

### Data Models Overview

| Model              | Purpose                                      |
| ------------------ | -------------------------------------------- |
| **User**           | Core user entity with role-based permissions |
| **Product**        | Main product catalog with descriptions       |
| **ProductVariant** | Product variations (SKU, price, stock)       |
| **ProductImage**   | Product images for variants                  |
| **Category**       | Product categorization with hierarchy        |
| **Cart**           | User shopping cart                           |
| **CartItem**       | Individual items in cart                     |
| **Order**          | Customer orders with status tracking         |
| **OrderItem**      | Items within orders with price snapshots     |
| **Payment**        | Payment records with transaction details     |
| **Address**        | User delivery addresses                      |
| **RefreshToken**   | JWT refresh token tracking                   |
| **Account**        | OAuth provider accounts                      |

---

## Getting Started

### Prerequisites

- Node.js v18+ (LTS recommended)
- PostgreSQL v12+
- pnpm v10.28.0 (or npm/yarn)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd moda-ecomerce/server
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or: npm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Setup database**

   ```bash
   pnpm run migrate:dev
   ```

5. **Start development server**

   ```bash
   pnpm run dev
   ```

   Server will be running at `http://localhost:8000`

### Quick Health Check

```bash
curl http://localhost:8000/health
```

Expected response:

```json
{
  "status": "ok",
  "uptime": 123.456,
  "timestamp": "2026-03-06T10:30:00.000Z"
}
```

---

## API Documentation

### Base URL

```
http://localhost:8000/api/v1
```

### Health & Info Endpoints

```
GET /health          - Server health check
GET /api             - API information
```

### Authentication Endpoints

```
POST   /auth/register        - Register new account
POST   /auth/login           - Login with credentials
POST   /auth/refresh-token   - Refresh access token
POST   /auth/logout          - Logout and invalidate tokens
```

### User Endpoints

```
GET    /users/me      - Get current user profile
PATCH  /users/me      - Update user profile
```

### Product Endpoints

```
GET    /products                    - Get all products (paginated, searchable)
GET    /products/:id                - Get product details
POST   /products                    - Create product (ADMIN only)
PATCH  /products/:id                - Update product (ADMIN only)
DELETE /products/:id                - Delete product (ADMIN only)

POST   /products/:id/variants       - Create product variant (ADMIN only)
GET    /products/variants/:variantId  - Get variant details
PATCH  /products/variants/:variantId  - Update variant (ADMIN only)
DELETE /products/variants/:variantId  - Delete variant (ADMIN only)
```

### Category Endpoints

```
GET    /categories              - Get all categories
GET    /categories/:slug        - Get category by slug
POST   /categories              - Create category (ADMIN only)
PATCH  /categories/:id          - Update category (ADMIN only)
DELETE /categories/:id          - Delete category (ADMIN only)
```

### Cart Endpoints

```
GET    /cart                    - Get user's cart
POST   /cart/items              - Add item to cart
PATCH  /cart/items/:itemId      - Update item quantity
DELETE /cart/items/:itemId      - Remove item from cart
```

### Order Endpoints

```
POST   /orders                  - Create order from cart
GET    /orders/my-orders        - Get user's orders
GET    /orders/:id              - Get order details
PATCH  /orders/:id/cancel       - Cancel order
```

### Address Endpoints

```
GET    /addresses               - Get user's addresses
POST   /addresses               - Create new address
GET    /addresses/:id           - Get address details
PATCH  /addresses/:id           - Update address
DELETE /addresses/:id           - Delete address
PATCH  /addresses/:id/default   - Set as default address
```

### Payment Endpoints

```
POST   /payment/cod/create      - Create COD payment
POST   /payment/vnpay/create    - Create VNPay payment URL
GET    /payment/vnpay/return    - Handle VNPay return
```

### Error Responses

All endpoints return consistent error responses:

```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### Authentication

Protected endpoints require an `Authorization` header:

```bash
Authorization: Bearer <access_token>
```

**Access Token Duration:** Default 15 minutes  
**Refresh Token Duration:** Default 7 days

---

## Database

### Connection Setup

The application uses PostgreSQL with Prisma ORM. Configure the connection via `DATABASE_URL`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/moda_ecommerce?schema=public"
```

### Migrations

**View migration status:**

```bash
pnpm run migrate:status
```

**Create new migration:**

```bash
pnpm run migrate:dev -- --name migration_name
```

**Reset database (development only):**

```bash
pnpm run migrate:reset
```

### Prisma Client

**Generate Prisma Client:**

```bash
pnpm run generate
```

**Open Prisma Studio (GUI):**

```bash
pnpm run studio
```

### Database Seeding

(Future feature - can be implemented for sample data)

---

## Authentication

### JWT Implementation

The application uses a two-token authentication system:

1. **Access Token**
   - Short-lived (15 minutes default)
   - Included in `Authorization` header
   - Used to authenticate API requests

2. **Refresh Token**
   - Long-lived (7 days default)
   - Stored securely in database
   - Used to obtain new access tokens
   - Can only be used at `/auth/refresh-token` endpoint

### Login Flow

```
1. User submits email + password
2. Password verified with bcryptjs
3. Access token generated and returned
4. Refresh token stored in database
5. Tokens returned to client
```

### Token Refresh Flow

```
1. Client sends refresh token
2. Token validity and expiration checked
3. New access token generated
4. New refresh token optionally generated
5. Old tokens invalidated upon logout
```

### Security Features

- Passwords hashed with bcryptjs (10 rounds)
- Tokens signed with environment secrets
- Refresh tokens tracked in database for invalidation
- CORS whitelist for origin validation
- Cookie support for token storage

---

## Development

### Environment Variables

Create a `.env` file in the project root:

```env
# Server
PORT=8000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/moda_ecommerce?schema=public

# JWT Configuration
JWT_ACCESS_SECRET=your_access_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_ACCESS_EXPIRED=900000        # 15 minutes in milliseconds
JWT_REFRESH_EXPIRED=604800000    # 7 days in milliseconds

# CORS Configuration
CLIENT_URL=http://localhost:5173

# VNPay Payment Gateway
VNP_TMN_CODE=your_merchant_code
VNP_HASH_SECRET=your_hash_secret
VNP_URL=https://sandbox.vnpayment.vn/paygate/pay.html
VNP_RETURN_URL=http://localhost:3000/api/v1/payment/vnpay/return
```

### Code Style

The project uses ESLint and Prettier for code formatting:

```bash
# Check for linting issues
pnpm run lint

# Fix linting issues automatically
pnpm run lint:fix

# Check code formatting
pnpm run format

# Fix code formatting
pnpm run format:fix
```

### Type Safety

- strict TypeScript configuration enabled
- Path alias `@/` configured for imports
- Type definitions included for all major dependencies

---

## Scripts

| Script                    | Description                              |
| ------------------------- | ---------------------------------------- |
| `pnpm run dev`            | Start development server with hot reload |
| `pnpm run build`          | Build TypeScript to JavaScript           |
| `pnpm start`              | Run production build                     |
| `pnpm run lint`           | Check code quality with ESLint           |
| `pnpm run lint:fix`       | Fix linting issues automatically         |
| `pnpm run format`         | Check code formatting with Prettier      |
| `pnpm run format:fix`     | Fix code formatting automatically        |
| `pnpm run test`           | Run test suite                           |
| `pnpm run test:watch`     | Run tests in watch mode                  |
| `pnpm run migrate:dev`    | Create and apply database migrations     |
| `pnpm run migrate:reset`  | Reset database (development only)        |
| `pnpm run migrate:status` | Check migration status                   |
| `pnpm run generate`       | Generate Prisma Client                   |
| `pnpm run studio`         | Open Prisma Studio GUI                   |

---

## Code Quality

### Testing

The project uses Jest for unit and integration testing:

```bash
# Run all tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run test coverage
pnpm run test -- --coverage
```

### Linting

ESLint configuration enforces consistent code style:

- TypeScript strict mode
- Prettier integration
- No unused variables
- Proper error handling

### Git Hooks

(Can be implemented with husky for pre-commit hooks)

---

## Deployment

### Production Build

```bash
pnpm run build
pnpm start
```

### Docker (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build
EXPOSE 8000
CMD ["pnpm", "start"]
```

### Environment Considerations

- Set `NODE_ENV=production`
- Use strong JWT secrets
- Configure HTTPS/SSL
- Set proper CORS origins
- Use managed PostgreSQL (e.g., AWS RDS, PlanetScale)
- Configure logging and monitoring

---

## Contributing

### Development Workflow

1. Create a feature branch
2. Make changes following code style guidelines
3. Run linting and tests
4. Create a pull request

### Code Guidelines

- Use TypeScript for all code
- Follow the established module structure
- Add validation schemas for all inputs
- Include proper error handling
- Write tests for critical features
- Update README for API changes

---

## Future Enhancements

- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search and filtering
- [ ] Product recommendations (ML-based)
- [ ] Email notifications
- [ ] Admin dashboard API endpoints
- [ ] Analytics and reporting
- [ ] Caching layer (Redis)
- [ ] WebSocket for real-time updates
- [ ] API rate limiting
- [ ] Request logging and monitoring
- [ ] File upload service (S3/Cloudinary)
- [ ] PWA support endpoints

---

## Troubleshooting

### Database Connection Issues

```bash
# Check connection string
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Prisma Client Issues

```bash
# Regenerate Prisma Client
pnpm run generate

# Clear cache
rm -rf node_modules/.prisma
pnpm install
```

### Port Already in Use

```bash
# Change PORT in .env or use:
PORT=3001 pnpm run dev
```

---

## License

ISC

---

## Support

For issues, questions, or suggestions, please open an issue in the repository.
