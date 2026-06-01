# Show "X people going" on the website — Apps Script setup

This walks you through setting up a tiny Google Apps Script so your website can show the **live RSVP count** for any event (like the Kick-Off Event) directly on the event card / banner.

> ✅ Only the **number** of submissions is exposed. Names, emails, allergy info, and waiver answers stay private inside your Google Sheet.

---

## Step 1 — Link your Form to a Google Sheet

If you haven't already:

1. Open your Kick-Off Form
2. Click the **Responses** tab at the top
3. Click the **Sheets icon** (green spreadsheet icon) → **"Create a new spreadsheet"** → Create
4. A new linked Google Sheet opens — keep this tab open

---

## Step 2 — Open Apps Script from the Sheet

In the Sheet → **Extensions** menu → **Apps Script**

A new tab opens with a default `function myFunction()` — **delete all of it** and paste the code below.

---

## Step 3 — The script

```javascript
// ============================================================
// Taste the World — Public RSVP count endpoint
// Returns ONLY the submission count, never the actual responses.
// ============================================================

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const familyCount = Math.max(0, sheet.getLastRow() - 1); // -1 for header row

  // Optional: also compute total head-count (kids + adults).
  // Set both column titles below to match your Form's question text exactly.
  // If you don't want head-count, leave them as "" and only family count is returned.
  const KIDS_COL_HEADER   = "Number of children attending";
  const ADULTS_COL_HEADER = "Number of adults attending";

  let headCount = null;
  try {
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const kidsCol   = headers.indexOf(KIDS_COL_HEADER);
    const adultsCol = headers.indexOf(ADULTS_COL_HEADER);
    if (kidsCol >= 0 || adultsCol >= 0) {
      let total = 0;
      if (familyCount > 0) {
        const data = sheet.getRange(2, 1, familyCount, sheet.getLastColumn()).getValues();
        data.forEach(row => {
          const k = kidsCol   >= 0 ? parseInt(String(row[kidsCol]).match(/\d+/)?.[0]   || 0, 10) : 0;
          const a = adultsCol >= 0 ? parseInt(String(row[adultsCol]).match(/\d+/)?.[0] || 0, 10) : 0;
          total += k + a;
        });
      }
      headCount = total;
    }
  } catch (err) {
    // If anything fails, just skip head-count and return familyCount.
    headCount = null;
  }

  const payload = {
    families: familyCount,
    people: headCount,        // null if columns not found
    updated: new Date().toISOString()
  };

  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## Step 4 — Deploy as a Web App

1. Click the blue **Deploy** button (top-right of the Apps Script editor) → **New deployment**
2. Click the ⚙️ gear icon next to "Select type" → **Web app**
3. Fill in:
   - **Description**: `RSVP count for Taste the World website`
   - **Execute as**: `Me (your@gmail.com)`
   - **Who has access**: ⚠️ **`Anyone`** (this is what lets the website fetch it; only the count is exposed)
4. Click **Deploy**
5. The first time it asks you to **Authorize access** — click through, sign in with your Google account, click **Advanced** → **Go to (project name) (unsafe)** → **Allow** (it's safe; you wrote the code)
6. After deploy, copy the **Web app URL**. It looks like:
   ```
   https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxxx/exec
   ```

---

## Step 5 — Test it in your browser

Paste the URL into a new browser tab. You should see something like:

```json
{"families":3,"people":8,"updated":"2026-06-01T03:14:22.105Z"}
```

If you get this, ✅ it works!

If you see "Authorization required" or HTML instead of JSON — double-check Step 4: "Who has access" **must** be `Anyone` (not "Anyone with Google account").

---

## Step 6 — Plug the URL into the website

Tell me the URL. I'll paste it into `data/events.json` like this:

```json
{
  "id": "kickoff-2026",
  ...
  "rsvpCountUrl": "https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxxx/exec"
}
```

The event card and the Kick-Off banner will then automatically show:

```
👥 8 going (3 families)
```

---

## Updating the script later

- If you change Form questions, just open the Apps Script editor and update `KIDS_COL_HEADER` / `ADULTS_COL_HEADER` to match the new column titles.
- **After ANY code change**, you must click **Deploy → Manage deployments → ✏️ Edit → New version → Deploy** to publish. The web app URL stays the same.

## Privacy note

The deployed Web App ONLY ever returns the JSON shown above (a number).
It does NOT expose names, emails, child names, allergies, signatures, or any answer.
You can confirm by reading the `doGet` function — it never reads any column other than the optional kids/adults count fields.