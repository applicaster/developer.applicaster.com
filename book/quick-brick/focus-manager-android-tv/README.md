## Focus Manager on Android TV

This document aims to provide information regarding the new focus manager released for the Android TV platform.

### Why creating a new focus manager for Android TV ?

Initially, Android TV and the web based platforms both relied on the same idea for the focus manager: measuring where items are, and deciding what next to focus based on the structure of the content, and the physical placement of the focusable items on the screen.

On Android TV, this turned out to cause a major performance hit. So we decided to refactor the focus manager on Android TV, to improve performances, and provide a more effective API.

### How does it work

The new focus manager on Android TV relies on a simple idea: each Focusable item needs to provide the reference of the React node to focus next, based on the direction of the navigation.

```jsx
function MyComponent(props) {
  const button1Ref = React.useRef(null);
  const button2Ref = React.useRef(null);

  return (
    <View style={ { flex: 1, flexDirection: "column"} }>
      <Focusable ref={button1Ref} nextFocusDown={button2Ref} />
      <Focusable ref={button2Ref} nextFocusUp={button1Ref}>
    <View>
  )
}
```

This way, each plugin developer can very easily and very effectively state which focus needs to be assigned when the user is pressing on the D-pad buttons, or pressing on them.

The Focusable component doesn't render anything. it simply holds the ability to be focused. You need to declare in its children prop what needs to be render. This takes a function which passes a boolean indicating the focused state, which could be used for styling for instance.

```javascript

  return (
    <Focusable ref={ref} nextFocusDown={upRef}>
      {focused => <View style={ { backgroundColor: focused ? "red" : "grey" } }>}
    <Focusable>
  )

```

This child function also provides a `parentFocus` object which can be used to delegate the attribution to the next focus in a given direction to what the parent Focusable is declaring. Indeed, Focusable can be nested. Imagine a screen where you have a navbar, and a main section with 3 buttons laid out on top of one another. You want the focus to go down from the navbar to the main section and its top button, and up from the top button to the navbar:

```javascript

function MyScreen(props) {
  const navRef = React.useRef(null);
  const mainRef = React.useRef(null);
  const buttonRefs = React.useRef([]);

  return (
    <View>
      <Focusable ref={navRef} nextFocusDown={mainRef}>
        { (focused, parentFocus) => <NavBar {...{ focused, parentFocus} } />}
      </Focusable>
      <Focusable ref={mainRef} nextFocusUp={navRef}>
        { (focused, parentFocus) => buttons.map((button, index) => (
          <Focusable
            ref={buttonRefs[index]}
            nextFocusUp={ buttonRefs?.[index - 1] || parentFocus.nextFocusUp}
            nextFocusDown={ buttonRefs?.[index + 1] }
            >
            { (focused) => <Button state={focused} >}
          </Focusable>
        ))}
      </Focusable>
    </View>
  )
}

```

In reality, your children node are likely to be in another React component. be sure to pass this `parentFocus` prop to allow navigation to work outside of your screen or component. You will also need to assign focus to the focusable components, when your parent is acquiring focus. You can easily do this by using our `useInitialFocus` hook

```javascript
function MyScreen(props) {
  const navRef = React.useRef(null);
  const mainRef = React.useRef(null);

  return (
    <View>
      <Focusable ref={navRef} nextFocusDown={mainRef}>
        {(focused, parentFocus) => <NavBar {...{ focused, parentFocus }} />}
      </Focusable>
      <Focusable ref={mainRef} nextFocusUp={navRef}>
        {(focused, parentFocus) => (
          <FocusableButtons focused={focused} parentFocus={parentFocus} />
        )}
      </Focusable>
    </View>
  );
}
```

