# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

Step 1: Install react router dom
Step 2: User browser router tag from react-router-dom and cover the <App/>
Step 3: Use Routes to delare the Route that would render the componenet when used

There is different kind of Routers availble than browser. There is Hash router, similar to browser router but it stores hash urls aka localhost:3000/#/home. 99% use the browser router but can be useful if using a shared server and can't change the url of the server.

History Router is another one used under unstable_HistoryRouter which gives direct acces to browser history 99% wont use and is currently unstable due to issues with the object.

Memory Router is used for testing where the routes don't rely on the URL being render and the history is saved on memory. Better to test on routes runing on memory than browser because if you aren't connected to the browser it will break and not work.

Static Router is used for server only where you will have to specify location. Tells react what page you are currently rendering. Highly used in SSR.

Native router is the last one where it's only usecase is for mobile development with react native.

## Advanced Route Definitions

This is where React Router really gets interesting. There is a lot of cool stuff you can do with routing to make more complex routes, easier to read, and overall much more functional. This can be done through five main techniques.

1.  Dynamic Routing
2.  Routing Priority
3.  Nested Routes
4.  Multiple Routes
5.  `useRoutes` Hook

### Dynamic Routing

The simplest and most common advanced feature in React Router is handling dynamic routes. In our example, let's assume that we want to render out a component for individual testimonial in our application. We could hardcode each of those routes, but if we have hundreds of testimonial or the ability for users to create testimonial then it is impossible to hardcode all these routes. Instead we need a dynamic route.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/testimonial" element={<BookList />} />
  <Route path="/testimonial/:id" element={<Book />} />
</Routes>
```

The final route in the above example is a dynamic route that has a dynamic parameter of `:id`. Defining dynamic routes in React Router is as simple as putting a colon in front of whatever you want the dynamic part of your route to be. In our case our dynamic route will match any URL that starts with `/book` and ends with some value. For example, `/testimonial/1`, `/testimonial/bookName`, and `/testimonial/literally-anything` will all match our dynamic route.

Pretty much always when you have a dynamic route like this you want to access the dynamic value in your custom component which is where the `useParams` hook comes in.

```jsx
import { useParams } from "react-router-dom";

export function Book() {
  const { id } = useParams();

  return <h1>Book {id}</h1>;
}
```

The `useParams` hook takes no parameters and will return an object with keys that match the dynamic parameters in your route. In our case our dynamic parameter is `:id` so the `useParams` hook will return an object that has a key of `id` and the value of that key will be the actual id in our URL. For example, if our URL was `/testimonial/3` our page would render **Book 3**.

### Routing Priority

When we were just dealing with hard coded routes it was pretty easy to know which route would be rendered, but when dealing with dynamic routes it can be a bit more complicated. Take these routes for example.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/testimonial" element={<BookList />} />
  <Route path="/testimonial/:id" element={<Book />} />
  <Route path="/testimonial/new" element={<NewBook />} />
</Routes>
```

If we have the URL `/testimonial/new` which route would this match? Technically, we have two routes that match. Both `/testimonial/:id` and `/testimonial/new` will match since the dynamic route will just assume that `new` is the `:id` portion of the URL so React Router needs another way to determine which route to render.

In older versions of React Router whichever route was defined first would be the one that is rendered so in our case the `/testimonial/:id` route would be rendered which is obviously not what we want. Luckily, version 6 of React Router changed this so now React Router will use an algorithm to determine which route is most likely the one you want. In our case we obviously want to render the `/testimonial/new` route so React Router will select that route for us. The actual way this algorithm works is very similar to CSS specificity since it will try to determine which route that matches our URL is the most specific (has the least amount of dynamic elements) and it will select that route.

