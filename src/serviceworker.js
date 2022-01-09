
const version = '1.0.0'

self.addEventListener('install', event => {
  console.log('ServiceWorker: Installed version ', version)
  /**
   * Bla bla.
   *
   * @returns {*} Bla bla.
   */
  const cacheAssets = async () => {
    const cache = await self.caches.open(version)
    console.log('ServiceWorker: Caching files')
    return cache.addAll([
      './index.html',
      './css/styles.css',
      './js/components/my-memory-game/images/1.png',
      './js/components/my-memory-game/images/2.png',
      './js/components/my-memory-game/images/3.png',
      './js/components/my-memory-game/images/4.png',
      './js/components/my-memory-game/images/5.png',
      './js/components/my-memory-game/images/6.png',
      './js/components/my-memory-game/images/7.png',
      './js/components/my-memory-game/images/8.png',
      './js/components/my-memory-game/images/memory-background.jpg',
      './js/components/my-flipping-tile/images/tile-back.jpg',
      './js/components/my-chat/images/send-icon.png',
      './js/components/my-chat/images/sound-off.png',
      './js/components/my-chat/images/sound-on.png',
      './js/components/my-snake-game/images/game-over.png',
      './js/components/my-snake-game/images/no.png',
      './js/components/my-snake-game/images/no-highlighted.png',
      './js/components/my-snake-game/images/yes.png',
      './js/components/my-snake-game/images/yes-highlighted.png',
      './js/components/my-snake-game/images/snake-start-button.png',
      './js/components/my-snake-game/images/snake-text.jpg'
    ])
  }
  event.waitUntil(cacheAssets())
})

self.addEventListener('activate', event => {
  console.log('ServiceWorker: Activated version', version)
  /**
   * Bla bla bla.
   *
   * @returns {*} Bla bla.
   */
  const removeCachedAssets = async () => {
    const cacheKeys = await caches.keys()
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
  event.waitUntil(removeCachedAssets)
})

self.addEventListener('fetch', event => {
  console.log('ServiceWorker: Fetching')
  /**
   * Bla bla.
   *
   * @param {*} request Bla bla.
   * @returns {*}  bla bla
   */
  const cachedFetch = async request => {
    try {
      const response = await fetch(request)
      const cache = await self.caches.open(version)
      cache.put(request, response.clone())
      return response
    } catch (error) {
      console.log('ServiceWorker: Serving cached result')
      return caches.match(request)
    }
  }
  event.respondWith(cachedFetch(event.request))
})

self.addEventListener('message', event => {
  console.log('ServieWorker: Got a message')
})

self.addEventListener('push', event => {
  console.log('ServiceWorker: Got a push message from the server')
})
