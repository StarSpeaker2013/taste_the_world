# Taste the World — Kick-Off Event Google Form Spec

> Copy-paste–ready field list and waiver language for the **June 14, 2026 Kick-Off Event** RSVP form.
>
> **⚠️ Before you publish:** Have **CAST-LA** review the waiver language. CAST-LA likely already has a standard club waiver template — using theirs is safer and legally stronger than a custom one. The wording below is a reasonable **starting draft** for a kids' food/cooking event, not legal advice.

---

## Suggested Google Form structure

**Form title:** `Taste the World — Kick-Off Event RSVP (June 14, 2026)`

**Form description (top of form):**
```
🎉 We can't wait to see you at our Kick-Off Event!

📅 Sunday, June 14, 2026 • 4:00 – 6:00 PM
📍 Heritage Community Center

This form takes about 3 minutes. Please fill it out for each family —
allergy and emergency-contact info are required so we can keep every
child safe and well-fed. Questions? Reply to this email or message us
on Discord / WeChat.
```

**Recommended Form Settings (in Google Forms ⚙️):**
- ✅ Collect email addresses → **Verified**
- ✅ Limit to 1 response (signed-in users)
- ✅ Response receipts → **Always**
- ✅ Show progress bar
- ❌ Do NOT make form public for editing
- 📧 Set up email notifications (Form → Responses → ⋮ → "Get email notifications for new responses")

---

## Section 1 — Family contact info

| # | Field | Type | Required | Notes |
|---|---|---|---|---|
| 1 | Parent / Guardian full name | Short answer | ✅ | |
| 2 | Best email | Short answer (validate as email) | ✅ | Auto-collected if you enable email collection |
| 3 | Mobile phone | Short answer (validate: phone) | ✅ | We'll only use it for event-day updates |
| 4 | How did you hear about us? | Multiple choice | optional | Options: `Friend / word of mouth` · `WeChat group` · `Discord` · `CAST-LA` · `Social media` · `Other` |

---

## Section 2 — Who's coming

| # | Field | Type | Required | Notes |
|---|---|---|---|---|
| 5 | Number of children attending | Multiple choice (1 / 2 / 3 / 4+) | ✅ | |
| 6 | Number of adults attending | Multiple choice (1 / 2 / 3+) | ✅ | Helps us plan seating |
| 7 | Child #1 — Full name | Short answer | ✅ | |
| 8 | Child #1 — Age | Short answer (number) | ✅ | |
| 9 | Child #1 — Role preference | Multiple choice | ✅ | Options: `Junior Chef (older — leads & teaches)` · `Mini Chef (younger — learns & cooks)` · `Not sure yet — please suggest` |
| 10 | Child #2 — Full name | Short answer | optional | |
| 11 | Child #2 — Age | Short answer (number) | optional | |
| 12 | Child #2 — Role preference | Multiple choice | optional | Same options as above |
| 13 | Additional children (name + age each) | Paragraph | optional | One per line, e.g. `Lily, 9` |

> 💡 If you expect lots of families with 3+ kids, consider duplicating the Child #1 block 3-4 times instead of using a paragraph field.

---

## Section 3 — Safety: Allergies & dietary restrictions

> **Form description for this section:**
> `Our Kick-Off includes hands-on food activities (bubble tea, cotton candy, food-science experiments). Please tell us about ANY allergies or dietary restrictions so we can keep every child safe. This information is required for participation.`

| # | Field | Type | Required | Notes |
|---|---|---|---|---|
| 14 | Does any attending child have food allergies or dietary restrictions? | Multiple choice | ✅ | Options: `No allergies / no restrictions` · `Yes — see below` |
| 15 | Allergy / restriction types (check all that apply) | Checkboxes | optional* | `Peanuts` · `Tree nuts` · `Dairy` · `Eggs` · `Wheat / gluten` · `Soy` · `Shellfish` · `Fish` · `Sesame` · `Vegetarian` · `Vegan` · `Halal` · `Kosher` · `Other` |
| 16 | Please describe — which child, severity, and any other details we need to know | Paragraph | optional* | E.g. "Lily (age 7) — severe peanut allergy, carries EpiPen" |
| 17 | Does your child carry emergency medication (EpiPen, inhaler, etc.) and will it be with them at the event? | Multiple choice | optional* | `Yes — will be on-site with the child/parent` · `No medication needed` · `Other (explain in next box)` |

*Conditionally required if they answered "Yes" to #14.

---

## Section 4 — Emergency contact

| # | Field | Type | Required | Notes |
|---|---|---|---|---|
| 18 | Emergency contact — full name | Short answer | ✅ | Someone other than the parent attending |
| 19 | Emergency contact — phone | Short answer | ✅ | |
| 20 | Emergency contact — relationship to child | Short answer | ✅ | E.g. grandparent, aunt, family friend |

