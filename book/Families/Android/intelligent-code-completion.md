# Family syntax intelligent code completion

### Creating new Family XML:

Add new XML file to android\_generic\_app. Name of file should fit pattern **FAMILY_** + FAMILY_NUMBER + **.xml**. Please do not use any marketing names of the families in the code just number associetad with the Family. Current Family numbers are:

* **Colorado** - FAMILY 1
* **Rhine** - FAMILY 4

Start your document with **Family** xml tag and add inteligent code completion as follows:
```
<Family xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="family_schema.xsd">
```
Intelligent code completion should start work at that point

### Errors and warnings:
 After adding namespaces it should show you errors and warnings about missing attributes and elements - example below.

![errors.png](./errors.png)


### Autofill XML elements:

![element.png](./element.png)

![components.png](./components.png)

### Autofill XML attributes:

![attribute.png](./attribute.png)

### Autofill XML predefined values:

![values.png](./values.png)


### Notes:

Please bare in mind whenever you change Family Entity you should've update family_schema.xsd file as well.
