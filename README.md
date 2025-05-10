<img src="https://github.com/user-attachments/assets/b2730215-cc6c-4f4a-a7ee-fee730a6e950" alt="Hackronomics Logo" width="300" height="300">


# Hackronomics
An award-winning AI-driven finance tracking web app that helps users monitor expenses, manage budgets, and discover cost-effective alternatives using AI recommendations. This project was built as part of the CrimsonCode Hackathon, aligning with the theme "Art in Innovation" by incorporating data visualization as digital art to represent spending habits.

## Award Acceptance 
![image](https://github.com/user-attachments/assets/12ceee38-e2aa-4cc6-8a1a-a2224156ea4f)

##  Explanation video
https://github.com/user-attachments/assets/14b9bc74-91f9-4afe-94c9-17650b45b11b

## Frontend Demo
https://github.com/user-attachments/assets/c79f2391-b7bf-4e70-af99-eaea539b0a7e


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

## Tech Stack for Hackronomics

### Core Technologies

| **Category**          | **Technologies & Tools** | **Assigned To** |
|----------------------|-------------------------|----------------|
| **AI & Machine Learning** | - **Cloudflare** (AI/ML services)  <br> - **OpenAI API** (AI-powered budget insights)  <br> - **Google Maps API** (Location-based spending suggestions) | [**Ehiane**](https://github.com/Ehiane) & [**Will**](https://github.com/kiwisurgen) |
| **Frontend (FE)** | - **React (TypeScript)**  <br> - **CSS / Bootstrap** | [**Osaze**](https://github.com/Ogieriakhi17) |
| **Backend (BE)** | - **Node.js, Express.js** (API & server logic) | [**Ehiane**](https://github.com/ehiane) & [**Will**](https://github.com/kiwisurgen) |
| **Database & Authentication** | - **MongoDB** (Transaction & user data) <br> - **Auth0** (User authentication & security) | [**Bruno**](https://github.com/BruSalSprouts) |
| **Security** | - **Cloudflare CDN** (DDoS protection & performance) | [**All of Us**](https://github.com/Ehiane/Hackronomics/tree/main) |
| **Hosting & Deployment** | - **Vercel + Tech domain** (Frontend hosting) | [**Osaze**](https://github.com/Ogieriakhi17) |


# Database Schema - Hackanomics

The following is the **database schema** for **Hackanomics**, built using **MongoDB Atlas**.

## **User Collection**
| **Field**          | **Type**  | **Description** |
|--------------------|----------|---------------|
| `userID`          | String   | Unique identifier for the user |
| `name`            | String   | User's full name |
| `email`           | String   | User's email address |
| `DOB`             | Date     | User's date of birth |
| `primaryLocation` | String   | User's primary location or address |
| `zipcode`         | String   | User's ZIP code |
| `savingsPlan`     | Object   | User's active savings plan (embedded document) |
| `avatar`         | Object   | Stores the avatar’s customization details |
| `friendsList`     | Array    | List of user IDs representing friends |

---

## **Transactions Collection**
| **Field**         | **Type**  | **Description** |
|-------------------|----------|---------------|
| `transactionID`  | String   | Unique transaction identifier |
| `userID`         | String   | ID of the user making the transaction |
| `category`       | ENUM     | Type of transaction (Food, Transport, Subscription, etc.) |
| `amountSpent`    | Number   | Amount spent on the transaction |
| `vendorDetails`  | Object   | Vendor name and address |

---

## **Avatar Collection**
| **Field**          | **Type**  | **Description** |
|--------------------|----------|---------------|
| `userID`          | String   | ID of the user who owns the avatar |
| `baseBody`        | String   | Default body shape/type |
| `clothingItems`   | Array    | List of clothing/accessories equipped |
| `face`           | String   | Custom face type |

---

## **Store Collection**
| **Field**         | **Type**  | **Description** |
|-------------------|----------|---------------|
| `itemID`         | String   | Unique identifier for the store item |
| `category`       | String   | Type of item (Clothing, Accessories, etc.) |
| `imageURL`       | String   | URL to the item's image |
| `price`          | Number   | Price in Save Points |

---

## **Savings Plan Collection**
| **Field**         | **Type**  | **Description** |
|-------------------|----------|---------------|
| `savingsPlanID`  | String   | Unique identifier for the savings plan |
| `userID`         | String   | ID of the user associated with the plan |
| `balance`        | Number   | Total saved amount |
| `transactions`   | Array    | List of related transaction IDs |
| `goalAmount`     | Number   | Target amount for the savings goal |
| `duration`       | String   | Length of time for savings (e.g., weekly, monthly) |
| `progress`       | Number   | Current progress toward the goal (%) |
| `remainingAmount` | Number   | Amount left to reach the goal |

---

## **Rewards Collection**
| **Field**         | **Type**  | **Description** |
|-------------------|----------|---------------|
| `rewardID`       | String   | Unique identifier for the reward |
| `userID`         | String   | ID of the user earning the reward |
| `rewardName`     | String   | Name of the reward (e.g., "10% Off Food") |
| `rewardType`     | ENUM     | Type of reward (Discount, Bonus Points, Special Item) |
| `redeemed`       | Boolean  | Whether the reward has been claimed |

---

## **Discounts Collection**
| **Field**         | **Type**  | **Description** |
|-------------------|----------|---------------|
| `discountID`     | String   | Unique identifier for the discount |
| `userID`         | String   | ID of the user who earned the discount |
| `discountPercentage` | Number | Discount percentage applied to the store |
| `expirationDate`  | Date     | Expiration date for the discount |
| `redeemed`       | Boolean  | Whether the discount has been used |

---

## **Notifications Collection**
| **Field**         | **Type**  | **Description** |
|-------------------|----------|---------------|
| `notificationID` | String   | Unique identifier for the notification |
| `userID`         | String   | ID of the user receiving the notification |
| `message`        | String   | Notification content |
| `readStatus`     | Boolean  | Whether the user has read the notification |
| `timestamp`      | Date     | Time when the notification was sent |

---

## **Leaderboard Collection**
| **Field**         | **Type**  | **Description** |
|-------------------|----------|---------------|
| `leaderboardID`  | String   | Unique identifier for the leaderboard entry |
| `userID`         | String   | ID of the user on the leaderboard |
| `totalSavings`   | Number   | Total amount saved by the user |
| `rank`           | Number   | Position in the leaderboard |

---

## **Summary**
- The **User Collection** stores **personal details, savings plans, and avatar data**.
- **Transactions track spending**, categorized by type and vendor details.
- **The Store Collection enables customization** by purchasing items with Save Points.
- **The Savings Plan Collection manages user goals** and their progress.
- **Rewards and Discounts Collections** allow users to earn and redeem perks.
- **Notifications provide real-time updates**, and the **Leaderboard fosters competition**.




