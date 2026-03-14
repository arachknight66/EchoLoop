# EchoLoop

EchoLoop is a mental wellness web application designed to support users in their journey towards better mental health. The application includes features for journaling, drawing, sleep awareness, ambient sounds, and reflection insights.

## Features

- **Journaling**: Users can write journal entries, tag their mood, and save them to Firebase Firestore for future reflection.
- **Drawing**: A dedicated drawing page allows users to express themselves creatively through writing and drawing on an HTML5 canvas.
- **Sleep Awareness**: Users can track their sleep patterns and view an overview of their sleep schedule, along with ambient sounds to aid relaxation.
- **Ambient Sounds**: A collection of calming sounds is available for users to play, helping them to relax and focus.
- **Reflection Insights**: The application analyzes journal entries and provides insights into behavioral trends, helping users to reflect on their mental wellness journey.

## Technologies Used

- **Next.js**: A React framework for building server-rendered applications.
- **Tailwind CSS**: A utility-first CSS framework for styling the application.
- **Framer Motion**: A library for animations and transitions in React applications.
- **Firebase Firestore**: A cloud-hosted NoSQL database for storing user data securely.

## Getting Started

To get started with the EchoLoop application, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/arachknight66/EchoLoop.git
   cd EchoLoop
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Firebase**:
   - Create a Firebase project and configure Firestore.
   - Update the Firebase configuration in `src/lib/firebase.ts` with your project credentials.

4. **Run the application**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.