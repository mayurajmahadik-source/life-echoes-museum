# LIFE//RECEIPTS — Real Data Integration

## Goal
Make the existing prototype genuinely data-driven using the uploaded `receipts.json` (15,443 receipts, 100 connections) and `insights.json`, with no change to the visual identity.

## What the real data contains
- 15,443 receipts across 3 types: transactions (10,267), music listening days (2,715), household purchases (2,461).
- 100 pre-computed "same-day" connections pairing music activity with transaction activity.
- Insights: totals (plays, minutes, skips, record counts), top 20 artists, top 20 tracks, listening hours, top spending categories, merchants and cities.

## What will change
1. **Real dataset, lazily loaded.** A cleaned, minified copy of the receipts is served as a static file and fetched in the browser on demand, so the first screen stays fast. `insights.json` and the 100 connections are small and bundled directly.
2. **Real counts.** The hero "open archive" line and footer show the true 15,443 traces instead of the placeholder 1,284.
3. **Archive browser (new section, existing styling).** A searchable, filterable list of receipts:
   - Text search across title, description, category, merchant/city.
   - Type filter (music / purchase / transaction) reusing the existing filter buttons.
   - Paged/"load more" rendering so long lists stay smooth.
   - Rows are clickable and render the selected receipt in the existing receipt-slip detail panel.
4. **Detail view.** The existing slip component is extended to display real fields per type: amount and currency, category/subcategory, payment mode, city/state, plays/minutes/top artist/top track, date and time — with graceful handling of the 2,187 receipts that have no timestamp.
5. **CONNECT THE DOTS section.** Uses the real connections list: each entry shows its date, the activity types involved, listening plays vs transaction count, and the supplied explanation. Selecting one reveals the actual receipts recorded on that date.
6. **WE NOTICED... section.** Editorial statistic cards built from `insights.json`: total listening minutes and plays, skipped tracks, record counts, top artists and tracks, most active listening hours, top spending categories, merchants and cities.
7. **Constellation unchanged visually.** It keeps its current look but is fed a small representative subset (roughly a dozen receipts spanning all three types, chosen deterministically from the real data) with positions derived from date and amount. Existing hover, keyboard and reduced-motion behavior stays.

## What will not change
No redesign, no new colour or type decisions, no backend, database, auth or API. All existing responsive layouts, focus states, ARIA labels and reduced-motion handling are preserved.

## Technical notes
- A one-time preprocessing step trims unused fields and writes `public/data/receipts.min.json` plus typed modules for connections and insights under `src/data/`. The original mock array in `src/data/receipts.ts` is replaced by real types and derived helpers.
- Loading uses TanStack Router's existing patterns: `useQuery`/suspense against a cached fetch of the static JSON, with a skeleton in the existing style while it loads.
- Search, filtering, sorting and pagination all run client-side with `useMemo`, on normalized fields precomputed once after load.
- Route metadata on `/` is updated to reflect the real archive size.