```javascript
function FocusableButtons({ focused, parentFocus }) {
  const buttonRefs = React.useRef([]);
  useInitialFocus(focused, buttonRefs[0]);

  return buttons.map((button, index) => (
          <Focusable
            ref={buttonRefs[index]}
            nextFocusUp={ buttonRefs?.[index - 1] || parentFocus.nextFocusUp}
            nextFocusDown={ buttonRefs?.[index + 1] }
            >
            { (focused) => <Button state={focused} >}
          </Focusable>
        ))
}

```

This hook also allows to memorize which nested focusable was selected, and restore that when going back to that component. The hook will return the update function that you will need to call with the current index. The best way to do it is to call the updater function on every onFocus.

```javascript
function FocusableButtons({ focused, parentFocus }) {
  const buttonRefs = React.useRef([]);

  const initialFocusOptions = {
    withStateMemory: true
    refsList: buttonRefs,
  }

  const updateFocusedIndex = useInitialFocus(focused, buttonRefs[0], initialFocusOptions);

  const onFocus = (element, renderArgs) => {
    const { index } = renderArgs;

    updateFocusedIndex(index);
  };

  return buttons.map((button, index) => (
          <Focusable
            ref={buttonRefs[index]}
            onFocus={onFocus}
            nextFocusUp={ buttonRefs?.[index - 1] || parentFocus.nextFocusUp}
            nextFocusDown={ buttonRefs?.[index + 1] }
            >
            { (focused) => <Button state={focused} >}
          </Focusable>
        ))
}
```

Last but not Least, since creating these lists of Focusable is a fairly common usecase, we've wrapped up most of the required logic around `FlatList` with our focusable, and expose a ready to use component called `FocusableList`.

```javascript
function FocusableButtons({ focused, parentFocus }) {
  const flatListRef = React.useRef(null);

  function renderItem({ item, index, focused, parentFocus }) {
    return <Button state={focused} button={item} key={index} />;
  }

  function onListElementPress(element, { item, index }) {
    // do something with the focused node or the item in the data
  }

  function onListElementFocus(element, { item, index }) {
    // do something when an item is focused, for instance scroll
    // to that index
    flatListRef?.current.scrollToIndex?.({
      animated: true,
      index,
    });
  }

  return (
    <FocusableList
      focused={focused}
      ref={flatListRef}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onListElementPress={onListElementPress}
      onListElementFocus={onListElementFocus}
      {...{ ...parentFocus }}
    />
  );
}
```

### API - how to use

@applicaster/zapp-react-native-utils/focusManager

- `useInitialFocus`: React hook which will set the provided initialRef as focused when the component is acquiring focus itself.
  Params:
  - `focused: Boolean` flag which indicates whether or not the current component is focused
  - `initialRef: React.Ref` Reference of the children focusable which needs to acquire focus when the component acquires focus itself
  - `options`:
    - `withStateMemory: Boolean` flag to allow this hook to remember the previously selected children focusable, and restore it next time the component acquires focus
    - `refsList`: array of refs used. This is needed if the above option is set to true, in order to restore focus when navigating back to the component

* `useFocusEffect`: React hook called on each focused state change. The syntax is the same as for useEffect:
  React component used to allow focus to be acquired

```jsx
import { useFocusEffect } from "@applicaster/zapp-react-native-utils/focusManager";

function MyComponent(props) {
  useFocusEffect(() => {
    // Invoke on focused changing to true
    return () => {
      //  Invoke on focused changes to false
    }
  }, [props.focused])

  return (
    <Focusable {...focusableProps}>
    { (focused, parentFocus) => ...}
    </Focusable>
  )
}
```

@applicaster/zapp-react-native-ui-components/Components/Focusable

Usage:

```javascript
import { Focusable } from "@applicaster/zapp-react-native-ui-components/Components/Focusable";

function MyComponent(props) {

  return (
    <Focusable {...focusableProps}>
    { (focused, parentFocus) => ...}
    </Focusable>
  )
}
```

```
ParentFocus = {
  nextFocusDown: React.Ref,
  nextFocusUp: React.Ref,
  nextFocusLeft: React.Ref,
  nextFocusRight: React.Ref,
}
```