While we are on the topic of routing priority I also want to talk about how to create a route that matches anything.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/testimonial" element={<BookList />} />
  <Route path="/testimonial/:id" element={<Book />} />
  <Route path="/testimonial/new" element={<NewBook />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

A `*` will match anything at all which makes it perfect for things like a 404 page. A route that contains a `*` will also be less specific than anything else so you will never accidentally match a `*` route when another route would have also matched.

### Nested Routes

Finally, we have come to my favorite part of React Router which is how they handle route nesting. In the above example we have three routes that start with `/testimonial` so we can nest those routes inside of each other to clean up our routes.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/testimonial">
    <Route index element={<BookList />} />
    <Route path=":id" element={<Book />} />
    <Route path="new" element={<NewBook />} />
  </Route>
  <Route path="*" element={<NotFound />} />
</Routes>
```

This nesting is pretty simple to do. All you need to do is make a parent `Route` that has the `path` prop set to the shared path for all your child `Route` components. Then inside the parent `Route` you can put all the child `Route` components. The only difference is that the `path` prop of the child `Route` components no longer includes the shared `/testimonial` route. Also, the route for `/testimonial` is replaced with a `Route` component that has no `path` prop, but instead has an `index` prop. All this is saying is that the path of the index `Route` is the same as the parent `Route`.

Now if this is all you could do with nested routes it would be only marginally useful, but the true power of nested routes comes in how it handles shared layouts.

#### Shared Layouts

Let's imagine that we want to render a nav section with links to each book as well the new book form from any of our book pages. To do this normally we would need to make a shared component to store this navigation and then import that into every single book related component. This is a bit of a pain, though, so React Router created its own solution to solve this problem. If you pass an `element` prop to a parent route it will render that component for every single child `Route` which means you can put a shared nav or other shared components on every child page with ease.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/testimonial" element={<testimonialLayout />}>
    <Route index element={<BookList />} />
    <Route path=":id" element={<Book />} />
    <Route path="new" element={<NewBook />} />
  </Route>
  <Route path="*" element={<NotFound />} />
</Routes>
```

```jsx
import { Link, Outlet } from "react-router-dom";

export function testimonialLayout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/testimonial/1">Book 1</Link>
          </li>
          <li>
            <Link to="/testimonial/2">Book 2</Link>
          </li>
          <li>
            <Link to="/testimonial/new">New Book</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
```

The way our new code will work is whenever we match a route inside the `/book` parent `Route` it will render the `testimonialLayout` component which contains our shared navigation. Then whichever child `Route` is matched will be rendered wherever the `Outlet` component is placed inside our layout component. The `Outlet` component is essentially a placeholder component that will render whatever our current page's content is. This structure is incredibly useful and makes sharing code between routes incredibly easy.

Now the final way you can share layouts with React Router is by wrapping child `Route` components in a parent `Route` that only defines an `element` prop and no `path` prop.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/testimonial" element={<testimonialLayout />}>
    <Route index element={<BookList />} />
    <Route path=":id" element={<Book />} />
    <Route path="new" element={<NewBook />} />
  </Route>
  <Route element={<OtherLayout />}>
    <Route path="/contact" element={<Contact />} />
    <Route path="/about" element={<About />} />
  </Route>
  <Route path="*" element={<NotFound />} />
</Routes>
```

This bit of code will create two routes, `/contact` and `/about`, which both are rendered inside the `OtherLayout` component. This technique of wrapping multiple `Route` components in a parent `Route` component with no `path` prop is useful if you want those routes to share a single layout even if they don't have a similar path.

#### Outlet Context

The final important thing to know about `Outlet` components is they can take in a `context` prop which will work just like React context.

```jsx
import { Link, Outlet } from "react-router-dom";

export function testimonialLayout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/testimonial/1">Book 1</Link>
          </li>
          <li>
            <Link to="/testimonial/2">Book 2</Link>
          </li>
          <li>
            <Link to="/testimonial/new">New Book</Link>
          </li>
        </ul>
      </nav>

      <Outlet context={{ hello: "world" }} />
    </>
  );
}
```

```jsx
import { useParams, useOutletContext } from "react-router-dom";

export function Book() {
  const { id } = useParams();
  const context = useOutletContext();

  return (
    <h1>
      Book {id} {context.hello}
    </h1>
  );
}
```

As you can see from this example, we are passing down a context value of `{ hello: "world" }` and then in our child component we are using the `useOutletContext` hook to access the value for our context. This is a pretty common pattern to use since often you will have shared data between all your child components which is the ideal use case for this context.

### Multiple Routes

Another incredibly powerful thing you can do with React Router is use multiple `Routes` components at the same time. This can be done as either two separate `Routes` components or as nested `Routes`.

#### Separate `Routes`

If you want to render two different sections of content that both depend on the URL of the application then you need multiple `Routes` components. This is very common if for example you have a sidebar you want to render certain content in for certain URLs and also a main page that should show specific content based on the URL.

```jsx
import { Route, Routes, Link } from "react-router-dom"
import { Home } from "./Home"
import { BookList } from "./BookList"
import { testimonialidebar } from "./testimonialidebar"

