module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "79"
        }
      }
    ],
    "@babel/preset-react"
  ]
}
