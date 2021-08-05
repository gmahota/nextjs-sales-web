const initialState = [
  'transparent',
  'black',
  'white',
  'gray',
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink'
]

export default function colors(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
