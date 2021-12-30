# &lt;high-score&gt;

A web component that represents a high score.

## Attributes

### `nickname`

A String with the nickname to be presented on the high score board if corresponding score is among the top five. If no name is given, default name 'Player' will be used.

Default value: `Player`

### `score`

A Number with the score to be compared and then presented on the high score board if among the top five.

Default value: `undefined`

## Example

```html
   <high-score nickname="R0g3r" score="9.557"></high-score>
```
