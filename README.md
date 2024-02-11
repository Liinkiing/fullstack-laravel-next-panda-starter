# Fullstack Application Template

This repository serves as a template for creating a fullstack web application using **Next.js** for the frontend and **Laravel** for the backend. 

It also incorporates **GraphQL** on the server side, powered by the **Lighthouse** package. 

Additionally, the backend includes boilerplate code for implementing an authorization system using **Laravel Socialite**. 

On the frontend, **Panda CSS** with the default theme is used as the foundation for a clean and customizable design. **Apollo Client** is used for handling GraphQL on the frontend, and strongly typed GraphQL operations are generated using graphql-codegen.

## Technologies Used

### Frontend
- **Next.js:** A popular React framework for building efficient and SEO-friendly web applications.
- **Panda CSS:** A lightweight and minimal CSS framework that provides a set of styles and components to help you build your application's user interface.
- **Storybook:** A tool for developing UI components in isolation, making it easier to build and test UI components independently.
- **Apollo Client:** A powerful GraphQL client for React applications.

### Backend
- **Laravel:** A powerful PHP framework known for its elegant syntax and robust features for building web applications.
- **Lighthouse:** A GraphQL server package for Laravel that simplifies the implementation of GraphQL APIs.
- **Laravel Socialite:** A Laravel package for easy integration with social authentication providers, helping you set up user authentication quickly.

## Project Structure

The project is structured into two main directories:

### `/frontend`
Contains the Next.js frontend application code. You can build and customize the client-side of your application here. Apollo Client is already configured to work with the GraphQL API, and strongly typed GraphQL operations are generated using graphql-codegen. Storybook is set up for developing and testing UI components.

### `/backend`
Contains the Laravel backend application code, which includes GraphQL API endpoints, database configurations, and the boilerplate for user authentication using Laravel Socialite.

## Getting Started

To use this template to kickstart your fullstack application, follow these steps:

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/Liinkiing/fullstack-laravel-next-starter.git
    ```

2. Navigate to the `/frontend` and `/backend` directories and follow their respective setup instructions, which are detailed in their respective README files.

3. Customize the frontend and backend components to fit the specific requirements of your application.

4. Configure your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` environment variables in the `.env` file in the `/backend` directory. These are required for the social authentication feature to work.
   
5. Utilize Storybook for developing and testing UI components independently.

6. Deploy your application as needed, considering both the frontend and backend deployment options separately.
