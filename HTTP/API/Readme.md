# API which contains product items

> create **db.json** file in the same dir as **app.js** file and add the following in the db.json

```
{
  "products":[]
}
```

> Start the server: **node app.js**

## What this API has

```javascript
products = [
  {
    id: 1,
    name: productName,
    description: productDescription,
    price: productPrice,
  },
];
```

# API Routes

## GET: all products

```
url = http://localhost:8080/api/products
```

### response sample

```javascript
[
  {
    id: 1,
    name: "Iphone",
    category: "Electronics",
    description: "This is new Iphone 15.",
    price: 999,
  },
  {
    id: 2,
    name: "Tshirt",
    category: "Clothing",
    description: "New summer tshirt.",
    price: 20,
  },
  {
    id: 3,
    name: "bag",
    description: "waterproff bag",
    price: 15,
    category: "accessories",
  },
  {
    id: 4,
    name: "mobile",
    description: "This is redmi note 9 pro",
    price: 200,
    category: "electronics and appliances",
  },
];
```

## POST: add new product

```
url = http://localhost:8080/api/products
```

Expected body json: **name** , **description**, **price** ,**category**

### Response after success fetch products

```javascript
{
    "message": "New product added in the list.",
    "product": {
        "name": "mobile",
        "description": "This is redmi note 9 pro",
        "price": 200,
        "category": "electronics and appliances"
    }
}
```

## PATCH: update a single product

```

url = http://localhost:8080/api/products

```

Expected body json: **id** and necessary update field **name**, **description**, **price** , **category**

### Response after successful product update

```javascript
{
    "message": "Product updated successfully.",
    "product": {
        "id": 3,
        "name": "bag",
        "description": "waterproff bag",
        "price": 15,
        "category": "accessories"
    }
}
```

## DELETE: delete a product

```

url = http://localhost:8080/api/products

```

Expected body json: **id** for which item to delete

### Response after successful deletion

```javascript
{
    "message": "Item deleted successfully",
    "removedProduct": [
        {
            "id": 5,
            "name": "mobile",
            "description": "This is redmi note 9 pro",
            "price": 200,
            "category": "electronics and appliances"
        }
    ]
}
```
