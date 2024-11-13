# Cupid - Referral Matching Application

<div align="center">
  <img src="https://github.com/user-attachments/assets/b0c45c4f-5893-4055-bf1a-bd0f621bb7cb" alt="Screenshot 2024-11-12 at 6 12 56 PM">
</div>

**Cupid** is a platform that simplifies the referral process for job seekers by connecting them directly with employees willing to give referrals at their companies. By matching job seekers with the right referral givers, Cupid makes getting a referral more accessible and efficient, increasing the chances of landing the desired job.

<div style="display: flex; justify-content: center;">
  <img src="https://github.com/user-attachments/assets/a8f89e1e-7f75-40c6-a3c3-cadbf5213d04" alt="Image 1" style="margin-right: 10px; width: 45%;">
  <img src="https://github.com/user-attachments/assets/df34c9be-70b9-45e5-b8a6-88defdfabf08" alt="Image 2" style="width: 45%;">
</div>

---

## 📝 Description

We recognize the significant challenges job seekers face when trying to secure referrals, and our mission is to create a platform that serves as a "bridge," making the referral process smoother and accessible to all job hunters, entirely non-profit.

**Cupid** is an application that collects both referral requests from candidates and available referral opportunities from employees (referrers). A user can be both referrer and candidate where they can request or open referrals. Each week, the app automatically processes and matches all open requests with available opportunities.

![image](https://github.com/user-attachments/assets/2d9b5cae-7459-4d62-a456-e0f6fd4ff3da)

Cupid's algorithm prioritizes fairness and efficiency by considering factors like request time, priority level, and compatibility between the candidate's resume and the job posting. This scoring system ensures that referrals are distributed equitably, especially to those who need them the most. Additionally, Cupid uses a two-phase matching algorithm to maximize the number of successful referrals, helping as many job seekers as possible connect with opportunities.

[Incoming feature] To encourage more participation from referrers, we’ve introduced a **credits system**. Users can take on both roles—as a **referrer** and as a **candidate**. When a user successfully provides a referral, they earn credits, which can then be used to gain **higher priority** for their future referral requests. This creates a cycle of **giving and receiving**, ensuring that all users—whether referrers or candidates—remain motivated and engaged with the platform.

---

## 🛠️Built With (Tech Stack)

### Basic Tech Stack: MERN

### API Services

- **LinkedIn API**: Used for user authentication and authorization.
- **SendGrid API**: Sends verification passcodes via email to ensure secure user registration.

### Cloud and Deployment Services

- **AWS API Gateway**: Manages API calls to the backend services.
- **AWS Lambda**: Handles API calls, runs notification workers, and executes matching algorithms.
- **AWS S3**: Stores files such as resumes and profile pictures.
- **AWS EventBridge**: Schedules Lambda functions for periodic algorithm execution.
- **AWS SQS**: Manages and processes notification messages at a controlled rate.
- **AWS SES**: Sends email notifications to users.
- **Firebase**: Manages real-time database operations to ensure instant notification updates on the frontend.
- **Vercel**: Deploys the frontend for seamless user experience.

---

## 🔑 Key Features

### Candidate Side
- Create referral requests.
- Track the status of requests.
- Respond to additional information requests from referrers.

### Referrer Side
- Create referral openings.
- Verify company affiliation through company email to create referrals.
- Track the status of referral openings.
- Request further information from candidates.

### Matching Algorithm
- Matches based on three main criteria: request time, priority level, and compatibility between the candidate's resume and the job posting.
- Automatically executes weekly.

### Notification System
- Real-time notifications in the user interface with almost immediate email updates.

---

## 💡 Highlight Features

### Autofill Profile
Automatically fills out user profiles based on their resume, streamlining the onboarding process.

![image](https://github.com/user-attachments/assets/7dd46f34-85cc-47ae-b323-185d7f2b9e0d)

### Compatibility Check
Evaluates compatibility between a candidate’s resume and a job posting to calculate the likelihood of a successful referral. Referrers can also use this to decide whether to proceed with a referral.

![image](https://github.com/user-attachments/assets/fa877655-895d-48dc-89ee-7272b4dd6130)

---

## 🏛️ Architecture Justification
![image](https://github.com/user-attachments/assets/495eaad7-00d7-45eb-aca9-cfbeed5ba5fe)

The **Cupid** architecture adopts a **serverless approach** using **AWS Lambda**, **SQS**, **EventBridge**, and other managed services to achieve scalability and cost efficiency. By leveraging serverless technologies, Cupid scales automatically with user demand, reducing the need for manual management and allowing significant cost savings by charging only for the resources utilized.

### 1. API Call
Handles user interactions like creating referral requests, updating profiles, and submitting referral openings. This layer manages the communication between the frontend and backend services.

- **Frontend (Vercel)**: User interface deployed for optimized delivery.
- **AWS API Gateway**: Receives and forwards API requests securely to backend services.
- **AWS Lambda (Server Lambda)**: Processes requests, interacts with **MongoDB** for CRUD operations, and stores files in **AWS S3**.

**API Gateway** and **Lambda** provide a cost-effective, serverless way to manage requests, while **S3** ensures secure file storage.

### 2. Algorithm Running
Executes the matching algorithm that pairs candidates with referral opportunities, scheduled weekly for consistent matches.

- **AWS Lambda (Algorithm Lambda)**: Implements the core matching logic based on criteria like request time, priority level, and resume compatibility.
- **AWS EventBridge**: Schedules weekly execution of the matching algorithm.

Using **Lambda** allows cost-efficient execution, while **EventBridge** automates scheduling, ensuring consistent and up-to-date matching without manual intervention.

### 3. Notification Service
Keeps users informed in real-time about activities like updates, matches, and requests for more information.

- **AWS Lambda (Notification Service & Worker)**: Handles notification processing, including sending emails.
- **AWS SQS**: Queues notification messages, decoupling message generation from processing.
- **AWS SES**: Sends email notifications.
- **Firebase Realtime Database**: Updates notifications instantly on the frontend for a seamless user experience.

**SQS** ensures efficient and stable processing of notifications that avoid overloading for workers, **SES** handles cost-effective email delivery, and **Firebase** provides real-time updates, enhancing user engagement.

---

## 👥 Contributors
- Amazing UI/UX Designer: [Ngoc Anh](https://github.com/ljhxksy)

[![Contributors](https://contrib.rocks/image?repo=hoangr1010/Cupid)](https://github.com/hoangr1010/Cupid/graphs/contributors)
