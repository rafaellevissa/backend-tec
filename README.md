# Knowledge Base API

A multi-tenant Knowledge Base API built with **NestJS**, **Sequelize**, and **TypeScript**.

This project allows tenants to manage knowledge articles with:
- aliases
- topics
- duplicate detection
- filtering and search

---

## Features

- Multi-tenant support
- CRUD for:
  - Tenants
  - Knowledge Articles
  - Topics
- Article aliases
- Many-to-many relationship between articles and topics
- Duplicate article detection (event-driven)
- Filters:
  - by title or alias
  - by tenant
  - by published year
- Database transactions
- Ready-to-use Postman collection

---

## Tech Stack

- **Node.js (>=18)**
- **NestJS**
- **TypeScript**
- **MySQL**

---

## Database ER Diagram


![ER Diagram](./docs/er.png)

---

## Environment Variables

Create a `.env` file at the root of the project:

```
cp .env.example .env
```

---

## Running the Project with Docker Compose

This project can be fully started using **Docker Compose**, including the API and the database.

---

### Start the Application

From the project root, run:

```
docker compose up --build
```


The API will be available at:

```
http://localhost:3000
```

---

## API Usage (Postman)

A **Postman Collection** is provided so you can easily test all endpoints.

### How to use:

1. Open Postman
2. Click **Import**
3. Import the collection file:

   ```
   docs/knowledge-base-api.postman_collection.json
   ```
4. Set the base URL variable:

   ```
   http://localhost:3000
   ```

---

#### Filters

```
GET /knowledge-articles?search=devops&tenantId=1&publishedYear=2024
```

* `search`: title or alias
* `tenantId`: tenant filter
* `publishedYear`: year filter

---

## 🚨 Duplicate Detection

When a new knowledge article is created:

* If another article of the same tenant has:

  * the same title, or
  * an alias matching the new title
* A `duplicate_article_warning` event is emitted

This event is consumed and logged for further analysis.
