#Communication in-between Plugins and Plugin Communication with DSP's
Communication in between plugins and communication between plugins and DSP's is accomplished by using the `SessionStorage` & `LocalStorage`

If you have a plugin that needs to pass information like contentId's or User Id's for example, you can use `SessionStorage` to save those values for that session or persist the values with `LocalStorage`, once stored all the plugins for this specific app as well as the DSP's it uses can extract those same values to use them accordingly.

Available on:
**Android**: 8.2.1
| **iOS**: 11.1.0

**Examples**

- [Setting/Saving Values (native-iOS)](#setting-values-ios)
- [Getting Values (native-iOS)](#getting-values-ios)
- [Setting/Saving Values (native-Android)](#setting-values-android)
- [Getting Values (native-Android)](#getting-values-android)
- [Setting/Saving Values (ReactNative)](#setting-values-RN)
- [Getting Values (ReactNative)](#getting-values-RN)
- [Setting/Saving Values (DSP)](#setting-values-DSP)
- [Getting Values (DSP)](#getting-values-DSP)

---

## <a name="setting-values-ios"></a>Setting/Saving Values (native-iOS)

SessionStorageUtils has a set function that takes in String values ONLY:

**Saving a String**

```
let sessionStorageUtils = SessionStorageUtils()
let bar = "bar"
_ = sessionStorageUtils.set(key: "foo", value: bar, identifier: "myPluginNamespace.v1")

```

**Saving a String Array**

Use `.description` to save the textual representation of the Array.

```
let sessionStorageUtils = SessionStorageUtils()
let bar = ["bar01","bar02","bar03"]
_ = sessionStorageUtils.set(key: "foo", value: bar.description, identifier: "myPluginNamespace.v1")

```

**Saving a Dictionary**
In case of saving a dictionary, you can use one of the helper functions - `getJSONStringFrom` inside `SessionStorageUtils` to save the `JSON` String

```
let sessionStorageUtils = SessionStorageUtils()
let barToSave: [String: Any] = ["key01": "001", "key02": "002", "key03": "003"]
let barToJsonString = sessionStorageUtils.getJSONStringFrom(dictionary: barToSave) ?? ""
_ = sessionStorageUtils.set(key: "foo", value: barToJsonString, identifier: "myPluginNamespace.v1")

```

## <a name="getting-values-ios"></a>Getting Values (native-iOS)

SessionStorageUtils has a get function that returns String values. You

**Getting a String**

```
let sessionStorageUtils = SessionStorageUtils()
if let retVal = sessionStorageUtils.get(key: "foo", identifier: "myPluginNamespace.v1") {
    print(retVal)
}

```

**Getting a String Array**
Since `SessionStorage` saves all values as Strings, you need to parse the string back into the object type you want to work with. In this case a String Array.
You can use the helper function `getDictFrom` inside `SessionStorage` as shown below.

```
let sessionStorageUtils = SessionStorageUtils()
if let retVal = sessionStorageUtils.getStringArray(key: "foo", identifier: "myPluginNamespace.v1") {
    print(retVal)
}

```

**Getting a Dictionary**

To retrieve a dictionary previously saved, use the helper function `getDictFrom` after you retrieve the `JSON` string.

```
if let retVal = sessionStorageUtils.getDictionary(key: "foo", identifier: "myPluginNamespace.v1") {
    print(retVal)
}

```

**Getting ALL Values from ALL namespaces**

You can retrieve ALL values without having to specify keys:

```
if let retVal = sessionStorageUtils.getAll() {
     print(retVal)
}

```

## <a name="setting-values-android"></a>Setting/Saving Values (native-Android)

SessionStorage has a set function that takes in String values ONLY:

**Saving a String**

```
SessionStorageUtil.set("foo", "bar", "myPluginNamespace.v1")
```

**Saving a String Array or Object**

```
// Array
SessionStorageUtil.set("foo", listOf("foo", "bar").toString(), "myPluginNamespace.v1")

// Object
SessionStorageUtil.set("foo", mapOf("foo" to "bar").toString(), "myPluginNamespace.v1")

```

## <a name="getting-values-android"></a>Getting Values (native-Android)

Since `SessionStorage` saves all values as Strings, you need to parse the string back into the object type you want to work with.

**Getting a String**

```
val bar = SessionStorageUtil.get("foo", "myPluginNamespace.v1")
```

**Getting a String Array or Object**

```
// Since everything is stored as a String you would need to parse it with tools like GSON

// Array
val type = object : TypeToken<List<String>>() {}.type
val retVal: List<String> = gson.fromJson(SessionStorageUtil.get("foo", "myPluginNamespace.v1"), type)

// Object
val type = object : TypeToken<Map<String, String>>() {}.type
val retVal: Map<String, String> = gson.fromJson(SessionStorageUtil.get("foo", "myPluginNamespace.v1"), type)

```

## <a name="setting-values-RN"></a>Setting/Saving Values (ReactNative)

Using `ZPReactNativeSessionStorageBridge`

**Note:** all values must be stringified, so there is no difference between saving a plain String, or a String Array or a Dictionary. At the end a String is being saved.

**Saving a Value**

```
NativeModules.SessionStorage.setItem("foo", "bar", "myPluginIdentifier.001");

```

## <a name="getting-values-RN"></a>Getting Values (ReactNative)

Using `ZPReactNativeSessionStorageBridge`

**Note:** all values returned will be stringified, so there is no difference between retrieving a plain String, or a String Array or a Dictionary. At the end a String is being returned.

**Getting a Value**

```
var bar = NativeModules.SessionStorage.getItem("foo", "myPluginIdentifier.001");
```

## <a name="setting-values-DSP"></a>Setting/Saving Values (DSP)

The `nativeBridge` available to all Zapp Pipes data source providers allows you to interact with the native storage modules, both SessionStorage and LocalStorage.
All values must be strings, so if you want to store a javascript object or an array, you will have to stringify it. Values returned are also strings, so you will need to call `JSON.parse` on the returned values to get the stored javascript object or array.

The namespace parameter is optional. If ommited, it will result in using the Applicaster namespace by default.
In order to make sure the properties you set are kept to your plugin, using your own namespace is highly encouraged.

**Saving a Value**

```javascript
// Session Storage
nativeBridge.setSessionStoreItem("foo", "bar", "myPluginIdentifier.001");

// Local Storage
nativeBridge.setLocalStoreItem("foo", "bar", "myPluginIdentifier.001");
```

## <a name="getting-values-DSP"></a>Getting Values (DSP)

**Getting a Value**

```javascript
// Session Storage
nativeBridge.getSessionStoreItem("foo", "myPluginIdentifier.001"); // returns string or undefined
nativeBridge.getAllItems();

// Local Storage
nativeBridge.getLocalStoreItem("foo", "myPluginIdentifier.001"); // returns string or undefined
```
