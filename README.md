# Quran

## Description

This Quran is a client-side application built with Next.js, Shadcn UI components, and Tailwind CSS. It offers a secure and efficient way to manage your daily tasks. Here's how it works:

1. **Password Protection**: Upon first use, you'll be prompted to set a password. This password is stored locally and required for subsequent logins, ensuring your todos remain private.

2. **Todo Management**: Once logged in, you can create, view, update, and delete your todos. The app provides a clean interface for adding new tasks and displaying your existing ones.

3. **Data Persistence**: All todos are stored in the browser's local storage, allowing your data to persist between sessions without the need for a server.

4. **Edit and Delete**: Each todo can be edited or deleted. A confirmation dialog appears before deletion to prevent accidental removals.

5. **Duplicate Prevention**: The app checks for duplicate todos, preventing you from adding the same task twice.

6. **Responsive Design**: Built with Tailwind CSS, the app is fully responsive and works well on both desktop and mobile devices.

7. **Offline Functionality**: As a client-side app, it works offline once loaded, allowing you to manage your todos without an internet connection.

This open-source project is designed to be simple yet functional, making it an excellent starting point for developers looking to understand React hooks, local storage interactions, and state management in a Next.js application.

## Table of Contents

- [Quran](#todo-app)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Installation

How to clone this project and get development ready.

```bash
# Clone the repository
git clone https://github.com/ahmedhussainmv/todo-app.git

# Navigate to the project directory
cd todo-app

# Install dependencies
npm install
```

## Usage

Below are the commands to get started.

```bash
# Run the development server
npm run dev

# Build for production
npm run build

# Start the production server
npm start
```

## Features

The key features of this app include:

- Password protection for privacy
- Create, read, update, and delete (CRUD) operations for todos
- Delete confirmation to prevent accidental deletions
- Error handling and toast messages for user feedback
- Duplicate check to prevent redundant todos
- Responsive design for various screen sizes
- Offline functionality
- Local storage for data persistence

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Ahmed Hussain - [@ahmedhussainmv](https://twitter.com/ahmedhussainmv) - ahmdhssn@gmail.com

Project Link: [https://github.com/ahmedhussainmv/todo-app](https://github.com/ahmedhussainmv/todo-app)