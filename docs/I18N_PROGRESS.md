# Interface Localization Progress

This document tracks the interface-localization work maintained in the `kadal-stacks/MuMuAINovel` fork. It describes the application UI only; it does not describe novel-content translation or the language used in AI generation prompts.

## Supported Interface Languages

- `id`: Bahasa Indonesia (default for new accounts)
- `en`: English
- `zh-CN`: Simplified Chinese

The selected language is stored as the user's `preferred_language` value and restored when the authenticated interface is initialized. The preference is separate from novel content and generation prompts.

## Foundation

The localization foundation includes:

- i18next and react-i18next resource configuration for the three supported languages.
- A `preferred_language` user field and PostgreSQL migration.
- An authenticated language-preference endpoint at `PUT /auth/preferences/language`.
- Account-menu language selection and save feedback.
- Locale-aware Ant Design components and Day.js dates.
- A dedicated `AppProviders` component that applies Ant Design, date, and document-language settings around the application.

## Module Coverage

| Area | Status | Notes |
|---|---|---|
| Account menu | Complete | Language selector, password actions, and logout messages use translation resources. |
| Project workspace dashboard | Complete for current sweep | Workspace title/subtitle, primary navigation, first-use notice, empty state, project statistics, statuses, relative dates, project actions, and import/export dialogs have translations in all three languages. |
| Workspace header and profile card | Complete for current sweep | Header columns and account-card sizing prevent longer localized labels from squeezing the display name and role into narrow lines. |
| Global footer | Complete | Version tooltip, sponsor/support, community, and footer labels use translation resources. |
| Login and authentication screens | Pending | Login UI and authentication notices still contain Chinese text. |
| Welcome announcement | Pending | The first-login/community announcement and its display-duration options still contain Chinese text. |
| Project detail and novel editor | Pending | Translation sweep has not yet covered these screens. |
| Wizard, settings, and remaining modules | Pending | To be localized module by module. |

A page not listed as complete may still display Chinese text. This is an incremental UI translation effort, not a claim that every screen is already localized.

## Validation Notes

The following checks were performed during the workspace and footer batch:

- TypeScript project build (`tsc -b`): passed.
- Production Vite build: passed.
- Browser smoke checks: Bahasa Indonesia and English were visually confirmed on the project workspace and global footer.
- Language preference persistence was verified during the localization foundation work.
- The workspace profile layout was rechecked after applying the no-wrap/flex-sizing adjustment.
- Targeted ESLint checks pass for `main.tsx`, `AppProviders.tsx`, and `AppFooter.tsx`.

The repository-wide ESLint run is not yet clean because the upstream codebase contains existing lint debt, including explicit `any` annotations in several components and pages. The known existing findings in `ProjectList.tsx` and `UserMenu.tsx` were not broadened into this localization patch.

The production bundle currently triggers Vite's advisory about a JavaScript chunk larger than 500 kB after minification. The build succeeds; code splitting remains a separate performance task.

## Next Localization Batch

1. Login and authentication screens.
2. First-login welcome announcement.
3. Project detail and novel editor.
4. Wizard, settings, and remaining modules.

Keep interface localization separate from the founder roadmap's multilingual novel generation and translation features.
