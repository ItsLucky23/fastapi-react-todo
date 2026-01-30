# Todo App

Een full-stack Todo applicatie gebouwd met Python (FastAPI) en React (TypeScript + Vite).

## Beschrijving

Deze applicatie biedt een complete todo-lijst functionaliteit waarmee gebruikers taken kunnen aanmaken, bekijken, afvinken, bewerken en verwijderen. De applicatie bestaat uit een REST API backend en een moderne, responsieve frontend.

**Features:**
*   Aanmaken van nieuwe taken met titel, beschrijving en prioriteit.
*   Overzicht van alle taken in een grid layout.
*   Filteren op status (voltooid/actief) en sorteren (datum/prioriteit).
*   Zoekfunctionaliteit.
*   Markeren als voltooid/onvoltooid.
*   Dark Mode.
*   Data persistentie in een SQLite database.

## Installatie

Volg onderstaande stappen om de applicatie lokaal te installeren.

### Voorwaarden
*   Python 3.8 of hoger
*   Node.js, voor npm (LTS versie aanbevolen)

### 1. Backend Installatie

1.  Open een terminal en navigeer naar de `backend` map:
    ```bash
    cd backend
    ```
2.  Maak een virtual environment aan:
    ```bash
    # Windows
    python -m venv venv
    ```
3.  Activeer de virtual environment:
    ```bash
    # Windows
    venv\Scripts\activate
    ```
4.  Installeer de benodigde dependencies:
    ```bash
    pip install -r requirements.txt
    ```

### 2. Frontend Installatie

1.  Open een nieuwe terminal en navigeer naar de `frontend` map:
    ```bash
    cd frontend
    ```
2.  Installeer de npm packages:
    ```bash
    npm install
    ```

## Gebruik

Om de applicatie te draaien, moet je zowel de backend als de frontend starten in aparte terminals.

### 1. Start de Backend

Zorg dat je in de `backend` map zit en je virtual environment geactiveerd is.

```bash
uvicorn main:app --reload
```
De backend draait nu op `http://localhost:8000`.
API documentatie is beschikbaar via `http://localhost:8000/docs`.

### 2. Start de Frontend

Zorg dat je in de `frontend` map zit.

```bash
npm run dev
```
Open je browser en ga naar de URL die getoond wordt (meestal `http://localhost:5173`).

## API Documentatie

De backend exposeert de volgende REST endpoints onder `/todo`:

| Methode | Endpoint | Beschrijving | Body (JSON) |
| :--- | :--- | :--- | :--- |
| `GET` | `/todo/` | Haal alle todos op | - |
| `POST` | `/todo/` | Maak een nieuwe todo | `{"id": "uuid", "name": "...", "description": "...", "priority": "low/medium/high", "createdAt": "iso", "updatedAt": "iso"}` |
| `PATCH` | `/todo/{id}` | Update een bestaande todo | `{"name": "...", "completed": true, ...}` (fields are optional) |
| `DELETE` | `/todo/{id}` | Verwijder een todo | - |

Voor interactieve documentatie en testen van endpoints, bezoek `localhost:8000/docs` wanneer de backend draait.

## Technische Keuzes

### Backend
*   **FastAPI**: Gekozen omdat ik er nog nooit mee gewerkt heb maar online lees ik dat het heel snel en eenvoudig is en als bonus punt genreerd het automatisch OpenAPI documentatie (Swagger UI). Wat ook top is dat het asynchrone requests ondersteunt.
*   **SQLAlchemy**: De ORM (Object Relational Mapper) voor database interacties. Maakt het makkelijk om met datamodellen te werken in plaats van ruwe SQL.
*   **SQLite**: Een lichtgewicht, file-based database die geen aparte server installatie vereist. Ideaal voor lokale ontwikkeling en dit project.
*   **Pydantic**: Voor data validatie en settings management. Zorgt ervoor dat inkomende data correct is voordat het verwerkt wordt.

### Frontend
*   **React**: Een populaire library voor het bouwen van user interfaces. Component-based structuur zorgt voor herbruikbare en overzichtelijke code.
*   **TypeScript**: Voegt statische typing toe aan JavaScript, wat helpt bij het voorkomen van bugs en het verbeteren van de ontwikkelervaring.
*   **Vite**: Een moderne build tool die zorgt voor snelle opstarttijden en Hot Module Replacement (HMR) tijdens ontwikkeling.
*   **Tailwind CSS**: Een utility-first CSS framework voor snelle en consistente styling.
*   **Axios/Fetch**: Gebruikt voor het communiceren met de backend API (impliciet in gebruik).

## Testing

De functionaliteit is getest op de volgende manieren:

1.  **Manual Testing**: Alle UI flows zijn handmatig doorlopen (aanmaken, editen, verwijderen, filteren).
2.  **API Testing**: Endpoints zijn geverifieerd via de Swagger UI (`/docs`).
3.  **Automated Script**: Er is een test script toegevoegd (`test_api.py`) in de root directory om de basis CRUD operaties van de API automatisch te verifieren.

### Test Script Draaien

Om het test script te draaien (zorg dat de backend draait op poort 8000):

```bash
# In een nieuwe terminal (root of backend folder)
python test_api.py
```
Dit script voert een reeks requests uit om te controleren of todos correct worden aangemaakt, opgehaald, aangepast en verwijderd.
