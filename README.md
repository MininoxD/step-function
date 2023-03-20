<p align="center">
  Allows you to orchestrate functions as a series of steps in a workflow
  <br />
  <br />
</p>

# Usage example

```typescript
import { Machine } from "./Machine"
import { State } from "./State"

const goodbyeStep = State.create<string, void>({
    name: "Goodbye",
    resource: (name) => {
        console.log(`Goodbye ${name}`)
    }
})

const helloStep = State.create<string, string>({
    name: "Hello",
    resource: (name) => {
        console.log(`Hello ${name}`)
        return name
    },
    next: goodbyeStep.name
})

const machine = Machine.create({
    description: "Hello Machine",
    startAt: helloStep.name,
    states: [helloStep, goodbyeStep]
})

const response = machine.run('MininoxD')

response.then((result) => {
    console.log(result)
})

```