export function App() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/testimonial">testimonial</Link></li>
        </ul>
      </nav>

      <aside>
        <Routes>
          <Route path="/testimonial" element={<testimonialidebar />}>
        </Routes>
      </aside>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testimonial" element={<BookList />} />
      </Routes>
    </>
  )
}
```

In the above example we have two `Routes`. The main `Routes` defines all the main components for our page and then we have a secondary `Routes` inside the `aside` that will render the sidebar for our testimonial page when we are at `/testimonial`. This means if our URL is `/testimonial` both of our `Routes` components will render out content since they both have a unique match for `/testimonial` in their `Routes`.

Another thing that you can do with multiple `Routes` components is hardcode the `location` prop.

```jsx
<Routes location="/testimonial">
  <Route path="/testimonial" element={<testimonialidebar />}>
</Routes>
```

By hardcoding a `location` prop like this we are overriding the default behavior or React Router so no matter what the URL of our page is this `Routes` component will match its `Route` as if the URL was `/testimonial`.

#### Nested `Routes`

The other way to use multiple `Routes` components is to nest them inside one another. This is pretty common if you have lots of routes and want to clean up your code by moving similar routes into their own files.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/testimonial/*" element={<BookRoutes />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

```jsx
import { Routes, Route } from "react-router-dom";
import { BookList } from "./pages/BookList";
import { Book } from "./pages/Book";
import { NewBook } from "./pages/NewBook";
import { BookLayout } from "./BookLayout";

export function BookRoutes() {
  return (
    <Routes>
      <Route element={<BookLayout />}>
        <Route index element={<BookList />} />
        <Route path=":id" element={<Book />} />
        <Route path="new" element={<NewBook />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
```

Nesting `Routes` in React Router is pretty simple. All you need to do is create a new component to store your nested `Routes` this component should have a `Routes` component and inside that `Routes` component should be all the `Route` components that you are matching with the parent `Route`. In our case we are moving all our `/testimonial` routes into this `BookRoute` component. Then in the parent `Routes` you need to define a `Route` that has a path equal to the path all your nested `Routes` share. In our case that would be `/testimonial`. The important thing, though, is you need to end your parent `Route` `path` with a `*` otherwise it will not properly match the child routes.

Essentially, the code we have written says that whenever a route starts with `/book/` it should search inside the `BookRoutes` component to see if their is a `Route` that matches. This is also why we have another `*` route in `BookRoutes` so that we can ensure if our URL does not match any of the `BookRoutes` it will properly render the `NotFound` component.

### `useRoutes` Hook

The final thing you need to know about defining routes in React Router is that you can use a JavaScript object to define your routes instead of JSX if you prefer.

```jsx
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { BookList } from "./BookList";
import { Book } from "./Book";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/testimonial">
        <Route index element={<BookList />} />
        <Route path=":id" element={<Book />} />
      </Route>
    </Routes>
  );
}
```

```jsx
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { BookList } from "./BookList";
import { Book } from "./Book";

export function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/testimonial",
      children: [
        { index: true, element: <BookList /> },
        { path: ":id", element: <Book /> },
      ],
    },
  ]);

  return element;
}
```

These two components both hae the exact same routes the only difference is how they were defined. If you do decide you want to use the `useRoutes` hook all the props that you would normally pass to your `Route` components are instead just passed as key/value pairs of an object.

## Handling Navigation

Now that we know how to define our routes we need to talk about how to navigate between those routes. This section will be broken down into three sections.

1.  Link Navigation
2.  Manual Navigation
3.  Navigation Data

### Link Navigation

First I want to talk about link navigation since it is the simplest and most common form of navigation you will encounter. We have already seen the most basic form of link navigation using the `Link` component

```jsx
<Link to="/">Home</Link>
<Link to="/testimonial">testimonial</Link>
```

These `Link` components can get a bit more complex, though. For example you can have absolute links like the above links or you can have links that are relative to the current component being rendered.

```jsx
<Link to="/">Home</Link>
<Link to="../">Back</Link>
<Link to="edit">Edit</Link>
```

For example imagine we are in the `/testimonial/3` route with the above links. The first link will lead to the `/` route since it is an absolute route. Any route that starts with a `/` is an absolute route. The second link will lead to the route `/testimonial` since it is a relative link that goes up one level from `/testimonial/3` to `/testimonial`. Finally, our third link will go to the `/testimonial/3/edit` page since it will add the path in the `to` prop to the end of the current link since it is a relative link.

Besides the `to` prop, there are also 3 other props that are important to the `Link` component.

#### `replace`

The `replace` prop is a boolean that when set to `true` will cause this link to replace the current page in the browser history. Imagine you have the following browser history.

```unknown
/
/testimonial
/testimonial/3
```

If you click on a link that goes to the `/testimonial/3/edit` page but it has the `replace` property set to `true` your new history will look like this.

```unknown
/
/testimonial
/testimonial/3/edit
```

The page your were currently on was replaced with the new page. This means that if you click the back button on the new page it will bring you back to the `/testimonial` page instead of the `/testimonial/3` page.

#### `reloadDocument`

This prop is another boolean and is very simple. If it is set to `true` your `Link` component will act like a normal anchor tag and do a full page refresh on navigation instead of just re-rendering the content inside your `Routes` component.

#### `state`

The final prop is called `state`. This prop lets you pass data along with your `Link` that does not show up anywhere in the URL. This is something we will cover in more depth when we talk about navigation data so we can ignore it for now.

### `NavLink`

The next element I want to talk about is the `NavLink` component. This component works exactly the same as the `Link` component, but it is specifically for showing active states on links, for example in nav bars. By default if the `to` property of a `NavLink` is the same as the URL of the current page the link will have an `active` class added to it which you can use for styling. If this is not enough you can instead pass a function with an `isActive` parameter to the `className`, or `style` props, or as the children of the `NavLink`.

```jsx
<NavLink
  to="/"
  style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
