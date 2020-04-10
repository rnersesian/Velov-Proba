import React, { useReducer } from "react"
import localStorage from "../utils/localStorage"

const ProjectContext = React.createContext()

// Set the default db value with the initial state
localStorage.defaults(localStorage.initialState).write()

const reducer = (state, action) => {
  console.log(action)
  if (action.key) {
    localStorage.save(action.type, action.value, action.key)
    return { ...state, [action.type]: { ...state[action.type], [action.key]: action.value } }
  } else {
    localStorage.save(action.type, action.value)
    return { ...state, [action.type]: action.value }
  }
}

export const ProjectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, localStorage.getState())

  return <ProjectContext.Provider value={{ state, dispatch }}>{children}</ProjectContext.Provider>
}

export default ProjectContext
