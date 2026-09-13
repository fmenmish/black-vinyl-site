# BlackVinyl

A static e-commerce demo site for buying metal, metalcore, punk, and rock albums, built to be hosted
on GitHub Pages with no backend and no build step.

## Features

- Browse metal, metalcore, punk, and rock albums, each with its own genre page and hero banner
- Every album and every band has its own page
- Search by album name, band name, or release date
- Create an account / log in (email, first name, last name, password)
- Edit your name from the My Account page
- Like albums and view them later on the Liked Albums page
- Add albums to your cart with a chosen quantity, update quantities, or remove them
- Checkout flow: cart → purchase confirmation → order recorded in your Purchase History
  (order id, date/time, item count, and total amount)

## How it works

There is no backend. Everything — accounts, cart, likes, and order history — is stored in the
browser's `localStorage`, scoped per logged-in user. That means:

- Data is per-browser, not shared across devices.
- Clearing site data / browsing in a private window starts you over.
- Passwords are lightly obscured for demo purposes only — **do not reuse a real password here.**
  There is no server, so there is no way to build real authentication security into a GitHub Pages
  site; this app is a UI/UX demo, not a production auth system.

## Project structure

```
index.html            Home page (hero + genre carousels)
login.html             Log in / create account
account.html            Edit your name
cart.html               Shopping cart
checkout.html           Purchase confirmation
orders.html             Purchase history
liked.html              Liked albums
album.html              Individual album page (?id=)
genre.html              Genre listing page (?c=metal|metalcore|punk|rock)
band.html               Band listing page (?b=<band name>)
search.html             Search results (?q=)
404.html                Not-found page
css/styles.css          Shared design system (dark theme)
js/data.js              Album catalog + data helpers
js/store.js             localStorage-backed auth/cart/likes/orders
js/ui.js                Shared header/footer/card/carousel/toast rendering
js/pages/*.js           Per-page logic
assets/images/*         Album covers + hero banners
```

## Running locally

No build step needed — any static file server works, e.g.:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploying to GitHub Pages

1. Create a new GitHub repository and push this folder's contents to its default branch.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Pick the branch (e.g. `main`) and the `/ (root)` folder, then save.
5. GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/`.

All links and asset paths in this project are relative, so it works correctly whether it's served
from a domain root or from a repository subpath.

## Data source

Album data and cover art were sourced from
[fmenmish/album-vebsite](https://github.com/fmenmish/album-vebsite).