>
  Home
</NavLink>
```

The `NavLink` also has one prop called `end` which is used to help with nested routing. For example, if we are on the `/testimonial/3` page that means we are rendering the `Book` component which is nested inside our `/testimonial` route. This means that if we have a `NavLink` with a `to` prop set to `/testimonial` it will be considered active. This is because a `NavLink` is considered active if the URL matches the `to` prop of the `NavLink` or if the current `Route` being rendered is inside a parent component that has a `path` that matches the `to` prop of the `NavLink`. If you do not want this default behavior you can set the `end` prop to `true` which will make it so the URL of the page must exactly match the `to` prop of the `NavLink`.

### Manual Navigation

Now sometimes you want to manually navigate a user based on things like submitting a form or not having access to a specific page. For those use cases you will need to either use the `Navigate` component or the `useNavigation` hook.

#### `Navigate` Component

The `Navigate` component is a really simple component that when rendered will automatically redirect the user to the `to` prop of the `Navigate` component.

```jsx
<Navigate to="/" />
```

The `Navigate` component shares all the props of the `Link` component so you can pass it the `to`, `replace`, and `state` props. This component is not really something I use much as more often than not I want to redirect a user based on some form of interaction like a form submission.

#### `useNavigation` Hook

The `useNavigation` hook on the other hand is a hook I use all the time. This hook is a really simple hook that takes no parameters and returns a single `navigate` function which you can use to redirect a user to specific pages. This `navigate` function takes two parameters. The first parameter is the `to` location you want to redirect the user to and the second parameter is an object that can have keys for `replace`, and `state`.

```js
const navigate = useNavigate();

function onSubmit() {
  // Submit form results
  navigate("/testimonial", {
    replace: true,
    state: { bookName: "Fake Title" },
  });
}
```

The above code will redirect the user to the `/testimonial` route. It will also replace the current route in history and pass along some state information as well.

Another way you can use the `navigate` function is to pass it a number. This will allow you to simulate hitting the forward/back button.

```js
navigate(-1); // Go back one page in history
navigate(-3); // Go back three pages in history
navigate(1); // Go forward one page in history
```

### Navigation Data

Finally it is time to talk about passing data between pages. There are 3 main ways you can pass data between pages.

1.  Dynamic Parameters
2.  Search Parameters
3.  State/Location Data

#### Dynamic Parameters

We have already talked about how to use dynamic parameters in URLs by using the `useParams` hook. This is the best way to handle passing information like ids.

#### Search Parameters

Search parameters are all of the parameters that come after the `?` in a URL (`?name=Kyle&age=27`). In order to work with search parameters you need to use the `useSearchParams` hook which works very similarly to the `useState` hook.

```jsx
import { useSearchParams } from "react-router-dom";

export function SearchExample() {
  const [searchParams, setSearchParams] = useSearchParams({ n: 3 });
  const number = searchParams.get("n");

  return (
    <>
      <h1>{number}</h1>
      <input
        type="number"
        value={number}
        onChange={(e) => setSearchParams({ n: e.target.value })}
      />
    </>
  );
}
```

In this example we have an input that as we type in will update the search portion of our URL. For example if our input has the value of 32 our URL will look like `http://localhost:3000?n=32`. The `useSearchParams` hook takes an initial value just like `useState` and in our case our initial value has `n` set to 3. This hook then returns two values. The first value is all our our search parameters and the second value is a function for updating our search parameters. The set function just takes a single argument that is the new value of your search parameters. The first value that contains the search parameters is a bit more confusing, though. This is because this value is of the type `URLSearchParams`. That is why we need to use the `.get` syntax on line 5 above.

