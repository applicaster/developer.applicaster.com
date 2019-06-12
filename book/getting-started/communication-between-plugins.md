#Communication in-between Plugins and Plugin Communication with DSP's
Communication in between plugins and communication between plugins and DSP's is accomplished by using the `SessionStorage` & `LocalStorage`

If you have a plugin that needs to pass information like contentId's or User Id's for example, you can use `SessionStorage` to save those values for that session or persist the values with `LocalStorage`, once stored all the plugins for this specific app as well as the DSP's it uses can extract those same values to use them accordingly.

**Examples**

* [Setting/Saving Values (native-iOS)](#setting-values-ios)
* [Getting Values (native-iOS)](#getting-values-ios)
* [Setting/Saving Values (native-Android)](#setting-values-android)
* [Getting Values (native-Android)](#getting-values-android)
* [Setting/Saving Values (ReactNative)](#setting-values-RN)
* [Getting Values (ReactNative)](#getting-values-RN)
* [Setting/Saving Values (DSP)](#setting-values-DSP)
* [Getting Values (DSP)](#getting-values-DSP)

***


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
// Using default namespace
SessionStorage.set("foo", "bar")

// Using custom namespace (optional)
SessionStorage.set("foo", "bar", "foo.bar")
```

**Saving a String Array or Object**
 
```
// Array
SessionStorage.set("foo", listOf("foo", "bar").toString())

// Object
SessionStorage.set("foo", mapOf("foo" to "bar").toString())

```

## <a name="getting-values-android"></a>Getting Values (native-Android)
Since `SessionStorage` saves all values as Strings, you need to parse the string back into the object type you want to work with.

**Getting a String**

```
// Using default namespace
val bar = SessionStorage.get("foo")

// Using custom namespace (optional)
val bar = SessionStorage.get("foo", "foo.bar")
```

**Getting a String Array or Object**

```
// Since everything is stored as a String you would need to parse it with tools like GSON

// Array
val type = object : TypeToken<List<String>>() {}.type
val retVal: List<String> = gson.fromJson(SessionStorage.get("foo"), type)

// Object
val type = object : TypeToken<Map<String, String>>() {}.type
val retVal: Map<String, String> = gson.fromJson(SessionStorage.get("foo"), type)

// Array (with custom namespace)
val type = object : TypeToken<List<String>>() {}.type
val retVal: List<String> = gson.fromJson(SessionStorage.get("foo", "foo.bar"), type)

// Object (with custom namespace)
val type = object : TypeToken<Map<String, String>>() {}.type
val retVal: Map<String, String> = gson.fromJson(SessionStorage.get("foo", "foo.bar"), type)

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

**Saving a Value**

```
nativeBridge.setSessionStoreItem('foo', "bar", 'myPluginIdentifier.001')

```

## <a name="getting-values-DSP"></a>Getting Values (DSP)


**Getting a Value**

```
nativeBridge.getSessionStoreItem('foo','myPluginIdentifier.001')
```
