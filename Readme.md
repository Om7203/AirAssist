Step 1: Extract the ZIP File

Download the ZIP file containing the backend files.
Locate the downloaded ZIP file on your computer.
Right-click on the ZIP file and select "Extract All" or use a suitable unzipping software to extract the contents.
Choose a destination folder to extract the files to.

Step 2: Open Command Line Interface (CLI)

Open the Command Line Interface (CLI) or Terminal on your computer:
On Windows: Press the Windows key, type "Command Prompt" or "CMD," and press Enter.
On macOS: Press Command + Space to open Spotlight, type "Terminal," and press Enter.
On Linux: Press Ctrl + Alt + T to open the Terminal.

Step 3: Navigate to the Backend and Frontend File Location

In the CLI, navigate to the location where you extracted the backend files. 

For example, if the extracted files are in a folder named "Air_Assist_Project" on your desktop,
Use the command: 
cd Desktop/Air_Assist_Project/backend

In the CLI, navigate to the location where you extracted the frontend files. 

For example, if the extracted files are in a folder named "Air_Assist_Project" on your desktop,
Use the command: 
cd Desktop/Air_Assist_Project/frontend

Step 4: Install Dependencies

Before running the backend server, you need to install any required dependencies. In the CLI, while in the backend file location, run the following command to install the dependencies specified in the package.json file:

>>> npm install

Before running the frontend, you need to install any required dependencies. In the CLI, while in the frontend file location, run the following command to install the dependencies specified in the package.json file:

>>> npm install


Step 5: Run the Backend Server

Once the dependencies are installed, run the following command to start the backend server:

>>> node index.js

The app should be up and running on "http://localhost:5000"
Keep the CLI window open while the backend server is running.

Step 6: Run the Frontend Server

Once the dependencies are installed, run the following command to start the frontend server:

>>> npm start

The frontend will start on the "http://localhost:3000"
To connect with the backend just to the "http://localhost:5000"


Just click on the Flight icon bot in the bottom right corner and you can start interacting with the Bot by just typing Hi and you are ready to go.

In bot details:

When the user fails to enter the correct input five times and bot gives the message of bot restarted and if again user fails to understand what bot tries to ask the user to enter the bot disconnects itself and you have to restart the server.