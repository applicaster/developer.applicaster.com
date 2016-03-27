# Live+ Architecture

This document provides a description of the general structure of the application
and the Redis data structures used to store its data and send/receive
notifications.

![Live+ Architecture diagram](http://assets-production.applicaster.com.s3.amazonaws.com/static/liveplus/screenshots/Live%2B_architecture_white_bg.png)

## Structure

This application manages two different aspects of the application:

1. **API management**: handling the user (client) actions sent through a SockJS
connection, such as authenticating them, creating a show, deleting a message or
adding a hashtag to a show.

2. **Background show processing**: handling the active (enabled) show's
message queues by retrieving, parsing and then adding relevant Twitter messages
to the queues and periodically shifting them to replace the *currentMessage* by
the lowest ranked element of the queue (and notifying this to connected users
and the display app).

Some utility files are located in the `util` folder for common functionality,
such as logging, notifications and, most importantly, all Redis data access in
`dataStore.js`.

### Api management

The code for this part is located in `src/adminApi`, and its main file is
`apiConnectionHandler.js`. This file basically acts as a handler for individual
SockJS connections. Whenever a message is received, its parameters are checked,
and if  correct, the corresponding data changes are performed through the
**dataStore**.

Also, when notifications about the message queue of a show currently "followed"
by the connected user are received (e.g, new message received, new current
message, etc.), the new queue is proactively sent to the client.

### Background processing

The code for this part is located in `src/background`. The file
`backgroundShowManager.js` is responsible for detecting changes is the *enabled*
state of shows in order to launch/stop their processing. Also when a show is
enabled and a change is performed in  its 'watch settings' (i.e, its hashtags
and whitelist), it takes account of those changes.

The processing of a single show is performed in `showQueueManager.js`. This file
is responsible for launching Twitter Streaming API requests for enabled shows.
More specifically, it sends a request to [POST
statuses/filter](https://dev.twitter.com/streaming/reference/post/statuses/filter)
public Streaming API, setting the *follow* parameter to the list of user IDs
computed from the show's whitelist. This way, all tweets posted by the users of
the whitelist are received. When new tweets are received, they are filtered
depending on the show hashtags and the fact that they contain media or not.
Retained tweets are converted into messages and introduced at the top of the
message queue of the show. This file is also responsible of periodically
shifting the show's message queue and notifying changes to the Api management
part and the display app through Redis.

## Redis usage

[Redis](http://redis.io) usage in this app is twofold: it acts as a database for
storing and retrieving data about clients, shows and messages and it acts as a
message broker through its PubSub functionality to enable loosely-coupled
messaging between the two different parts of the application and between this
application and the display app.

The Redis client used in this project is
[node_redis](https://github.com/NodeRedis/node_redis). In order to use it with
promises instead of callbacks, the
[bluebird](https://github.com/petkaantonov/bluebird) library is used as proposed
in the [node_redis
documentation](https://github.com/NodeRedis/node_redis#promises). The approach
followed with respect to making Redis calls in this application is the
following:

* single calls (e.g, for retrieving a show's data) are directly executed through
the *node_redis* client.
* when several successive calls have to be performed (e.g, for shifting a
  message queue or to retrieve data about all the shows of a client):
  * if the functionality can be implemented by evaluating a
  [LUA script](http://redis.io/commands/eval), i.e, if all accessed keys are
  known in advance, then this approach is used. This has several advantages:
  the script is executed atomically (as a single operation) in Redis, it
  minimizes data transfer and round-trips between the client and Redis, etc.
  * otherwise, the functionality is implemented with several chained `.then()`
  promise calls. If some calls can be performed successively without depending
  on each other's results, a [MULTI/EXEC](http://redis.io/topics/transactions)
  block is used.

### Database

The list below provides a description of all types of keys used by the app to
store data in Redis. For each item, the type of the associated [Redis data
structure](http://redis.io/topics/data-types) and a description of how the app
uses it are provided.

* **client:[CLIENT_ID]:shows** (SET)
  * contains the complete IDs (Redis keys to show hashes) of all the shows
  belonging to the given client.
* **client:[CLIENT_ID]:show:[SHOW_ID]** (HASH)
  * contains the properties of the given show: *name*, *welcomeMessage*, etc.
  The *enabled* property is '0' for false and '1' for true. The whitelist and
  hashtags properties are stored as comma-separated strings, without @ nor #
  prefixes.
* **client:[CLIENT_ID]:show:[SHOW_ID]:message:[MESSAGE_ID]** (HASH)
  * contains the properties of the given message: *timestamp*, *text*, etc.
* **client:[CLIENT_ID]:show:[SHOW_ID]:currentMessage** (HASH)
  * contains the properties of the current message of the given show. Same
  properties and values as the message hash.
* **client:[CLIENT_ID]:show:[SHOW_ID]:messages** (SORTED SET)
  * contains the IDs of all the messages currently present in the queue of the
  given show. The score associated to each ID corresponds to the rank of the
  message in the queue and thus determines its position. When the queue is
  shifted, the element with the lowest score is removed from this sorted set and
  data from the corresponding message hash is copied into the show's
  *currentMessage* hash.
* **enabledShows** (SET)
  * contains the IDs of all the shows currently enabled globally in the platform
  across all clients. It is used by `backgroundShowManager.js` to start
  processing all enabled shows at startup. It also used by the display app to
  get the enabled shows of a given client, byt performing a SINTER between this
  this set ant the client shows set.

### PubSub

Redis [PubSub](http://redis.io/topics/pubsub) (Publish/Subscribe) functionality
provides a very simple message broker that can be used to decouple different
parts of an application or event different applications that depend on each
other. This functionality is used in this application for notifying changes in
the message queue of a given show.

Currently, the following PubSub channels are used:

* **channel:showMessageUpdates**
  * Whenever an action that modifies the message queue of a show is performed
  anywhere in the application, a message is published in this channel. Possible
  payloads:
    * **client:[CLIENT_ID]:show:[SHOW_ID]:newMessage:[MESSAGE_ID]**: sent
    whenever a message is added to the message queue of a show
    * **client:[CLIENT_ID]:show:[SHOW_ID]:deletedMessage:[MESSAGE_ID]**: sent
    whenever a user deletes a message from a show's message queue
    * **client:[CLIENT_ID]:show:[SHOW_ID]:reRankedMessage:[MESSAGE_ID]**: sent
    whenever a user updates the rank of a message in a show's message queue
    * **client:[CLIENT_ID]:show:[SHOW_ID]:newCurrentMessage:[MESSAGE_ID]**:
    sent whenever the current message of a show is updated
  * The `notificationManager.js` file opens a connection to Redis and subscribes
  itself to this channel. Whenever a PubSub message is received from it, it
  parses its payload and it notifies all registered listeners (in this case,
  *apiConnectionHandler* instances).
  * The display app also listens to this channel. It only keeps
  *newCurrentMessage* payloads to know when a new message is available for a
  given show.
