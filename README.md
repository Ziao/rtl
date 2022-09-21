## RTL Assignment

### Getting started
```bash
$ yarn install
$ yarn dev
# server is now running on http://localhost:7777
```

### Notes
I normally use branches for features, I'd say I'm really comfortable with git in general, including complex (interactive) rebases. I also wanted to set up storybook and cypress, but as I am currently in the middle of a move, I did not have time for all of this.

### Todo
- [x] Set up Prettier
- [x] Set up ESLint
- [x] Set up Husky
- [x] Set up Jest
- [x] Set up Tailwind
- [x] Set up Daisy or alternative - actually, get rid of this again. Really not needed.
- [x] Write unit tests
- [x] Set up react-query
- [x] Set up commitlint
- [x] Set up standard-version
- [ ] Set up lint-staged
- [ ] Set up Cypress
- [ ] Set up Storybook
- [ ] Write integration tests
- [ ] More SEO tags, such as meta descriptions, favicons, etc

### Things I would add, but did not have time for
- Handle UI cases such as articles with `showVideoIcon` or `isPremium`.
- Bother someone about the meaning of all the fields, hopefully this is documented somewhere (openapi spec?). 
- Come up with a better look for the page, as well has a proper jumbo component. Time did not allow for this.
- Write more tests, especially for the `LazyImage` and `ItemGridItem` components. 
- Set up cycpress and write a bunch of E2E/integration tests.
- CI/CD pipeline, with a proper build step, and a deployment step to a static hosting service.
- Proper skeleton loaders instead of a `Loading...` span

