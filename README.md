# LiveQ

LiveQ is a real-time feedback Chrome extension designed to enhance classroom interactions by allowing teachers to create questions and receive live feedback from students. The application supports multiple question types, real-time visualizations, and a gamified student experience.

---

## Features

- Real-time feedback for classroom engagement.
- Support for multiple-choice, short-answer, and yes/no questions.
- Instant visualization of student responses.
- Easy-to-use interface for both teachers and students.
- Gamification to encourage participation.

---

## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your system. You can download it from the [Node.js Official Website](https://nodejs.org).
- **npm**: npm (Node Package Manager) comes with Node.js. You'll use it to install dependencies.

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/liveq.git
   cd liveq

2. **Install Dependencies**:
Run the following command in the project directory to install the required dependencies:

   ```bash
    npm install

3. **Run the Application Locally**:
To run the application in development mode:

    ```bash
      npm start
    
Open your browser and navigate to http://localhost:3000.


## Building and Launching as a Chrome Extension

### Steps to Build

1. **Build the Project**:
Create a production build of the application:

    ```bash
    npm run build

This command generates a build directory containing the optimized static files.

2. **Prepare the Build for Chrome**:
Open the build folder.
Ensure that the manifest.json file is configured correctly for Chrome extensions. A sample manifest might look like this:

    ```bash
    {
    "manifest_version": 3,
    "name": "LiveQ",
    "version": "1.0",
    "description": "Real-time classroom feedback tool.",
    "action": {
      "default_popup": "index.html"
    },
    "permissions": ["storage"],
    "host_permissions": ["*://*/*"]
    }

### Steps to Launch

1. **Load the Extension**:
- Open Chrome and navigate to chrome://extensions/.
- Enable Developer Mode in the top-right corner.
- Click Load Unpacked.
- Select the build directory generated in the previous step.

2. **Launch the Extension**:
The extension will now appear in your Chrome toolbar.
Click on it to open the LiveQ application.

## License

This project is licensed under the MIT License. See the LICENSE file for details.


















