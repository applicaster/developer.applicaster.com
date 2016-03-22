# Live+ API Documentation

This documentation describes the websocket API of Live+ alpha version.
Both apps (display and admin) use the sock.js library, which requires messages sent to be stringified json data.


## Message protocol - Display part

All messages sent through SockJs by the server or by the client must contain a JSON-encoded string with the following properties:
* **type** (String): type of the message. For each message type, this value corresponds to the name of its section in this document: *connect*, *welcomeMessage*, ...)
* **payload** (Object): an object containing the properties detailed in the *Payload* enumeration of each section of this document


## Client --> Server Messages

### connect
Opens the connection and listens to the first active show found for the given client. If no current active show is found
for the specified client, an error will be returned. If there is an error processing this call, the connection will be
automatically closed to free server resources. Must be issued within 10 seconds after opening the socket; otherwise an
error will be sent and the connection will be closed.
* Payload:
  * **clientId** (String, required): the client for which messages will be displayed.

## Server --> Client Messages

### error
Sent as a response to any unsuccessful calls.
* Payload:
  * **action** (String): the action that caused the error Currently, only *connect* is possible
  * **reason** (String): an explanation of what caused the error, e.g, *invalid show ID*

### connectOk
Sent as response to successful connect calls.
* Payload:
  * **welcomeMessage** (String): text of the show's *welcomeMessage*
  * **additionalConfig** (String): value of the show's *additionalConfig* field

### message
Sent whenever a new message has to be displayed.
* Payload:
  * a Message object, as described above


## Message protocol - admin app

All messages sent through SockJs by the server or by the client must contain a JSON-encoded string with the following properties:
* **type** (String): type of the message. For each message type, this value corresponds to the name of its section in this document: *login*, *createShow*, ...)
* **payload** (Object): an object containing the properties detailed in the *Payload* enumeration of each section of this document


## Client --> Server Messages

### login
Authenticate users. Must be issued within 10 seconds after opening the socket; otherwise an error will be sent and the connection will be closed.
* Payload:
  * **token** (String, required): the OAuth token for the current user

### selectAccountId
Select one of the accounts available for this user. If the user has rights over the provided account, the *dashboard*
message for that account will be sent. Otherwise, an error will be sent.
* Payload:
  * **accountId** (String, required): the ID of the account that the user wants to select

### createShow
Create a new show for the authenticated client.
* Payload:
  * **id** (String, required): UUID for the new show
  * **name** (String, required): name of the show
  * **hashtags** (Array&lt;String&gt;, required): list of hashtags to watch, without the '#'
  * **whitelist** (Array&lt;String&gt;, required): list of whitelisted twitter handles, without the '@'
  * **welcomeMessage** (String, required): first message to be displayed before the tweets
  * **queueShiftPeriod** (Integer, required): amount of time (in seconds) between two consecutive queue shifts (must be a positive integer)
  * **additionalConfig** (String, optional): additional info encoded in a String, to be stored as-is

**NOTE**: the newly created show will not be enabled by default.

### updateShow
Update the fields of a given show.
* Payload:
  * **id** (String, required): the ID of the show to be updated
  * **name** (String, optional): the new value for the *name* field
  * **enabled** (Boolean, optional): *true* for enabling the show, *false* for disabling it
  * **hashtags** (Array&lt;String&gt;, optional): the new value for the *hashtags* field
  * **whitelist** (Array&lt;String&gt;, optional): the new value for the *whitelist* field
  * **welcomeMessage** (String, optional): the new value for the *welcomeMessage* field
  * **queueShiftPeriod** (Integer, optional): the new value for the *queueShiftPeriod* field
  * **additionalConfig** (String, optional): the new value for the *additionalConfig* field

**NOTE**: only the provided optional parameters will be updated (if they are different from the current values). At
least one of them has to be provided.

### followShow
Start 'following' a show, i.e, receiving updates about the queued messages. If another show was being followed already,
it will be unfollowed first.
* Payload:
  * **id** (String, required): the ID of the show to be followed

### unqueueMessage
Delete a message from the message queue of the currently followed show. If no show is being followed, an error will be
sent.
* Payload:
  * **id** (String, required): the ID of the message to be deleted

### rankMessage
Change the rank (order) of a message in the message queue of the currently followed show. If no show is being followed,
an error will be sent.
* Payload:
  * **id** (String, required): the ID of the message to be deleted
  * **rank** (Number, required): the new rank for the message

## Server --> Client Messages

### error
Sent as a response to any unsuccessful calls.
* Payload:
  * **action** (String): the action that caused the error, e.g, *login* or *createShow*
  * **reason** (String): an explanation of what caused the error, e.g, *server error* or *invalid parameters*

### userAccounts
Sent as a response to successful login calls.
* Payload:
  * **accounts** (Array&lt;Account&gt;): list of accounts retrieved from accounts.applicaster.com for the given token

### dashboard
Sent as response to selectAccountId message
* Payload:
  * **client** (Object)
    * **id** (String)
    * **name** (String)
  * **shows** (Array&lt;Show&gt;)
    * **id** (String)
    * **name** (String)
    * **enabled** (Boolean)
    * **hashtags** (Array&lt;String&gt;)
    * **whitelist** (Array&lt;String&gt;)
    * **welcomeMessage** (String)
    * **queueShiftPeriod** (Integer)

### messageQueue
Provides the full message queue for the followed show at a given time. This message will be sent as a response for *followShow* messages, and whenever a change in the queue occurs.
* Payload:
  * **showId** (String): the ID of the currently followed show (for consistency)
  * **currentMessage** (Message): the message currently displayed on the Display application
  * **queue** (Array&lt;Message&gt;): the list of messages currently queued

A Message object has the following fields:
* **id** (String): ID of the message
* **owner** (Object)
  * **name** (String): display name of the creator of the message
  * **thumbUrl** (String): URL for the *avatar* image of the user
* **timestamp** (Number)
* **text** (String): body of the message
* **rank** (Number): determines the order of the message in the queue. Messages with lower values will be displayed before messages with higher values.
