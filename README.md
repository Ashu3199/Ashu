Contact Consolidation Service:

A Node.js and Express.js-based web service designed to consolidate and manage user contact information efficiently. The service links multiple contacts across different email addresses and phone numbers to a single individual, ensuring seamless data management and personalization.

Features:

Identify and consolidate user contacts.

Handle edge cases like overlapping or missing contact details.

Efficiently manage primary and secondary contact relationships.

Error handling system for robust and secure operations.

How to Run the Project Locally

1. Clone the Repository

git clone <repository_url>
cd <repository_folder>

2. Install Dependencies

Run the following command to install all the necessary dependencies:

npm i

3. Start the Server

Use the command below to start the development server:

npm run dev

The server will run on http://localhost:3000/.

4. Install Thunder Client Extension

Open your Visual Studio Code.

Go to Extensions (Ctrl+Shift+X).

Search for Thunder Client and install it.

5. Test the /identify Endpoint

Open Thunder Client in Visual Studio Code.

Create a new request.

Set the method to POST.

Use the following API URL:

http://localhost:3000/user/identify

6. Send Data to the Body

In the request body, send the data in JSON format as follows:

{
   "email": "Your mail id",
   "phoneNumber": "Your mobile number"
}

7. View Data in MongoDB

Visit the MongoDB URL:

mongodb+srv://sanu3199netflix:23p9pjTqRmNTfNZ5@clustermongo0.6lcq3.mongodb.net        Or       mongodb://localhost:27017/<"Your database name"> -->> Used in local only

Login using your credentials.

Navigate to the database and verify the data entries.

Technologies Used

Node.js: Enviorment.

Express.js: Backend framework.

MongoDB: NoSQL database for contact storage.

Thunder Client: For API testing.

Contact

For any queries or support, please contact [Ashutosh Kumar/sanu3199kumar@gmail.com].

