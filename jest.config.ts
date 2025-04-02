import { getJestProjects } from '@nx/jest'
import { JestConfigWithTsJest } from 'ts-jest'

process.env.TZ = 'UTC'

const config: JestConfigWithTsJest = {
  projects: getJestProjects(),
}

export default config
