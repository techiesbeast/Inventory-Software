
# Super Fresh Store – Inventory Management System

This is a React and Google Sheets-based inventory management system. Follow these steps to get it up and running.

## Step 1: Set Up Your Google Sheet

Your Google Sheet will act as the database for this application.

1.  **Create a new Google Sheet.**
2.  **Create the following tabs (sheets) at the bottom.** The names must be exact and in lowercase:
    *   `customers`
    *   `vendors`
    *   `products`
    *   `sales`
    *   `purchases`
3.  **Add the correct headers to the first row of each sheet.** The headers are case-sensitive and must match the data properties.

    *   **`customers` sheet headers:**
        `id`, `name`, `email`, `phone`, `joinDate`

    *   **`vendors` sheet headers:**
        `id`, `name`, `contactPerson`, `email`, `phone`

    *   **`products` sheet headers:**
        `id`, `name`, `sku`, `category`, `price`, `stockQuantity`, `reorderLevel`, `vendorId`

    *   **`sales` sheet headers:**
        `id`, `productId`, `customerId`, `quantity`, `totalPrice`, `date`

    *   **`purchases` sheet headers:**
        `id`, `productId`, `vendorId`, `quantity`, `purchasePrice`, `date`

You can leave the sheets empty or add some sample data under the headers.

## Step 2: Deploy the Google Apps Script Backend

The Google Apps Script will act as the API that connects your React application to your Google Sheet.

1.  Open the Google Sheet you just created.
2.  Navigate to **Extensions > Apps Script**.
3.  A new browser tab will open with the Apps Script editor. Delete any existing code in the `Code.gs` file.
4.  Copy the entire content of `backend/Code.gs` from this project and paste it into the Apps Script editor.
5.  Click the **Save project** icon (floppy disk).
6.  Click the **Deploy** button in the top right, then select **New deployment**.
7.  In the deployment configuration window:
    *   Click the gear icon next to "Select type" and choose **Web app**.
    *   **Description:** Give it a name, like `Inventory API v1`.
    *   **Execute as:** Select **Me**.
    *   **Who has access:** Select **Anyone**.
        *   _Note: This makes your API publicly accessible. For a real-world application, you would implement more robust security and authentication._
8.  Click **Deploy**.
9.  Google will ask you to authorize the script. Click **Authorize access** and follow the prompts to allow the script to manage your spreadsheets. You may see a "Google hasn't verified this app" warning. Click **Advanced**, then **Go to (your project name) (unsafe)**.
10. After authorization, you will see a **Deployment successfully updated** dialog. Copy the **Web app URL**. This is your API endpoint.

## Step 3: Configure the React Frontend

1.  Open the `constants.ts` file in your React project.
2.  Find the following line:
    ```typescript
    export const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
    ```
3.  Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with the Web app URL you copied in the previous step.
4.  Save the file.

Your React application is now connected to your Google Sheet! When you run the app, it will fetch data from and send data to your sheet via the Apps Script API.

### Redeploying the Script

If you ever make changes to the `Code.gs` script, you must redeploy it for the changes to take effect.

1.  Click **Deploy** > **Manage deployments**.
2.  Select your active deployment and click the pencil (edit) icon.
3.  Choose **New version** from the "Version" dropdown.
4.  Click **Deploy**.
