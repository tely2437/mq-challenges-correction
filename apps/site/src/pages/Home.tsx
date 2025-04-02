import { FC } from 'react'
import { Link } from 'react-router-dom'

export const Home: FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <p>Welcome to MQ challenges !</p>
        <p>
          This is an highly advanced application, allowing you to manage some tasks, and mark them
          as done !
        </p>
      </div>
      <div>
        <p>
          <Link to="/todo">This is where all the fun happens !</Link>
        </p>
      </div>
    </div>
  )
}
