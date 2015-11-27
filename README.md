# Fancy.queue
basic queue plugin for Fancy.

## usage
```javascript
var q = Fancy.queue(); // starts private queue
Fancy.queue(function(){
    console.log("Queue 1");
    return false; // will prevent running next in queue
}); // will add function to global queue
Fancy.queue.next() // will run next for global queue and also enable queue to be run by "Fancy.queue"
