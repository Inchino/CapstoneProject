# CapstoneProject

# ⚽ GoalAway – Viaggi sportivi in Italia

## 📌 Descrizione del progetto
**GoalAway** è un'applicazione web full-stack pensata per promuovere il turismo in Italia attraverso pacchetti viaggio legati a partite di calcio, con un focus sulla bellezza culturale ed artistica delle città italiane.

Gli utenti possono esplorare pacchetti viaggio associati a partite di Serie A, visualizzare dettagli su città, squadre e stadi, e prenotare in modo semplice. Gli amministratori gestiscono i contenuti (CRUD completo su squadre, partite, pacchetti e città) da un'interfaccia dedicata.

---

## 🧠 Idea iniziale
Il progetto nasce dall’intuizione che molti appassionati di calcio sarebbero disposti a visitare città meno note pur di assistere a una partita della propria squadra. Il calcio diventa quindi un pretesto per scoprire luoghi e tradizioni locali.

**Obiettivi principali:**
- Promuovere città minori, e non solo, tramite pacchetti turistici sportivi.
- Offrire un’esperienza di prenotazione facile e sicura.
- Gestione differenziata per utenti e amministratori.
- Interfaccia moderna, responsive e chiara.

---

## 🎯 Destinatari
- Appassionati di calcio.
- Turisti alla ricerca di esperienze locali alternative.
- Agenzie di viaggio sportive.
- Amministratori e operatori del turismo.

---

## 🛠️ Tecnologie utilizzate

### Backend – ASP.NET Core Web API
- ASP.NET Core 7
- Entity Framework Core (Code First)
- Identity (con modelli personalizzati)
- JWT Authentication
- SQL Server
- DTO con validazione tramite Data Annotations
- Seed iniziale per ruoli e amministratore
- CORS abilitato per il frontend React

### Frontend – React + Vite
- React 18
- Vite
- React Router DOM
- React-Bootstrap + Bootstrap 5
- Fetch API
- Validazioni lato client
- Colore principale personalizzato: `#05391F`

---

## 🧱 Struttura del progetto

### Modelli principali
- `ApplicationUser`, `ApplicationRole`, `ApplicationUserRole`
- `Citta`
- `Squadra`
- `Partita`
- `PacchettoViaggio`
- `Prenotazione`

### Ruoli e permessi
- **SuperAdmin**: accesso completo a tutta l'applicazione.
- **Admin**: accesso completo CRUD a tutti i dati.
- **User**: esplora pacchetti e prenota.

### Funzionalità principali
- 🔐 Login/Registrazione con JWT
- 🏙️ Gestione città e stadi
- 🏟️ Gestione partite
- 📦 Gestione e prenotazione pacchetti viaggio
- 📋 UI amministrativa separata
- ✅ Validazione completa dati
- 📱 Responsive design

---

## 🔄 Come è stato creato

1. Progettazione modelli e relazioni in EF Core (Code First).
2. Creazione database tramite migrazioni.
3. Configurazione Identity per ruoli personalizzati.
4. Sviluppo servizi separati per entità (senza interfacce).
5. Realizzazione controller RESTful con DTO.
6. Configurazione JWT e CORS.
7. Creazione frontend React con struttura modulare.
8. Integrazione API REST lato client.
9. UI responsive e test dei dati inseriti (squadre, partite, città).

---

## 🚀 Avvio del progetto

### Requisiti
- .NET 7 SDK
- SQL Server / SQL Express
- Node.js + npm
- Visual Studio / VS Code
- Vite + React

<pre>
### Backend
```bash
cd Backend/SportTravelApi
dotnet ef database update
dotnet run

### Frontend
cd Frontend/goalaway-app
npm install
npm run dev
</pre>
---

## 📦 Sviluppi futuri
- Integrazione pagamenti online.
- Dashboard amministrativa avanzata.
- Filtri e ricerca avanzata pacchetti.
- Sezione news/eventi sportivi.
- Sezione Serie B.

