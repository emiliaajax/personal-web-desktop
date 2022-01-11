
// The following code is written while following the code examples on lecture "Installerbara PWAs" from week 15, and therefore, is greatly inspired by those.

const version = '1.0.0'

// Executes during install fase. During the installation of the sw and before it goes to activation fase. Here you can cache resources needed.
self.addEventListener('install', event => {
  console.log('ServiceWorker: Installed version ', version)
  /**
   * Caches resourses during installation of the service worker.
   *
   * @returns {Promise} A promise that resolves to undefined.
   */
  const cacheAssets = async () => {
    // Opens the cache of current version and gets a reference to the opened cache.
    const cache = await self.caches.open(version)
    console.log('ServiceWorker: Caching files')
    // To cache a number of requests, addAll is used that takes an array of requests as arguments. If we only write an url like below, the method automatically makes a get request to this resource, gets a response back and this response will be saved together with the request. A promise is returned.
    return cache.addAll([
      'index.html',
      'css/styles.css',
      'js/components/my-memory-game/images/1.png',
      'js/components/my-memory-game/images/2.png',
      'js/components/my-memory-game/images/3.png',
      'js/components/my-memory-game/images/4.png',
      'js/components/my-memory-game/images/5.png',
      'js/components/my-memory-game/images/6.png',
      'js/components/my-memory-game/images/7.png',
      'js/components/my-memory-game/images/8.png',
      'js/components/my-memory-game/images/memory-background.jpg',
      'js/components/my-flipping-tile/images/tile-back.jpg',
      'js/components/my-chat/images/send-icon.png',
      'js/components/my-chat/images/sound-off.png',
      'js/components/my-chat/images/sound-on.png',
      'js/components/my-chat/images/no-wifi.png',
      'js/components/my-snake-game/images/game-over.png',
      'js/components/my-snake-game/images/no.png',
      'js/components/my-snake-game/images/no-highlighted.png',
      'js/components/my-snake-game/images/yes.png',
      'js/components/my-snake-game/images/yes-highlighted.png',
      'js/components/my-snake-game/images/snake-start-button.png',
      'js/components/my-snake-game/images/snake-text.jpg',
      'js/components/my-chat/audio/235911__yfjesse__notification-sound.wav'
    ])
  }
  // Wait in the installation fase until all the resources are cached. The event in this case is the event in the service worker and waitUntil is a method on this event. As evertyhing happens asynchronously, we don't want the installation fase to be done until all resources is cached and everything is working. Waituntil takes a promise as argument.
  event.waitUntil(cacheAssets())
})

// Next fase is activation. It's good to use this for removing of old caching, for example if the service worker is updated with new version number.
self.addEventListener('activate', event => {
  console.log('ServiceWorker: Activated version', version)
  /**
   * Checks if cache is old by comparing it to current version. If cache differs from current version, the cache is deleted.
   *
   * @returns {Promise} A promise that resolves to undefined.
   */
  const removeCachedAssets = async () => {
    // Reads all keys of versions that's available in the cache.
    const cacheKeys = await caches.keys()
    // Maps over all the keys and checks if it differs from the current version. If it does, the cache is deleted.
    return Promise.all(
      cacheKeys.map(cache => {
        if (cache !== version) {
          console.log('ServiceWorker: Clearing cache', cache)
          return caches.delete(cache)
        }
        return undefined
      })
    )
  }
  // When all is deleted, the activation fase is deleted.
  event.waitUntil(removeCachedAssets)
})

// When the service worker is activated, as soon as the user of the website tries to do some form of network call, for example page reloading or cliking on an iamge, then fetch executes. For every request, fetch will be called. The first thing the code should do when a request is made is to check in cache if request is already cached and in that case gives it back to the browser, and after fetches the resource from the server and caches it again. The downside is that the resource on the server might have changed and the user always gets old code.
self.addEventListener('fetch', event => {
  console.log('ServiceWorker: Fetching')

  /**
   * Tries to fetch the requested resource from the server. If success, the response is sent to the browser and also gets cached. If error occurs, the cached is searched for a match.
   *
   * @param {object} request The requested resource.
   * @returns {Promise}  A promise that resolves to undefined.
   */
  // If there's a request from browser that passes through sw, we look at the request, gets data from the server and caches the data at the same time.
  const cachedFetch = async request => {
    try {
      // Fetch the resource from the server and if success, clones the result. Takes the request the browser created. The response contains the whole response object from the server.
      const response = await fetch(request)
      // Opens the cache of current version and saves the request as key and response as value on the cache. Need to clone as we do not wait for the cache to save the response before returning, as we don't have await. The response returns before saved to cache.
      const cache = await self.caches.open(version)
      cache.put(request, response.clone())
      return response
    } catch (error) {
      // Happens when offline.
      console.log('ServiceWorker: Serving cached result instead')
      // Accesses the cache again and checks if there is a response that corresponds to the exact request. If it has, the response is returned.
      return caches.match(request)
    }
  }

  // Argument is a promise, and the data the promise resolves to, that data is sent to the browser as a response to the request. We get the request with the event.request, this is what the browser send to server and the service workers receive before sending it further.
  event.respondWith(cachedFetch(event.request))
})

// Gets message from the main thread.
self.addEventListener('message', event => {
  console.log('ServiceWorker: Got a message')
})

// If the server pushes data to our service worker after the application has closed. Is used for notifications.
self.addEventListener('push', event => {
  console.log('ServiceWorker: Got a push message from the server')
})
