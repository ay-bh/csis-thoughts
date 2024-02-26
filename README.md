# 🤖 Thoughts

**csis-thoughts** is a wisdom-sharing platform designed specifically for the graduating batch of seniors and alumni of Department of Computer Science & Information Systems - BITS Pilani, Goa. It offers a unique space for individuals to share their final messages, reflections, and thoughts about their college journey, fostering a community of support and insight.

## ⚙️ Tech Stack

- **Next.js:** For building a server-side rendered React application.
- **MongoDB:** A NoSQL database for storing user messages and profiles.
- **NextAuth:** For secure Google authentication.
- **TailwindCSS:** For styling with modern design principles.

## 🔋 Features

- 💌 **Read and Share Messages:** Enables seniors to share their college experiences.
- ✍️ **Edit and Delete Posts:** Offers flexibility to manage posts.
- 🧑‍🤝‍🧑 **Profile Pages:** Showcases individual messages through dedicated profile pages.
- 🔍 **Explore Profiles:** Discover and connect by viewing the posts of others.
- 🕵️ **Anonymous Posting:** Protects user identity while allowing post management.
- 📋 **Copy to Clipboard:** Simplifies sharing with easy copy functionality.
- 🔒 **Secure Authentication:** Utilises NextAuth with a whitelist for reliable Google login.

## 🤸 Quick Start

Get up and running with **csis-thoughts** in just a few steps!

### Prerequisites

Ensure you have these installed:
- Git
- Node.js
- npm (Node Package Manager)

### Cloning the Repository

```bash
git clone https://github.com/ay-bh/csis-thoughts.git
cd csis-thoughts
```

### Installation

Install the necessary dependencies:

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the project root with the following:

```plaintext
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
GOOGLE_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_client_secret
MONGODB_URI=your_mongodb_uri
```

Replace placeholders with your actual credentials, obtainable from Google Cloud Console, your Auth provider, and MongoDB.

### Running the Project

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser to explore **csis-thoughts**.
