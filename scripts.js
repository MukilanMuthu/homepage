/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/","scihub":"https://sci-hub.se/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"hcGy1JSF3qsnQG0p","label":"Design tools","bookmarks":[{"id":"SfefKIN40yMxaHZS","label":"Pixlrx","url":"https://pixlr.com/x/"},{"id":"VNxDALNWm8wA2qUp","label":"Color space","url":"https://mycolor.space/"},{"id":"AIpYcUNE5h4U2VMg","label":"Haikei","url":"https://app.haikei.app/"},{"id":"YwlR00uzklNwhnmg","label":"CSS gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"B1Hxw0pf3myLrnYZ","label":"My tools","bookmarks":[{"id":"9z0lMT30frBwyKjF","label":"Gmail","url":"https://mail.google.com/mail/u/0/#inbox"},{"id":"Ui4QYTT0BP1WSE6o","label":"My repos","url":"https://github.com/MukilanMuthu?tab=repositories"},{"id":"oMMLu7tJoFdp5hPA","label":"ERP IITKGP","url":"https://erp.iitkgp.ac.in"},{"id":"EGAepv4WVBNyS0dW","label":"PDF tools","url":"https://smallpdf.com/pdf-tools"}]},{"id":"1aBa30akH2zZJw7r","label":"Free time","bookmarks":[{"id":"EDLKqW4OUOO0Mx7A","label":"Anix","url":"https://anix.to/home"},{"id":"ZNvuP8To5y8Q8NFV","label":"Aniwatch","url":"https://aniwatch.to/home"},{"id":"hGQm3FWeWrX9zuOn","label":"Ark Jellyfin","url":"https://ark.abusivepanda.com/web/index.html#!/home.html"},{"id":"MMTRFv8G3uaR7xHP","label":"Youtube","url":"https://www.youtube.com/"}]},{"id":"JED12e1lt3E7MS18","label":"Project","bookmarks":[{"id":"pQHzq9w8FvinxLZi","label":"MTP","url":"https://www.overleaf.com/project/651a8bb25dd4742021e62fd1"},{"id":"4TeMo6iINkJZlhVs","label":"Sci-hub","url":"https://sci-hub.se/"},{"id":"lWJCxftDumO4WbE9","label":"Library genesis","url":"https://www.libgen.is/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
