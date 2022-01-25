import { spawn } from 'child_process'
import { projectRoot } from './paths'

export function withTaskName(
  displayName: string,
  taskFunction: (...args: any[]) => any,
  description?: string
) {
  return Object.assign(taskFunction, { displayName, description })
}

export async function run(commandStr: string) {
  return new Promise<void>((resolve) => {
    const [command, ...args] = commandStr.split(' ')
    const childProcess = spawn(command, args, {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: process.platform === 'win32'
    })
    childProcess.on('close', resolve)
  })
}