Here are the props for the Focusable component

- `ref: React Ref for the focusable`
- `children: (focused: boolean, parentFocus: ParentFocus) => React.Node`
  As explained in the examples above, the children of the Focusable component needs to be a function, and it will inject the focused state as well as the next focus values for the parent

- `id: String`
  each focusable needs to have a **unique** string identifier.

- `nextFocusUp?: React.Ref`
- `nextFocusDown?: React.Ref`
- `nextFocusLeft?: React.Ref`
- `nextFocusRight?: React.Ref`
  References of the react node where the next navigation should go in each direction. if left undefined, focus won't move. assign it to parentFocus.nextFocus<Up|Down|Left|Right> to delegate the selection of the next focusable in a given direction to what is set on the parent

- `onFocus: (React.Ref) => void`
  Function called when the center key of the D-pad is pressed. will be invoked with ref of the currently focused focusable

- `onBlur: (React.Ref) => void`
  Function called when a Focusable is losing focused. will be invoked with the ref of the focusable losing focus

- `onPress: (React.Ref) => void`
  Function called when a Focusable is acquiring focus. will be invoked with the ref of the focusable acquiring focus

@applicaster/zapp-react-native-ui-components/Components/FocusableList
React component to render a list of focusable, using React Native's FlatList component.

_While Focusable can be used on all platforms, FocusableList can only be used on Android TV for now_

usage

```javascript
import { FocusableList } from "@applicaster/zapp-react-native-ui-components/Components/FocusableList";

function MyComponent(props) {
  return <FocusableList {...focusableListProps} />;
}
```

This component is basically wrapper around React Native's FlatList component, so it accepts all the props available to that component. You can see the list of available props here https://reactnative.dev/docs/flatlist#props

On top of this, this component is accepts the following props

**Items with the \* are required**

- `*focused: boolean` -
  Focused flag from the parent Focusable that needs to be forwarded.

- `*renderItem: ({ item, index: number, focused: boolean, parentFocus: ParentFocus, parentRef: React.Ref }) => React.Node`
  This prop exists in the FlatList component, but we are overloading it with additional arguments which can be useful in this context. On Top of the data to render, and the index, you also have access to the focused state, the parentFocus object described above, and the ref of the parent focusable

- `ref: React.Ref`
  React Ref passed to the FocusableList. This will be forwarded to the underlying `Flatlist` and can be used to invoke the FlatList's methods

- `horizontal: boolean`
  Optional prop to toggle on if the FlatList needs to render horizontally

- `numColumns: number`
  Optional prop to display the list horizontally as a grid

- `onListElementFocus: (React.Ref, { item, index }) => void`
  This function will be called when an element of the list acquires focus. This is invoked with the ref of the focused element, and the underlying data from the FlatList's `renderItem` function

- `onListElementBlur: (React.Ref, { item, index }) => void`
  This function will be called when an element of the list loses focus. This is invoked with the ref of the focused element, and the underlying data from the FlatList's `renderItem` function

- `onListElementPress: (React.Ref, { item, index }) => void`
  This function will be called when an element of the list has the focus and the center key of the D-pad is pressed. This is invoked with the ref of the focused element, and the underlying data from the FlatList's `renderItem` function

- `*keyExtractor: (item, index) => string`
  Function used to retrieve a unique id to pass to each focusable element. It is invoked with the item and index from the FlatList `renderItem` function

- `nextFocusDown: React.Ref<any>`
- `nextFocusUp: React.Ref<any>`
- `nextFocusRight: React.Ref<any>`
- `nextFocusLeft: React.Ref<any>`
  References of the react node where the next navigation should go in each direction. if left undefined, focus won't move. assign it to parentFocus.nextFocus<Up|Down|Left|Right> to delegate the selection of the next focusable in a given direction to what is set on the parent

- `focusableItemProps: {}`
  Optional prop forwarded to the underlying `Focusable` elements created inside the FlatList