---

## Section 5 — Waiver & consent (the legal section)

> **Section header:** `Acknowledgment & Consent`
>
> **Section description:** `Please read carefully and check the boxes below. A parent or legal guardian must complete this section.`

### Field 21 — Activity & risk acknowledgment (REQUIRED checkbox)

```
I understand that Taste the World events include hands-on cooking and
food-handling activities. These activities may involve, among other
things: sharp utensils (knives, peelers, graters), heat sources (hot
plates, kettles, oven, hot liquids), small choking-hazard ingredients,
and food allergens that other participants bring or that are used in
shared cooking stations.

I confirm that I have disclosed any and all food allergies, dietary
restrictions, and medical conditions of my child(ren) on this form.

I voluntarily choose to allow my child(ren) to participate, and I
release and hold harmless Taste the World, CAST-LA, Triple i, and
their respective volunteers, instructors, and partners from any
liability for injury, illness, or loss arising from participation in
the event, except in cases of gross negligence or willful misconduct.
```

**Checkbox label:**
`☐ I have read and agree to the above (required)`

---

### Field 22 — Supervision acknowledgment (REQUIRED checkbox)

```
I understand that a parent or designated adult must remain on-site
and responsible for the supervision of children under the age of 12
throughout the duration of the event. Taste the World volunteers and
instructors do not provide childcare or 1-on-1 supervision.
```

**Checkbox label:**
`☐ I understand and agree (required)`

---

### Field 23 — Photo / video release (OPTIONAL checkbox)

> ⚠️ Keep this **optional** — never require it. Some families will refuse, and that must be honored.

```
During the event, Taste the World may take photos and videos for use
on our website, YouTube channel, and social media to share the joy
of the event and promote future events. Children may appear
incidentally in group shots or in feature segments.

By checking this box, I grant Taste the World permission to use
photos and video footage that include my child(ren) for non-commercial
promotional purposes. I understand I can withdraw this consent at any
time by emailing the organizers, and reasonable efforts will be made
to remove or blur my child(ren) in future-posted content.

If I do NOT check this box, please make a reasonable effort to keep
my child(ren) out of published photos and videos.
```

**Checkbox label (NOT required):**
`☐ Yes, I grant photo/video permission (optional)`

---

### Field 24 — Digital signature (REQUIRED short-answer)

```
Type your full legal name below as your electronic signature. By
typing your name, you confirm you are the parent or legal guardian
of the child(ren) listed above and have authority to sign this
acknowledgment.
```

**Field type:** Short answer · **Required:** ✅ · **Label:** `Parent / guardian signature (full legal name)`

---

### Field 25 — Date of signing (REQUIRED short-answer)

**Field type:** Date · **Required:** ✅ · **Label:** `Date`

---

## Section 6 — Anything else?

| # | Field | Type | Required |
|---|---|---|---|
| 26 | Anything else we should know? (questions, suggestions, dietary nuances, etc.) | Paragraph | optional |

---

## After submission — confirmation message

**Set in:** Google Forms → Settings ⚙️ → Presentation → Confirmation message

```
🎉 Thank you! Your RSVP for the Taste the World Kick-Off Event is in.

📅 Sunday, June 14, 2026 • 4:00 – 6:00 PM
📍 Heritage Community Center

What's next:
• You'll receive a confirmation email shortly.
• A week before the event we'll send a reminder with parking info,
  what to wear, and the station map.
• Join our Discord or WeChat group so you don't miss day-of updates
  (link on the confirmation email).

Can't wait to see you — and your little chefs!
— The Taste the World team
```

---

## ⚠️ Legal disclaimer for YOU

This document is a **template / starting draft**, not legal advice.

Before you publish the form:
1. **Ask CAST-LA** if they have a standard waiver — use it instead if so. It's pre-vetted by their organization.
2. If CAST-LA doesn't have one, consider having a **parent who is an attorney** or **a friend at a local kids' nonprofit** review the waiver wording (10-minute favor).
3. Check whether **Triple i** wants their name on the waiver (since they're hosting). They might prefer specific language ("indemnify Triple i and its property owners…").
4. California has specific rules around minor waivers — they're not as ironclad as adult waivers, but well-drafted ones still provide meaningful protection and signal to families that you take safety seriously.
5. Make sure the Google Form **email recipient is monitored** — allergy info coming in 2 days before the event must be read.

---

## After the event — keep these records

- **Print or export** all responses (Form → Responses → ⋮ → Download responses as `.csv`) and keep for at least **3 years** (California statute of limitations for minor injury claims is generally 2 years after age of majority, but 3 years of records is a reasonable practical floor for an informal club).
- For any child with severe allergies: print a **single-page allergy sheet** for the event-day check-in table so volunteers know at a glance.