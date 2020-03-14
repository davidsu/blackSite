import { getInitialState } from "../src/store/initialState"
import { sources, customLibStorageKey } from "../src/consts"

describe("initialState", () => {
  beforeEach(() => localStorage.clear())
  it("should extract from localstorage", () => {
    localStorage.setItem("snippet", "dummySnippet")
    localStorage.setItem(customLibStorageKey, sources.static)
    const initialState = getInitialState()
    const expected = {
      snippet: "dummySnippet",
      walkmeUrl: "static",
      walkmeUrlSources: Object.keys(sources).sort()
    }
    expect(initialState).toEqual(expected)
  })

  it("should extract lib version from customLibUrl", () => {
    const customLibUrl =
      "https://cdn.walkme.com/player/lib/walkme_lib_20200309-112014-db3f672e-db3f672e.js"
    const walkmeUrl = "20200309-112014-db3f672e-db3f672e"
    localStorage.setItem(customLibStorageKey, customLibUrl)

    const initialState = getInitialState()
    const expected = {
      snippet: "",
      walkmeUrl,
      walkmeUrlSources: [...Object.keys(sources), walkmeUrl].sort()
    }
    expect(initialState).toEqual(expected)
  })
})
