let wait = ms => new Promise((resolve) => setTimeout(resolve, ms))

let retryPromise = (times, interval, func) => {
  return func()
  .catch(e => {
    if (times === 0) {
      throw e;
    } else {
      return wait(interval).then(() =>
        retryPromise(times - 1, interval, func)
      );
    }
  })
};


function login (session, appname, log) {
  return session.initLogin(appname)
    .then(initLogin => {
      log(`Visit ${initLogin.authUrl} within 30 seconds and authorize the app. 1 year renewable token is recommended`)
      return retryPromise(
        30,
        1000,
        () => session.resumeLogin(initLogin.token)
      )
    })
    .then(() => console.log('le ye'))
    .then(({ token }) => ({
      token
    }))
}

module.exports = login
