# TodoList App

## Installation

1. **Install Dependencies:**
   ```
   npm install
   ```

2. **Create .env file:**
Create a file named .env in the root of your project and add the following variables:
    ```
    PORT=your_PORT
    MONGO_URL=your_URL
    NODE_ENV=development
    PRIVATE_KEY=your_PRIVATE_KEY
    ```

3. **Import Dummy Data:**
Run the following command to insert dummy data into the todo and user collections:
    ```
    npm run data:import
    ```
    
## Usage
Use a tool like Postman to interact with the API endpoints. Start the server and begin testing your endpoints.

## Scripts
1. Run the server: 
```
npm run server 
```

2. Insert dummy data:
```
npm run data:import
```

3. Delete dummy data:
```
npm run data:destroy
```