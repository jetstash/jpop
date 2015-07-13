# jpop

A jQuery plugin that integrates Jetstash in via a timed/action based popover or a call-to-action banner.

## install

Add the `jpop.min.js` to your project or from our CDN.

In Jetstash you need to create a form with a required field name of `email`, you may have other fields in the form but at current they cannot be set to required else the entire submission will fail.

## usage

```
$('body').jpop(options);
```

| name       | type         | default                                    | description                                                                  |
| ---------- | -----------  | -----------                                | -----------                                                                  |
| form       | string       | null                                       | Add your form id, this is required!                                          |
| type       | string       | `banner`                                   | Defines which way the plugin operates, either `popover` or `banner`          |
| position   | string       | `top`                                      | Defines banner position, either `top` or `bottom`                            |
| style      | string|bool  | false                                      | Load one of our provided stylesheets, defaults to false                      |
| zindex     | integer      | 8675309                                    | Set the z-index of the popover/jpop-banner                                   |
| show       | bool         | false                                      | Show the on page load                                                        |
| delay      | integer      | 500                                        | Timeout before displaying (this is the default functionality)                |
| scroll     | bool         | false                                      | Display on a scroll event instead of via the timer                           |
| title      | string       | "Subscribe to our email list"              | Call to action for the form                                                  |
| button     | string       | "Submit"                                   | Submission button text                                                       |
| thanks     | string       | "Thank you, your submission was received." | Thank you message displayed after a user signs up                            |

*Check developers console for any errors the plugin might output during usage.*

## styling

### global
```
.jpop-cta {} // Call to Action title
.jpop-form {} // Form container
.jpop-input {} // Input email field
.jpop-btn {} // Submit button
.jpop-error {} // Error message
.jpop-dismiss {} // Dismiss button
```

### banner
```
.jpop-banner {} // Container
.jpop-left {} // Left column
.jpop-right {} // Right column

```

### popover
```
.jpop-popover {} // Container
.jpop-content {} // Inner wrapper for modal
.jpop-backdrop {} // Transparent background overlay
```

## requirements

- jQuery (tested for: 1.11.x or 2.1.x)

## build

Requires npm to update and build the plugin. Run `npm install` to add assets, `gulp` to complete the default build.

## license

MIT

