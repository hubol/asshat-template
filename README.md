# asshat-template
### Template for asshat game projects

Ejected from IguaRPG 2 on April 4, 2025.

1. Copy the tracked contents of this repo to a new Git repo
2. Run `npm ci`
3. It can be useful to collect stacktraces of object creation. Use `npm run tool -- dev-patch-pixi-displayobject-ctor` to do this.
    - Note: You'll need to run `npm run tool -- dev-patch-pixi-displayobject-ctor revert` before step 6
4. Make a game
5. Before release, you may wish to configure the following:
    - `package.json`: `name`, `description` property
    - `public/index.html`: `<title>`, `<meta>` elements
    - `raw/ogmo/asshat-project.ogmo`: `name` property
    - `src/igua/launch/start-game.ts`: `sceneName` property
6. Run `npm run build`
7. Zip up `dist/` and upload it to itch!