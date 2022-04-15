
// The following code is written while following the code examples on lecture "Installerbara PWAs" from week 15, and therefore, is greatly inspired by those examples.

const version = '1.0.0'

self.addEventListener('install', event => {
  console.log('ServiceWorker: Installed version ', version)
  /**
   * Caches resourses during installation of the service worker.
   *
   * @returns {Promise} A promise that resolves to undefined.
   */
  const cacheResources = async () => {
    const cache = await self.caches.open(version)
    console.log('ServiceWorker: Caching resources')
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
  event.waitUntil(cacheResources())
})

self.addEventListener('activate', event => {
  console.log('ServiceWorker: Activated version', version)
  /**
   * Checks if cache is old by comparing it to current version. If cache differs from current version, the cache is deleted.
   *
   * @returns {Promise} A promise that resolves to undefined.
   */
  const removeCachedResources = async () => {
    const cacheKeys = await caches.keys()
    return Promise.all(
      cacheKeys.map(cache => {
        if (cache !== version) {
          console.log('ServiceWorker: Clearing cache', cache)
          return self.caches.delete(cache)
        }
        return undefined
      })
    )
  }
  event.waitUntil(removeCachedResources())
})

self.addEventListener('fetch', event => {
  console.log('ServiceWorker: Fetching')
  /**
   * Tries to fetch the requested resource from the server. If success, the response is sent to the browser and also saved to cache. If error occurs, the cache is searched for a match.
   *
   * @param {object} request The requested resource.
   * @returns {Promise}  A promise that resolves to a Response.
   */
  const fetchAndCacheMeIfYouCan = async request => {
    try {
      const response = await fetch(request)
      const cache = await self.caches.open(version)
      cache.put(request, response.clone())
      return response
    } catch (error) {
      console.log('ServiceWorker: Serving cached result instead')
      return self.caches.match(request)
    }
  }
  event.respondWith(fetchAndCacheMeIfYouCan(event.request))
})
