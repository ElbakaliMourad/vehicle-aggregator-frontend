# Vehicle Aggregator UI

A modern, responsive single-page application (SPA) that allows users to instantly look up vehicle specifications and active safety recalls using a 17-character Vehicle Identification Number (VIN).

## 🚀 Tech Stack
* **Framework:** Angular 
* **Language:** TypeScript
* **Styling:** Tailwind CSS / SCSS
* **Package Manager:** npm

## 🔌 Backend Integration
This frontend application is designed to communicate exclusively with the `vehicle-aggregator-backend` service. It expects the Spring Boot API to be actively running on `http://localhost:8080`. All JSON payloads are automatically mapped to strongly-typed TypeScript interfaces.

## ⚙️ Prerequisites
* [Node.js](https://nodejs.org/) (LTS version recommended)
* [Angular CLI](https://angular.dev/tools/cli) installed globally (`npm install -g @angular/cli`)

## 🛠️ Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ElbakaliMourad/vehicle-aggregator-frontend.git](https://github.com/ElbakaliMourad/vehicle-aggregator-frontend.git)
    cd vehicle-aggregator-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    ng serve
    ```

4.  **View the application:**
    Open your browser and navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.