# Workshop handoff — Chicken Farming Ecommerce

## Identity and scope

Source https://github.com/fundaa1/chicken-ecommerce at commit `50bdd199067a64690ea40fe2205650359930ad2c`. Working copy https://github.com/fundaa1/chicken-ecommerce-pdca, branch main. Codex inspected the source and prepared a static sample catalogue. No work was delegated. Commissioner acceptance is pending.

## Preview and contract

Open `preview/index.html` directly in a browser. It is a static snapshot of the ten products in `sample-products.csv`, generated during this work. It is a review aid, not a running WordPress store. Prices and stock are deliberately omitted because their currency and current validity are not established. Changes to the CSV are not reflected automatically. Checkout, shipping, payments and inventory are unverified.

## PDCA-STEI

- Plan: establish a reproducible local WordPress preview and document dependencies and evidence.
- Do: clone the source into a separate public working repository and prepare the static sample catalogue and this handoff.
- Check: source HEAD matched the base on 6 November 2026. The CSV contains ten sample rows. Docker, PHP, WP-CLI and MySQL commands were not available on the current machine. WordPress startup, import, checkout and shipping were not tested.
- Act: the full preview remains incomplete. Establish an available Docker environment, then verify and repair the stack before commissioner acceptance.
- Standardise: preserve sample data and do not commit credentials. The static preview is not proof of live store behavior.
- Train: open the static HTML to review product content; for the full store follow the investigation steps below once Docker is available.
- Enforce: require a clean startup, restart with data retained, sample storefront walkthrough and documented results before marking the full preview complete.
- Improve: verify sample product import and shipping with representative test cases after the preview is running.

## Setup investigation for the next agent

1. Check `docker --version`, `docker compose version` and Docker daemon availability. Inspect the working tree, running containers, ports and existing volumes before changes.
2. The source Compose file uses environment variables `DB_USER`, `DB_PASSWORD`, `DB_NAME` and `DB_ROOT_PASSWORD`. Generate local-only values in an untracked `.env`. Do not publish them.
3. Investigate the server mismatch: `nginx.conf` forwards PHP to `wordpress:9000`, while Compose uses the standard `wordpress:latest` image. Do not assume that the Nginx route works. Determine the chosen WordPress image variant and test the correct port and serving path.
4. The Compose configuration does not install WooCommerce. Identify and install a compatible version in an isolated test environment, then verify custom plugin activation and import of sample data. Record exact image and plugin versions and any changes needed to reproduce them.
5. Verify from a clean environment, record commands and outcomes, and confirm persistence after a non-destructive restart. Do not remove existing volumes or data without checking ownership and impact.

The inherited README and implementation plan make claims that have not been verified. The README states GPL v2 or later; verify rights for all dependencies and assets before reuse. A production deployment, payments and real orders are outside this preview exercise.
