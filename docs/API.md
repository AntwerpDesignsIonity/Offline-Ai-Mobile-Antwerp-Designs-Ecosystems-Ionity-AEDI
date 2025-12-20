# API Documentation

## Overview

The Offline AI Mobile AEDI application provides a RESTful API for managing AI models and controlling offline mode. All endpoints return JSON responses.

**Base URL**: `http://localhost:3000`

## Authentication

Currently, no authentication is required. Future versions may implement authentication for production deployments.

## API Endpoints

### 1. Get Application Status

Retrieve the current status of the application including offline mode state and model count.

**Endpoint**: `GET /api/status`

**Response**:
```json
{
  "offlineMode": true,
  "modelCount": 3,
  "models": [
    {
      "name": "model1.blob",
      "path": "/path/to/model1.blob",
      "size": 1048576,
      "modified": "2025-12-20T10:30:00.000Z"
    }
  ]
}
```

**Response Fields**:
- `offlineMode` (boolean): Current offline mode state
- `modelCount` (number): Number of loaded models
- `models` (array): Array of model objects with metadata

**Example**:
```bash
curl http://localhost:3000/api/status
```

---

### 2. Toggle Offline Mode

Enable or disable offline mode for the application.

**Endpoint**: `POST /api/offline`

**Request Body**:
```json
{
  "enabled": true
}
```

**Request Fields**:
- `enabled` (boolean): `true` to enable offline mode, `false` to disable

**Response**:
```json
{
  "success": true,
  "offlineMode": true
}
```

**Response Fields**:
- `success` (boolean): Operation success status
- `offlineMode` (boolean): New offline mode state

**Example**:
```bash
curl -X POST http://localhost:3000/api/offline \
  -H "Content-Type: application/json" \
  -d '{"enabled": true}'
```

---

### 3. Update Models from Blob Files

Scan the configured blob directory and load available model files.

**Endpoint**: `GET /api/models/update`

**Query Parameters**:
- `project` (string, optional): Project name for path resolution. Default: "Default"

**Response** (Success):
```json
{
  "success": true,
  "project": "MyProject",
  "count": 2,
  "models": [
    {
      "name": "model1.blob",
      "path": "/United Programs/AntwerpDesigns/JWVA/Ionity/2025+/gitcat/Projects/MyProject/Install/files/models/blobs/model1.blob",
      "size": 2097152,
      "modified": "2025-12-20T12:00:00.000Z"
    },
    {
      "name": "model2.bin",
      "path": "/United Programs/AntwerpDesigns/JWVA/Ionity/2025+/gitcat/Projects/MyProject/Install/files/models/blobs/model2.bin",
      "size": 4194304,
      "modified": "2025-12-20T11:30:00.000Z"
    }
  ]
}
```

**Response** (Error):
```json
{
  "success": false,
  "error": "Error message description"
}
```

**Response Fields**:
- `success` (boolean): Operation success status
- `project` (string): Project name used
- `count` (number): Number of models found
- `models` (array): Array of model objects
- `error` (string): Error message (only on failure)

**Example**:
```bash
curl "http://localhost:3000/api/models/update?project=MyAIProject"
```

---

### 4. Get All Loaded Models

Retrieve all currently loaded models.

**Endpoint**: `GET /api/models`

**Response**:
```json
{
  "success": true,
  "count": 2,
  "models": [
    {
      "name": "model1.blob",
      "path": "/path/to/model1.blob",
      "size": 1048576,
      "modified": "2025-12-20T10:30:00.000Z"
    }
  ]
}
```

**Response Fields**:
- `success` (boolean): Always `true` for this endpoint
- `count` (number): Number of loaded models
- `models` (array): Array of model objects

**Example**:
```bash
curl http://localhost:3000/api/models
```

---

### 5. Get Application Configuration

Retrieve the current application configuration.

**Endpoint**: `GET /api/config`

**Response**:
```json
{
  "success": true,
  "config": {
    "appName": "Offline AI Mobile AEDI",
    "version": "1.0.1",
    "installDirectories": {
      "primary": "/United Programs/AntwerpDesigns/JWVA/Ionity/2025+/gitcat/Projects/",
      "secondary": "/Programs/AntwerpDesigns/JWVA/Ionity/2025+/gitcat/Projects/",
      "installSubpath": "Install/files"
    },
    "modelSettings": {
      "blobFileFolder": "models/blobs",
      "updateInterval": 3600000,
      "offlineMode": true
    },
    "ui": {
      "enableOfflineButton": true,
      "defaultOfflineState": false
    }
  }
}
```

**Response Fields**:
- `success` (boolean): Always `true` for this endpoint
- `config` (object): Application configuration object

**Example**:
```bash
curl http://localhost:3000/api/config
```

---

## Model Object Structure

Each model object in the API responses contains:

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Filename of the model |
| `path` | string | Full filesystem path to the model file |
| `size` | number | File size in bytes |
| `modified` | string | Last modification date (ISO 8601 format) |

## Error Handling

### HTTP Status Codes

- `200 OK`: Successful request
- `500 Internal Server Error`: Server error (e.g., file system error)

### Error Response Format

```json
{
  "success": false,
  "error": "Detailed error message"
}
```

## Rate Limiting

Currently, no rate limiting is implemented. Future versions may add rate limiting for production use.

## CORS

CORS is not currently configured. If accessing from a different origin, you may need to configure CORS headers.

## Content Type

All API endpoints accept and return `application/json` content type.

**Request Headers**:
```
Content-Type: application/json
```

**Response Headers**:
```
Content-Type: application/json; charset=utf-8
```

## Examples

### JavaScript (Fetch API)

```javascript
// Get status
fetch('http://localhost:3000/api/status')
  .then(response => response.json())
  .then(data => console.log(data));

// Toggle offline mode
fetch('http://localhost:3000/api/offline', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ enabled: true })
})
  .then(response => response.json())
  .then(data => console.log(data));

// Update models
fetch('http://localhost:3000/api/models/update?project=MyProject')
  .then(response => response.json())
  .then(data => console.log(data));
```

### Python (requests)

```python
import requests

# Get status
response = requests.get('http://localhost:3000/api/status')
print(response.json())

# Toggle offline mode
response = requests.post(
    'http://localhost:3000/api/offline',
    json={'enabled': True}
)
print(response.json())

# Update models
response = requests.get(
    'http://localhost:3000/api/models/update',
    params={'project': 'MyProject'}
)
print(response.json())
```

### cURL

```bash
# Get status
curl http://localhost:3000/api/status

# Toggle offline mode
curl -X POST http://localhost:3000/api/offline \
  -H "Content-Type: application/json" \
  -d '{"enabled": true}'

# Update models
curl "http://localhost:3000/api/models/update?project=MyProject"

# Get all models
curl http://localhost:3000/api/models

# Get configuration
curl http://localhost:3000/api/config
```

## Versioning

Current API version: **1.0.1**

The API currently does not use versioning in the URL. Future versions may implement `/api/v1/` style versioning.

## Support

For API-related questions or issues:
- Check this documentation
- Review the source code in `index.js`
- Open an issue on GitHub

---

**Last Updated**: 2025-12-20  
**Version**: 1.0.1
