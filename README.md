![Asshat guy](/.github/logo.png)

# asshat-template
Template for **Asshat** game projects.

Made publicly available as a curiosity and learning tool. **Please don't ask me how to use this.**

> Did you know? **Asshat** is the name given to my "game engine" which is a curation of unorthodox hacks on top of the PixiJS rendering library.
The engine is always in development alongside the games that use it.
>
> A previous engine, with a totally unrelated API and implementation, (confusingly) bears the same name and was used to create [Super Bogus World 2](https://hubol.itch.io/super-bogus-world-2).

### Examples

Below are some examples of games created using various versions of this engine.

- https://github.com/hubol/hoppin-tom
- https://github.com/hubol/poisoned
- https://github.com/hubol/all-about-zoo
- https://github.com/hubol/igua-rpg
- https://github.com/hubol/good-morning-oswald
- https://github.com/hubol/digdigdig
- https://github.com/hubol/igua-rpg2

## How to use

1. Clone this repo `git clone https://github.com/hubol/asshat-template.git project-name`
2. Delete `.git`
3. Run `git init`
4. Run `npm ci`
5. It can be useful to collect stacktraces of object creation. Use `npm run tool -- dev-patch-pixi-displayobject-ctor` to do this.
    - Note: You'll need to run `npm run tool -- dev-patch-pixi-displayobject-ctor revert` before step 9
6. Configure the following:
    - `raw/ogmo/asshat-project.ogmo`: `name` property
7. Make a game
8. Before release, you may wish to configure the following:
    - `package.json`: `name`, `description` property
    - `public/index.css`: `--bg-color`, `--loading-color` values
    - `public/index.html`: `<title>`, `<meta>` elements
    - `src/igua/launch/start-game.ts`: `sceneName` property
9. Run `npm run build`
10. Zip up `dist/` and upload it to itch!

## Changelog

#### 2025-09-24

Added from `igua-rpg2`:
- Arrays containing exclusively non-numbers can no longer be treated as a `Vector`
- Fixed a bug where constructing the scene graph in a particular order would prevent adding game logic to `DisplayObject`s
- `DisplayObject.getWorldCenter` now falls back to `DisplayObject.getWorldPosition`

#### 2025-09-02

Added from `igua-rpg2`:
- Additional kerning for fonts
- Ogmo decal groups have a position computed from the minimum position of all children
- Ogmo entities with a uid will mark the uid property as required
- Expose `IguaLayers.recreateOverlay()`
- Simple `mxnActionRepeater` mixin
- `DisplayObject.getWorldCenter()`
- `Container.pivotedUnit()`
- `Container.findIs()`
- `Sprite.trimmed()`
- `ForceTintFilter`

#### 2025-06-26

Added from `igua-rpg2`:
- TypeScript's `noImplictAny` has been enabled
- Some additional characters, kerning for fonts
- Slightly reworked source code generation for levels to improve TypeScript performance in VSCode
- Dev server supports saving (HTTP `GET`), writing (HTTP `POST`) to local file system at `/fs`
- Miscellaneous utilities: `compileResetter`, `onMutate` Coro

#### 2025-04-10

Added from `igua-rpg2`:
- `SpriteAlphaMaskFilter`, `SpriteAlphaObscureFilter`
- `Environment.includesDevTools`

#### 2025-04-04

Initial import from `igua-rpg2`.