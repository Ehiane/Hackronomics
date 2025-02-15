<img src="https://github.com/user-attachments/assets/b2730215-cc6c-4f4a-a7ee-fee730a6e950" alt="Hackronomics Logo" width="300" height="300">

# Hackronomics
An AI-driven finance tracking web app that helps users monitor expenses, manage budgets, and discover cost-effective alternatives using AI recommendations. This project was built as part of the CrimsonCode Hackathon, aligning with the theme "Art in Innovation" by incorporating data visualization as digital art to represent spending habits.


##  Functional & Non-Functional Requirements for Hackronomics

### Functional Requirements

| **ID**   | **Requirement**                      | **Description** |
|----------|--------------------------------------|---------------|
| **FR-1** | AI-Powered Savings Suggestions      | AI analyzes transaction data to suggest cost-saving alternatives. |
| **FR-2** | Save Points System                  | Users earn "Save Points" based on how much they save each week. |
| **FR-3** | Custom Savings Strategy             | Users create flexible, personalized savings plans. |
| **FR-4** | Avatar Customization                | Users spend Save Points to unlock and customize their avatar. |
| **FR-5** | Add-On Features                     | Users can unlock additional features to use their avatar with other users by saving more over time. |
| **FR-6** | Engaging UI                         | The app provides an interactive and visually appealing experience. |
| **FR-7** | Predictable Infrastructure          | The app scales efficiently to accommodate more users. |
| **FR-8** | Discounts for Extra Savings         | If a user exceeds their weekly savings goal, they receive discounts in the marketplace. |


### Non-Functional Requirements

| **ID**   | **Requirement**                   | **Description** |
|----------|-----------------------------------|---------------|
| **NFR-1** | Scalability                     | The system should handle a growing number of users efficiently. |
| **NFR-2** | Performance                     | The app should provide quick responses and smooth animations. |
| **NFR-3** | Security                        | User data and transactions should be securely stored using encryption. |
| **NFR-4** | Maintainability                 | The codebase should be modular and easy to extend. |
| **NFR-5** | Availability                    | The app should have **99.9% uptime** and function across devices. |
| **NFR-6** | User Experience                 | The interface should be intuitive and engaging, keeping users motivated to save. |
| **NFR-7** | AI Fairness & Transparency      | AI recommendations should be clear, explainable, and free of bias. |

## Updated Tech Stack for Hackronomics

### Core Technologies

| **Category**       | **Technology** | **Why We Chose It?** |
|--------------------|---------------|----------------------|
| **Frontend**       | **React (TypeScript)** | Fast, scalable UI with interactive gamification. |
| **Styling**        | **Tailwind CSS** | Clean and modern UI for finance tracking. |
| **Backend**        | **Node.js, Express.js** | Handles user transactions & AI processing. |
| **Database**       | **MongoDB Atlas** | Cloud-hosted, flexible NoSQL for finance tracking. |
| **Authentication** | **Auth0** | Secure login & seamless authentication with social login options. |
| **Caching**        | **Redis** | Speeds up AI-generated recommendations and optimizes performance. |
| **AI & ML**        | **Cloudflare Workers AI + OpenAI API / Google Gemini** | Generates personalized savings plans and AI-driven budget advice. |
| **Hosting & Domain** | **Vercel + .Tech domain** | Fast deployment with a branded domain name. |
| **Security & Performance** | **Cloudflare CDN** | Enhances app speed, protects API requests, and prevents bot abuse. |
