# Task Overview

You are working with a mid-sized e-commerce company that recently launched a new web-based product catalog for categories such as electronics, books, and home appliances. The current Product Listing page calls an HTTP API to fetch products and renders them directly into the page. The catalog can return around 1,000 items per category, and each item has an image, price, and availability status. The implementation was built quickly, which has led to sluggish performance, repeated network calls, and an inconsistent experience on slow connections. Your goal is to reshape this feature into a more resilient, efficient, and maintainable front-end module.

A product manager has asked you to improve how the listing behaves under real-world usage: frequent searches, repeated visits to the same category, and scrolling through many products. They want the page to feel responsive, use reasonable amounts of bandwidth, and continue to work sensibly even when the network is unreliable. How you structure the JavaScript, how modules interact, and how you manage data and UI updates will be critical to achieving this.

## Objectives

- Provide a smooth search and browsing experience for the product catalog by avoiding unnecessary work and preventing outdated data from replacing fresh results.
- Reuse data intelligently across repeated visits or similar queries so that the page does not always rely on new network responses when equivalent information is already available.
- Ensure that product images and list rendering do not overload the browser or network, especially when many items are present, while still keeping the interface visually clear.
- Handle failures and edge cases so that users see clear feedback when something goes wrong and the page can still make use of any previously loaded information where appropriate.
- Organize the code into clear modules and responsibilities so that future engineers can easily understand, debug, and extend the feature without introducing regressions.

## How to Verify

- Interact with the search input and category controls and observe that the interface reacts predictably, without rapid, redundant requests or flickering results.
- Repeat the same category and search combination and check that previously obtained data is reused when appropriate, while still updating when it becomes stale.
- Scroll through the product list and confirm that the page remains responsive as more items are displayed and that images appear in a way that does not feel heavy or blocking.
- Simulate slow or failing network conditions and confirm that the UI surfaces user-friendly messages, attempts reasonable recovery where possible, and does not leave the page in a broken state.
- Inspect the code structure to see that responsibilities are separated (data access, caching, view updates, coordination), and that the main flows can be understood and tested without navigating tangled logic.

## Helpful Tips

- Consider how to keep data access, storage, and rendering concerns decoupled so that each can evolve independently.
- Think about how to manage user interactions that happen in quick succession and how to avoid wasted work when previous actions are no longer relevant.
- Explore strategies that only load or update what is needed in the user interface at a given moment instead of doing everything upfront.
- Review patterns that help coordinate multiple parts of the page, such as search inputs, lists, and scrolling behavior, without creating tight coupling.
- Reflect on how to detect and respond to transient versus more permanent failures so that the catalog feels robust even when the network is imperfect.