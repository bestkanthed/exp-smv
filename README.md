Set make the componentWillUnmount to set values to null.

Decision on how to user the api

The session in maintianed by the current frontend server.

req.user in in the front end
it checks that requset can only be sent by the realated person
to the document, the user of the document or the expert for the document

All the not required error connecting to the server can be removed by fetching state

Seaarch for default axios settings for axios setCredential

check for error in FETCH_*_FULFILLED and pop and flash error
data : action.payload.data.error ? data : null