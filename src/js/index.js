/**
 * The main script file of the application.
 *
 * @author Emilia Hansson <eh222yn@student.lnu.se>
 * @version 1.0.0
 */

// Checks if the browser supports service workers, that is, if the navigator object contains a service worker object. This is called feature detection and this means that we check if  a feature is available before we use it. As we use ECMA script modules, the browser will also support service workers.
if ('serviceWorker' in navigator) {
  // Executes when the site is done loading, so this code will run when the whole site has been loaded. As we use ECMA script modules (as we have defer by default), the execution doesn't start until the script has loaded, so probably wont need to listen to load.
  window.addEventListener('load', async () => {
    try {
      // Registers the service worker. As seen, the service worker is located at the root to be able to listen to the whole site. Navigator is the browser. You can add configuration parameters to adjust scope, but you can only make the scope smaller.
      const registration = await navigator.serviceWorker.register('./serviceworker.js')
      // The registration.scope will be the site, example localhost:3000.
      console.log('ServiceWorker: Registration successful with scope: ', registration.scope)
    } catch (error) {
      console.log('ServiceWorker: Registration failed: ', error)
    }
  })
}
