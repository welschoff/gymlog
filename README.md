# GymLog (Work in Progress)

**Live-Demo:** https://gymlog-7awj4qmwr-welschoffs-projects.vercel.app

**Hinweis zum Testen:** Die E-Mail-Bestätigung in Supabase ist aktuell bewusst deaktiviert. Du kannst dich also einfach mit einer beliebigen (auch fiktiven) E-Mail-Adresse registrieren, um die App direkt auszuprobieren.

Persönliche Web-App zum Erstellen und Tracken von Workouts – gebaut für den eigenen Einsatz im Gym und perspektivisch als **PWA** ausgelegt.

## Status & bewusste Entscheidungen

- **Work in Progress:** Das Projekt befindet sich aktiv im Aufbau (grundlegende Flows wie Workout-Erstellung, Tracking und Login stehen; Komfort-Features wie z. B. Logout oder Feinschliff folgen nach und nach).
- **Mobile-first / Smartphone-Fokus:** Die Oberfläche ist gezielt für die schnelle Bedienung am Smartphone während des Trainings gebaut; Desktop-Layouts sind aktuell nicht priorisiert.
- **Basis-Feinschliff:** Logout-Flow, Trainingshistorie und kleinere UX-Optimierungen.
- **Entwicklung mit Coding Agents:** Da mein Schwerpunkt bisher stark im Frontend liegt, habe ich Datenmodell, Authentifizierung und Backend-Logik mithilfe von KI / Coding Agents entworfen, kritisch geprüft und Schritt für Schritt umgesetzt.

## Geplante Features (Roadmap)

- **KI-Workout-Generator:** Ein integrierter KI-Agent, der auf Basis von verfügbarer Trainingsdauer und gewünschten Muskelgruppen (z. B. _90 Min., Rücken & Brust_) direkt einen passenden Trainingsplan zusammenstellt.
- **PWA-Ausbau & Offline-Nutzung:** Installierbarkeit auf dem Smartphone inklusive Offline-Support im Gym.

## Tech-Stack

- **Frontend:** Next.js / TypeScript / Tailwind CSS
- **Backend & Auth:** Supabase (PostgreSQL)
- **Hosting:** Vercel

## Lokal starten (optional)

```bash
npm install
npm run dev
```
