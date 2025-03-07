# ProvX - Calcolo Compensi Agenti

ProvX è un'applicazione web progressiva (PWA) progettata per calcolare il compenso di un agente in base allo sconto applicato e alla categoria di prodotto venduto. L'obiettivo è garantire trasparenza nei compensi e mantenere la marginalità aziendale.

## 🔹 **Come Funziona**
L'utente inserisce:
- **Prezzo lordo** del prodotto
- **Sconto applicato (%)**
- **Categoria di appartenenza del prodotto**

L'app calcola automaticamente:
- **Prezzo netto**
- **Compenso agente (€ e %)**
- **Margine aziendale rimanente**
- **Impatto dei costi vari aziendali**

---

## 📊 **Categorie di Sconto e Compenso**
Esistono **tre categorie** di vendita, ognuna con una soglia massima di sconto e un compenso di base per l'agente.

### **1️⃣ Rivenditore**
- **Sconto massimo:** 60%
- **Compenso base:** 1% del prezzo netto con sconto massimo
- **Eccedenza:** Se lo sconto è inferiore a 60%, si applica una maggiorazione calcolata come:
  
  \[ (Prezzo Netto - Prezzo Netto con Sconto Massimo) × (1% ÷ 2) \]
  
- **Esempio:**
  - Prezzo Lordo: **10.000€**
  - Sconto: **55%**
  - Prezzo Netto: **4.500€**
  - Prezzo Netto con Sconto 60%: **4.000€**
  - Compenso Base: **40€**
  - Eccedenza: \[ (4.500€ - 4.000€) × (1% ÷ 2) \] = **2,5€**
  - **Compenso Totale: 42,5€ (1,06%)**

---

### **2️⃣ Smontagomme + Equilibratrici**
- **Sconto massimo:** 55%
- **Compenso base:** 7% del prezzo netto con sconto massimo
- **Eccedenza:** Se lo sconto è inferiore a 55%, si applica una maggiorazione calcolata come:
  
  \[ (Prezzo Netto - Prezzo Netto con Sconto Massimo) × (7% ÷ 2) \]
  
- **Esempio:**
  - Prezzo Lordo: **9.250€**
  - Sconto: **40%**
  - Prezzo Netto: **5.550€**
  - Prezzo Netto con Sconto 55%: **4.162,5€**
  - Compenso Base: **291,375€**
  - Eccedenza: \[ (5.550€ - 4.162,5€) × (7% ÷ 2) \] = **48,563€**
  - **Compenso Totale: 339,937€ (7,26%)**

---

### **3️⃣ Sollevamento**
- **Sconto massimo:** 50%
- **Compenso base:** 3% del prezzo netto con sconto massimo
- **Eccedenza:** Se lo sconto è inferiore a 50%, si applica una maggiorazione calcolata come:
  
  \[ (Prezzo Netto - Prezzo Netto con Sconto Massimo) × (3% ÷ 2) \]
  
- **Esempio:**
  - Prezzo Lordo: **8.000€**
  - Sconto: **45%**
  - Prezzo Netto: **4.400€**
  - Prezzo Netto con Sconto 50%: **4.000€**
  - Compenso Base: **120€**
  - Eccedenza: \[ (4.400€ - 4.000€) × (3% ÷ 2) \] = **6€**
  - **Compenso Totale: 126€ (3,15%)**

---

## 🔄 **Protezione della Marginalità Aziendale**
L'algoritmo è progettato per:
✅ Garantire compensi equi agli agenti
✅ Premiare chi mantiene una scontistica più bassa
✅ Salvaguardare i margini aziendali evitando erogazioni eccessive

Se un agente applica lo **sconto massimo**, il compenso viene calcolato sulla base netta. Se invece concede **uno sconto inferiore al massimo**, ottiene un **bonus sulla differenza eccedente**, incentivando così la tutela del margine.

---

## 🛠 **Struttura Tecnica**
L'app è sviluppata in **HTML, CSS e JavaScript** con logica ottimizzata per:
- **Gestione dinamica del calcolo compensi**
- **Uso di localStorage per memorizzazione dati**
- **Generazione automatica di PDF** (prossima feature)

---

## 🔗 **Come Usare la PWA**
1. **Aprire l’app in un browser** (Chrome, Edge, Safari...)
2. **Aggiungere alla schermata home** per l'uso offline
3. **Inserire i dati e calcolare il compenso**

⚡ *ProvX rende il calcolo dei compensi semplice, trasparente ed efficace!* 🚀
---

## 📜 **Licenza**
ProvX è distribuito sotto **licenza MIT**.

© 2025 Alessandro Pezzali - [pezzaliAPP.com](https://www.pezzaliapp.com/)
