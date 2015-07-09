# jpop

A jQuery plugin that integrates Jetstash in via a timed/action based popover or a call-to-action banner.

## install


## usage

```
$('body').jpop(options);
```

| name       | type         | default     | description                                                                  |
| ---------- | -----------  | ----------- | -----------                                                                  |
| type       | string       | `popover`   | Defines which way the plugin operates, either `popover` or `banner`          |
| position   | string       | `top`       | Defines banner position, either `top` or `bottom`                            |
| style      | string|bool  | false       | Load one of our provided stylesheets, defaults to false                      |
| show       | bool         | false       | Show the on page load                                                        |
| delay      | integer      | 500         | Timeout before displaying (this is the default functionality)                |
| scroll     | bool         | false       | Display on a scroll event instead of via the timer                           |

## styling

### banner
```
.jpop-banner {}

```

### popover
```
.jpop-popover {}
```

## requirements

- jQuery (tested for: 1.11.x or 2.1.x)

## license

MIT

