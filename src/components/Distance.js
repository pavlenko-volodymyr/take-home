import React from 'react'

export default ({howFar}) => {
  if (howFar) {
    return null
  }
  return <div>You're {howFar} miles away from USA</div>
}