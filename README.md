# 📖 API Data Placement: Query vs Body vs Params

Confused about *where to send/validate data* in an API? This guide lays out the core rules simply.  

---

## 🧩 The Cast of Characters

- **Route Params** (`/users/:id`)  
  Embedded in the path. Identify a **resource**.  
  - Example: `/users/123`  

- **Query Params** (`?key=value`)  
  Appear in the URL after `?`. Strings by default.  
  Best for **filters, search, sorting, pagination, flags**.  
  - Example: `/products?category=books&page=2`  

- **Body** (JSON, form-data, etc.)  
  Where **complex or bulk data** is sent.  
  Best for **creating or updating resources**.  
  - Example:  
    ```json
    {
      "name": "Alice",
      "email": "alice@example.com"
    }
    ```

- **Headers**  
  Transport meta-data (auth tokens, content type, language).  
  - Example: `Authorization: Bearer eyJ...`  

---

## ⚡ Choosing by HTTP Verb

### `GET`
- **Purpose**: Fetch information.  
- **Where to pass inputs**: Query params.  
- ✅ Example:  
  ```
  GET /products?category=books&sort=price-asc&page=2
  ```

---

### `POST`
- **Purpose**: Create new resources.  
- **Where to pass inputs**: Body (main data). Query only for optional flags.  
- ✅ Example:  
  ```
  POST /users?notifyUser=true
  Body:
  {
    "name": "Alice",
    "email": "alice@example.com"
  }
  ```

---

### `PUT / PATCH`
- **Purpose**: Update an existing resource.  
- **Where to pass inputs**:  
  - Resource ID → Route param (`/users/123`).  
  - Update fields → Body.  
- ✅ Example:  
  ```
  PATCH /users/123
  Body:
  {
    "email": "new@example.com"
  }
  ```

---

### `DELETE`
- **Purpose**: Delete a resource.  
- **Where to pass inputs**: Route param identifies the thing to delete. Query can control deletion mode.  
- ✅ Example:  
  ```
  DELETE /users/123?soft=true
  ```

---

## 🏠 Analogy (Easy Memory Trick)

- **Route param** → the **house address** (`/users/123`).  
- **Query params** → special **instructions for the mailman** (`?floor=2&sort=name`).  
- **Body** → the **package being delivered** (actual data).  
- **Headers** → the **envelope meta-information** (priority, auth, format).  

---

## ✅ Summary Rules

- **Route Params** → *Identify the resource* (e.g., `:id`).  
- **Query Params** → *Filter, paginate, sort, or tweak request behavior*.  
- **Body** → *Pass resource data itself (create/update)*.  
- **Headers** → *Carry meta-information (auth, content type, locale)*.  

> 👉 If you’re **describing a Resource**, put it in the URL.  
> 👉 If you’re **controlling how to fetch a Resource**, use the Query string.  
> 👉 If you’re **sending or updating the Resource’s data**, use the Body.  

---

## 🛠 Validation Example (Express + express-validator)

```ts
import { body, param, query } from 'express-validator';

app.get('/products',
  [
    query('category').isString().optional(),
    query('page').isInt({ min: 1 }).optional(),
  ],
  (req, res) => {
    // handle request
  }
);

app.post('/users',
  [
    body('name').isString().notEmpty(),
    body('email').isEmail(),
    query('notifyUser').isBoolean().optional()
  ],
  (req, res) => {
    // create user
  }
);

app.patch('/users/:id',
  [
    param('id').isInt(),
    body('email').isEmail().optional()
  ],
  (req, res) => {
    // update user
  }
);
```

---

⚡ With this breakdown, you can always decide:
- **Query → filters/options**
- **Body → payload of the resource**
- **Param → resource identity**
- **Header → meta-info**

---

Would you like me to also build a **visual diagram in Markdown (ASCII-style)** showing request vs route params vs query vs body flows, so it sticks like a mental picture?
