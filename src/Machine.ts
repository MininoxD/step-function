/*eslint  @typescript-eslint/no-explicit-any:"off" */ 

import { State } from "./State"

export class Machine {
    readonly description: string
    readonly startAt: string
    private readonly states: Array<State>

    constructor({
        description,
        startAt,
        states
    }:{
        description: string,
        startAt: string,
        states: Array<State>
    }) {
        this.description = description
        this.startAt = startAt
        this.states = states
    }

    async run(params?:any, name?:string):Promise<any> {
        const startState = name || this.startAt
        const state = this.states.find(state => state.name === startState)
        if (!state) throw new Error("Start state not found")
        return await this.runState(state.name,params)
    }

    async runState(name: string, params: any):Promise<any> {
        try {
            const state = this.states.find(state => state.name === name)
            if (!state) throw new Error("State not found")
            const result = await state.run(params)
            if (state.isEnd()) return { status: 200 , message: "Success"}
            const nextState = state.getNext()
            if (!nextState) throw new Error("Next state not found")
            return this.runState(nextState, result)
        } catch (error) {
            return {
              params,
              nameState: name,   
            }
        }
    }

    static create(
        {
            description,
            startAt,
            states
        }:{
            description: string,
            startAt: string,
            states: Array<State>
        }
    ): Machine {
        return new Machine({description,startAt,states})
    }
}