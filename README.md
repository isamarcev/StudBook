# Decentralized Student Achievement Verification System

**Децентралізована система підтвердження студентських досягнень**

A decentralized platform that allows students to submit their achievements and have them verified by instructors or independent experts. The system leverages blockchain technology to ensure transparency, fairness, and tamper-proof record-keeping of student accomplishments.

🔗 **Live Demo:** [studchain.vercel.app](https://studchain.vercel.app/)

🔗 **Video Demo:** [Watch the video](https://youtu.be/f0jSG910eS0)

---

## Table of Contents

- [Overview](#overview)
- [Project Description](#project-description)
- [Features](#features)
- [Directory Structure](#directory-structure)
- [Smart Contract](#smart-contract)
- [Frontend](#frontend)
- [Installation & Running the Project](#installation--running-the-project)
- [License](#license)

---

## Overview

Traditional student projects and educational programs often face challenges such as:

- Verifying each participant's contribution
- Ensuring transparent evaluation and fair recognition
- Avoiding centralized biases and manipulations

By using blockchain, our platform provides an automated, transparent, and secure system to record and verify student achievements. Users can authenticate via MetaMask (or a similar crypto wallet), and all project and submission data are managed through smart contracts on the blockchain.

---

## Project Description

**Проблематика:**

У традиційних студентських проєктах і навчальних програмах складно підтвердити внесок кожного учасника, забезпечити прозорість оцінювання та чесний розподіл досягнень. Централізовані рішення залежать від тімлідів, що може призводити до упередженості або маніпуляцій.

**Опис:**

Платформа дозволяє студентам підтверджувати виконання завдань, а викладачам чи незалежним експертам верифікувати ці досягнення. Основна мета — забезпечити автоматизовану, прозору систему обліку студентських успіхів. Також можлива інтеграція для автоматичного розподілу грантів або стипендій через смарт-контракт.

---

## Features

- **User & Participant Management:** Реєстрація та управління студентами, викладачами та експертами.
- **Project Creation:** Викладачі створюють проєкти, визначають умови участі, налаштовують доступ (відкритий або за списком), встановлюють нагороди та дедлайни.
- **Achievement Submission:** Студенти подають заявки на підтвердження виконання завдань через смарт-контракт.
- **Verification Process:** Викладач або експерт перевіряє подані заявки та оновлює статус (Approved/Rejected).
- **Decentralized Certificates:** Можливість видачі NFT-сертифікатів як підтвердження досягнень.
- **Automated Funds Distribution:** (Додатково) Автоматичне отримання грантів або стипендій після верифікації.
- **Wallet Integration:** Авторизація через MetaMask або інший сумісний криптогаманець.

---

## Directory Structure

- **contracts/**  
  Contains the Solidity smart contract (`StudentAchievements.sol`) which implements the core logic of project creation, submission, and verification.

- **frontend/**  
  Contains the React-based frontend application that interacts with the deployed smart contract.

---

## Smart Contract

- **Deployed Network:** Sepolia Test Network
- **Contract Address:** `0x2200a7304a1a432c994fafd218ddf76837ae63a8`

> **Note:** Replace the above address with the actual deployed contract address if it changes.

---

## Frontend

The frontend application provides an interface for:

- Students to submit their achievements.
- Instructors/Verifiers to review and update submission statuses.
- Displaying projects and submissions.

---

## Installation & Running the Project

### Prerequisites

- **Node.js** (v14 or later recommended)
- **npm** (comes with Node.js)
- **MetaMask** (or any compatible web3 wallet)

### Steps to Run the Frontend

1. **Navigate to the `frontend` directory:**

```bash
cd frontend
```

2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Access the Application:

Open your browser and navigate to http://localhost:3000 to view and interact with the application.

License

This project is licensed under the MIT License.