#### State/Location Data

The final type of data you can store is state and location data. This information is all accessible via the `useLocation` hook. Using this hook is very simple as it returns one value and takes no parameters.

```js
const location = useLocation();
```

If we have the following URL `http://localhost/testimonial?n=32#id` then the return value of `useLocation` would look like this.

```js
{
  pathname: "/testimonial",
  search: "?n=32",
  hash: "#id",
  key: "2JH3G3S",
  state: null
}
```

This location object contains all the information related to our URL. It also contains a unique key that you can use to do caching if you want to cache information for when a user clicks the back button to come back to a page. You also will notice that we have a state property being returned from `useLocation` as well. This state data can be anything and is passed between pages without being stored in the URL. For example if you click on a `Link` that looks like this:

```jsx
<Link to="/testimonial" state={{ name: "Kyle" }}>
```

then the state value in the location object will be set to `{ name: "Kyle" }`.

This can be really useful if for example you wan to send across simple messages between pages that shouldn't be stored in the URL. A good example of this would be something like a success message that gets sent to the page you are redirected to after creating a new book.

## Routers In Depth

Now that covers 95% of what you need to know about React Router, but the library has a bit more depth still. In the first section of the basics we talked about defining your router and we mentioned the `BrowserRouter` and `NativeRouter`, but those are not the only routers. There are actually 6 routers in total and in this section I will be explaining each of them in depth.

### `BrowserRouter`

To start I will cover the `BrowserRouter` since it is the one we are already familiar with. This is the default router you should use if you are working on a web app and is the router you will use in 99% of all your applications since it covers all the normally routing use cases you have. Each of the other routers I will talk about have very specific use cases where you would want to use them so if you don't fit those use cases then the `BrowserRouter` is what you should use.

### `NativeRouter`

The `NativeRouter` is essentially the equivalent of the `BrowserRouter`, but for React Native. If you are using React Native then this is the router you will want to use.

### `HashRouter`

This router works very similarly to the `BrowserRouter`, but the main difference is that instead of changing the URL to something like `http://localhost:3000/testimonial` it will store the URL in the hash like so `http://localhost:3000/#/testimonial`. As you can see this URL has a `#` after the URL which represents the hash portion of the URL. Anything in the hash portion of the URL is just additional information that usually denotes an id on the page for scrolling purposes since a page will automatically scroll to the element with the id represented by the hash when the page loads.

In React Router this hash is not actually used to store id information for scrolling, but instead it stores information related to the current URL. The reason React Router does this is because some hosting providers do not allow you to actually change the URL of your page. In those very rare circumstances you will want to use the `HashRouter` since the `HashRouter` will not change the actual URL of your page and will only change the hash of your page. If you are able to use any URL with your hosting provider then this is not something you should use.

### `HistoryRouter`

The `HistoryRouter` (currently called `unstable_HistoryRouter`) is a router that allows you to manually control the history object that React Router uses to store all the information related to the history of your application's routing. This history object helps make sure things like the back and forward button in the browser work properly.

This is a router you should probably never use unless you have a very specific reason that you want to overwrite or control the default history behavior of React Router.

### `MemoryRouter`

The `MemoryRouter` is a bit different than the rest of the routers we talked about since, instead of storing information about the current route in the URL of the browser, this router stores information on routing directly in memory. Obviously, this is a very bad router to use for normal routing operations, but this router is incredibly useful when you are writing tests for your application that do not have access to the browser.

Because of how React Router works, you need to have your components wrapped in a router otherwise all your routing code will throw errors and break. This means even if you want to test a single component, you will need to wrap that component inside of a router or it will throw errors. If you are testing your code in a way that it does not have access to the browser (such as unit testing) then the routers we have talked about so far will throw errors since they all depend on the browser for the URL. The `MemoryRouter` on the other hand stores all its information in memory which means it never accesses the browser and is ideal when trying to unit test components. Other than this specific use case, though, this router is never to be used.

### `StaticRouter`

The final router is the `StaticRouter` and this router again has a very specific use case. This router is specifically meant for server rendering your React applications since it takes in a single `location` prop and renders out your application using that `location` prop as the URL. This router cannot actually do any routing and will just render a single static page, but that is perfect for server rendering since you want to just render the HTML of your application on the server and then the client can set up all your routing and so on.

```jsx
<StaticRouter location="/testimonial">
  <App />
</StaticRouter>
```

Sources:
https://www.youtube.com/watch?v=Ul3y1LXxzdU&t=2444s
https://blog.webdevsimplified.com/2022-07/react-router/
