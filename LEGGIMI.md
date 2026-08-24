# Documenti sicurezza cantiere via QR — Kit pronto all'uso

## Cosa contiene questo kit
- `index.html` — la pagina che elenca i documenti (personalizzabile)
- `sw.js` — il "service worker" che rende tutto disponibile offline
- `manifest.webmanifest` — permette di installare la pagina come app
- `documenti/` — cartella dove mettere i PDF veri (PSC, POS, DUVRI, ecc.)
- `QR_esempio.png` — un QR code di prova (da rigenerare con l'URL reale)

## Come funziona in pratica
1. Carichi questa cartella su un sito web (vedi opzioni sotto)
2. Generi un QR code che punta all'indirizzo di quella pagina
3. Lo stampi e lo affiggi in cantiere (bacheca sicurezza, ingresso, ecc.)
4. La PRIMA persona che lo scannerizza deve avere connessione dati (anche
   solo per 5 secondi — basta il 4G in ufficio prima di partire, o il wifi
   del cantiere se c'è). Da quel momento il telefono ha salvato tutto e i
   documenti si aprono anche a zero tacche.

Ogni cantiere diverso = una pagina diversa (cartella diversa) = un QR diverso,
così ognuno mostra solo i documenti pertinenti a quel sito.

## Dove pubblicare la pagina (3 opzioni)

### Opzione A — Più semplice: hosting gratuito
Serve solo per il primo caricamento e per gli aggiornamenti.
- **Netlify Drop** (netlify.com/drop): trascini la cartella, ottieni un
  link tipo `https://cantiere-rossi.netlify.app` in 10 secondi.
- **GitHub Pages**: gratuito, un po' più tecnico, ma stabile nel tempo.

### Opzione B — Sul vostro dominio
Se avete già un sito (es. pirolastudio.com o il sito dello studio tecnico),
caricate la cartella in una sotto-pagina, es:
`studiotecnicopirola.it/cantieri/rossi-via-milano/`
Così restate proprietari dei dati e potete aggiornare i PDF quando volete.

### Opzione C — Zero internet anche al primo accesso (cantieri isolati)
Se il cantiere non ha MAI campo, anche l'opzione A/B non basta perché serve
almeno un accesso iniziale. In questo caso serve un piccolo dispositivo
fisico in cantiere (es. un Raspberry Pi o un router con web server) che
crea una sua rete wifi locale SENZA bisogno di internet: il QR punta
all'indirizzo di quella rete (es. 192.168.4.1), il telefono si collega
al wifi del cantiere e vede la pagina direttamente da lì, sempre, anche
tra un anno. Se il vostro caso è questo, posso aiutarti a preparare anche
questa versione — è un progetto leggermente diverso (serve l'hardware).

## Come generare il QR code definitivo
Una volta che la pagina è online, rigenera il QR con l'URL vero:

```python
import qrcode
img = qrcode.make("https://IL-TUO-LINK-VERO", box_size=10, border=4)
img.save("QR_cantiere_rossi.png")
```

Oppure con un qualsiasi generatore online (es. qr-code-generator.com),
basta incollare l'URL — nessuna differenza funzionale.

## Aggiornare i documenti in futuro
1. Sostituisci i PDF nella cartella `documenti/`
2. Se cambi NOME dei file o ne aggiungi di nuovi, aggiorna sia l'elenco
   `DOCUMENTI` dentro `index.html` sia `FILES_TO_CACHE` dentro `sw.js`
3. Cambia il numero di versione in `sw.js` (es. `cantiere-docs-v1` →
   `cantiere-docs-v2`) — questo dice ai telefoni "scarica di nuovo tutto"
4. Ricarica la cartella nell'hosting scelto

Il QR code stesso NON cambia mai (punta sempre allo stesso indirizzo):
basta aggiornare cosa c'è dietro quel link.

## Cosa personalizzare subito
- In `index.html`: nome e indirizzo del cantiere (`cantiereNome`,
  `cantiereIndirizzo`), elenco `DOCUMENTI` con i nomi reali dei PDF
- Metti i PDF veri dentro `documenti/`
- In `sw.js`: aggiorna `FILES_TO_CACHE` con gli stessi nomi file
