# &lt;my-flipping-tile&gt;

A web component representing a flipping tile.

## Attributes

### `disabled`

A boolean attribute which, if present, indicates that the user should not be able to interact with the tile.

Default value: undefined

### `revealed`

A boolean attribute which, if present, reveals the front of the tile.

Default value: undefined

### `invisible`

A boolean attribute which, if present, hides the inner content of the tile.

Default value: undefined

## Events

| Event Name | Fired When           |
| ---------- | -------------------- |
| `flip` | The tile is flipped. |

## Example

```html
<my-flipping-tile revealed>
    <img src="./images/1.png" alt="Earth" />
</my-flipping-tile>
```

![Example](../../../images/my-flipping-tile.gif)
