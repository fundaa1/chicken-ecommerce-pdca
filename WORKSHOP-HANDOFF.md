# Workshop handoff — Chicken Farming Ecommerce

## Project identity

Source: https://github.com/fundaa1/chicken-ecommerce at `50bdd199067a64690ea40fe2205650359930ad2c`. Working copy: https://github.com/fundaa1/chicken-ecommerce-pdca, branch `main`. The commissioner owns acceptance. Codex completed the recorded work; no work was delegated.

## Current product and preview

The root `index.html`, `store.css`, `store.js` and `products.js` provide a buildless catalogue. Open `index.html` in a modern browser, or serve the repository root with a static HTTP server. There is no installation or WordPress runtime requirement for the catalogue. A static host such as Vercel can serve the root directly with no build command. Deployment has not been performed or verified.

The Poultry Supply Co. is a provisional name for this sample preview. The ten products and descriptions come from `sample-products.csv`. `products.js` is a manually generated snapshot of names, descriptions and categories; update it when the CSV changes. Treat all content as illustrative until the commissioner confirms it. Prices and stock are omitted because currency and validity are unknown.

The inherited `wp-content`, Compose configuration and documentation remain as historical source material. The new catalogue does not use them. The earlier `preview/index.html` is the initial static catalogue snapshot.

## Contracts and limitations

Search filters product names and descriptions. The category selector filters the sample category labels; both filters work together. Results and counts update in the browser. The app makes no API calls and stores no customer data.

There is no cart, checkout, order storage, payment, shipping calculation, inventory management or administrator interface. This is a catalogue preview and cannot accept orders. Do not describe it as a completed ecommerce system. A real store needs agreed product ownership and currency, order and fulfilment processes, payment integration, storage, access controls and a verification plan.

## PDCA-STEI migration cycle

- Plan: replace the WordPress dependency for an accessible, deployable first product preview using existing sample data.
- Do: create a static HTML, CSS and JavaScript catalogue with responsive layout, search and category filtering.
- Check: `node --check store.js` passed. The local preview loaded in the browser, displayed ten products, and searching for incubator returned the matching item. The product and data labels identify sample content. Category filter and mobile layout need commissioner review.
- Act: capture commissioner feedback before specifying real commerce behavior.
- Standardise: the static catalogue is the current entry point. Keep sample data and claims visibly identified.
- Train: open the local preview, search for incubator, clear the search, and select a category. Check that results and count change.
- Enforce: run syntax and whitespace checks and a browser walkthrough before accepting changes. A documented gate is not automated enforcement.
- Improve: confirm branding, product data, South African currency and the first real order workflow. Select hosting and commerce services based on those requirements before implementing checkout.

## Maintenance and reuse

At each change check `git status`, update this handoff and the workshop register, run `node --check store.js` and `git diff --check`, and verify relevant browser flows. Review the original source and dependency/asset rights before reuse. The inherited README states GPL v2 or later, but individual rights have not been audited.

Prior work at `0bbe973` provided a static sample list and documented a Docker setup blocker. Docker and the original WordPress stack were not tested on this machine. The new static catalogue avoids that runtime dependency for the preview.

## Academy and visual improvement cycle

- Plan: help visitors understand equipment, feed and health-related products through a linked educational section, and add editable visuals to the catalogue.
- Do: add category-based inline SVG illustrations, product-to-guide links and three expandable academy guides. Illustrations are code-defined and require no external image service.
- Check: `node --check store.js` and `git diff --check` passed. In a local browser the catalogue showed ten items, the vitamin product linked to the health guide, and its label-check section expanded. A screenshot of the health guide was inspected. Commissioner acceptance is pending.
- Act: gather commissioner feedback on visuals and coverage before adding more product-specific guidance.
- Standardise: guides are general educational starting points; product data is illustrative. Health guidance does not supply diagnoses or medicine doses. Product links select broad guide categories.
- Train: choose “Explore the guide” on a product, then expand the relevant guide. The academy can also be reached from the main navigation.
- Enforce: review health content with an appropriate local poultry professional before presenting it as production advice, and recheck browser navigation and sources when editing.
- Improve: add reviewed, product-specific guidance when verified product details and local advice are available. The general equipment guide does not replace an individual product manual.
- Sources: University of Minnesota Extension, [Raising chickens for eggs](https://extension.umn.edu/agriculture/animals-and-livestock/poultry/raising-chickens-for-eggs) and [Poultry biosecurity basics](https://extension.umn.edu/agriculture/animals-and-livestock/poultry/poultry-biosecurity-basics). Project `educational-content.md` was also reviewed; its detailed veterinary claims have not been independently validated.
- Work: Codex implemented and verified the change. No work was delegated.

## Product guide expansion cycle

- Plan: give visitors more relevant guidance for the sample coop, incubator and disinfectant.
- Do: add three illustrated academy guides and direct product links based on their sample categories. Retain the original broad equipment, feed and health guides.
- Check: JavaScript syntax and whitespace checks passed. Browser inspection confirmed all three links point to their respective guides, and the incubator guide opens and expands. The other two expanded guides and commissioner acceptance are pending.
- Act: gather review feedback and check product-specific instructions against actual manufacturers before adding factual specifications.
- Standardise: guide content is general and is not a product manual. Product claims and selection remain illustrative.
- Train: select “Explore the guide” on the sample coop, incubator or disinfectant, then expand the checklist.
- Enforce: verify each guide destination and source when editing; obtain relevant professional review before production use.
- Improve: add verified individual product information as it becomes available.
- Sources: [Penn State incubator setup](https://extension.psu.edu/programs/4-h/counties/montgomery/programs/school-enrichment/embryology/setting-up-the-incubator), [University of Minnesota chicken care](https://extension.umn.edu/agriculture/animals-and-livestock/poultry/raising-chickens-for-eggs), and [University of Minnesota cleaning and disinfection](https://extension.umn.edu/agriculture/animals-and-livestock/poultry/reducing-salmonella-risk-in-table-egg-production).
- Work: Codex implemented and verified the change. No work was delegated.
