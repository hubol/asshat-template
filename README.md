# asshat-template
### Template for asshat game projects

Ejected from IguaRPG 2 on April 4, 2025.

1. Clone this repo `git clone https://github.com/hubol/asshat-template.git project-name`
2. Delete `.git`
3. Run `git init`
4. Run `npm ci`
5. It can be useful to collect stacktraces of object creation. Use `npm run tool -- dev-patch-pixi-displayobject-ctor` to do this.
    - Note: You'll need to run `npm run tool -- dev-patch-pixi-displayobject-ctor revert` before step 6
6. Make a game
7. Before release, you may wish to configure the following:
    - `package.json`: `name`, `description` property
    - `public/index.css`: `--bg-color`, `--loading-color` values
    - `public/index.html`: `<title>`, `<meta>` elements
    - `raw/ogmo/asshat-project.ogmo`: `name` property
    - `src/igua/launch/start-game.ts`: `sceneName` property
8. Run `npm run build`
9. Zip up `dist/` and upload it to itch!