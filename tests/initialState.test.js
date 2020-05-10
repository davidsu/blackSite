import { getInitialState } from "../src/store/initialState"
import { snippetFiles, sources, customLibStorageKey } from "../src/consts"

describe("initialState", () => {
  beforeEach(() => localStorage.clear())
  it("should extract from localstorage", () => {
    localStorage.setItem("snippet", "dummySnippet")
    localStorage.setItem(customLibStorageKey, sources.static)
    const initialState = getInitialState()
    const expected = {
      snippet: "dummySnippet",
      snippetFiles,
      isUsingLocalPrelib: false,
      isReduxStackTraceOn: false,
      walkmeUrl: {
        url: "static",
        sources: Object.keys(sources).sort()
      },
      qaFeatures: [],
      customUserSettings: {
        env: null,
        guid: null,
        url: null
      }
    }
    expect(initialState).toEqual(expected)
  })

  it("should extract lib version from customLibUrl", () => {
    const customLibUrl =
      "https://cdn.walkme.com/player/lib/walkme_lib_20200309-112014-db3f672e-db3f672e.js"
    const url = "20200309-112014-db3f672e-db3f672e"
    localStorage.setItem(customLibStorageKey, customLibUrl)

    const initialState = getInitialState()
    const expected = {
      snippet: "",
      snippetFiles,
      isReduxStackTraceOn: false,
      isUsingLocalPrelib: false,
      walkmeUrl: {
        url,
        sources: [...Object.keys(sources), url].sort()
      },
      qaFeatures: [],
      customUserSettings: {
        env: null,
        guid: null,
        url: null
      }
    }
    expect(initialState).toEqual(expected)
  })
})
