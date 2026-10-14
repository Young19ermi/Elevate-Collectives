# Architecture
- src/app: routing only. Thin pages that compose feature components.
- src/features/<name>: self-contained domain code (components, hooks, api, schemas, store).
- src/components: shared UI (ui primitives, layout, shared).
- src/lib: third-party clients (Supabase, Chapa), env validation, utils.
- Keep business logic (schemas, api, types) free of UI so it can be reused in Expo later.
- Chapa secrets stay server-side; prices always come from the DB, never the client.
