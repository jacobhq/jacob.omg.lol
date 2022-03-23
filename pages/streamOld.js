import React from 'react'
import YouTube from 'react-youtube'
 
// Optional component to be rendered
// when you're not streaming
function OfflineComponent() {
  return (
    <div>
      <p>I am offline now, but checkout my stream on Fridays at 5 PM EST</p>
    </div>
  )
}
 
function App() {
  return (
      <YouTube videoId="IJJ2D0qlAJs" />
  )
}
 
export default App