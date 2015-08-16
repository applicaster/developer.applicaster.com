# Developers Docs Style Guide

This showcases the devleoper documenation style guide. For each section can 
see how it was written in Markdown and its current HTML preview as it appears
on the website.

### Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

### Text styling

```markdown
This is a paragraph example with **bold** and *italic* styles.

Italicize text by surrounding it in *asterisks* or _underscores_.
Bold text by surrounding it with **double asterisks** or __double underscores__.
Combine with **_double asterisks plus underscores_**.
Strike-through text with ~~double tildes~~.
Superscript contiguous text with carrots like x^2y, surround with parentheses for
more [This is an external link to Google](http://www.google.com/)
```

This is a paragraph example with **bold** and *italic* styles.

Italicize text by surrounding it in *asterisks* or _underscores_.
Bold text by surrounding it with **double asterisks** or __double underscores__.
Combine with **_double asterisks plus underscores_**.
Strike-through text with ~~double tildes~~.
Superscript contiguous text with carrots like x^2y, surround with parentheses for
more [This is an external link to Google](http://www.google.com/)


### Lists

```markdown
#### Unordered Lists

* Thing one with an asterisk
+ Thing two with a plus
- Thing three with a minus

#### Ordered Lists

1. The first order of business
2. The second order of business
  * The first part of the 2nd order
  * The second part of the 2nd order
3. The third order of business
```

#### Unordered Lists

* Thing one with an asterisk
+ Thing two with a plus
- Thing three with a minus

#### Ordered Lists

1. The first order of business
2. The second order of business
  * The first part of the 2nd order
  * The second part of the 2nd order
3. The third order of business

### Images

```markdown
![An image with alt text](./images/docs.jpg)
```

![An image with alt text](./images/docs.jpg)

### Code

``````markdown
```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

```ruby
s = "Ruby syntax highlighting";
puts s
```
``````

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```
```

```ruby
s = "Ruby syntax highlighting";
puts s
```



### Tables

```markdown
column A | column B | column C | column D
-------- | -------- | -------- | --------
1A       | 1B       | 1C       | 1D
2A       | 2B       | 2C       | 2D
3A       | 3B       | 3C       | 3D
```

column A | column B | column C | column D
-------- | -------- | -------- | --------
1A       | 1B       | 1C       | 1D
2A       | 2B       | 2C       | 2D
3A       | 3B       | 3C       | 3D


### Blockquotes

```markdown
> The data we have is not the data we want, and the data we need is not the data
```


> The data we have is not the data we want, and the data we need is not the data

### Horizontal rule

```markdown
***
```

***



