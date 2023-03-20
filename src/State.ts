/*eslint  @typescript-eslint/no-explicit-any:"off" */ 
export class State{
    readonly name: string
    readonly next?: string
    readonly end?: boolean
    private resource: (params: any) => any
    constructor({
        name,
        next,
        end,
        resource
    }:{
        name: string
        next?: string
        end?: boolean,
        resource: (params: any) => any
    }) {
        this.name = name
        this.next = next
        this.end = end
        this.resource = resource
    }

    run(params: any) {
        return this.resource(params)
    }
    isEnd() {
        return this.end || false
    }

    getNext() {
        return this.next || null
    }

    static create<T,E>({
        name,
        resource,
        next,
        end,
    }:{
        name: string,
        resource: (params: T) => E
        next?: string
        end?: boolean,
    }): State{
        return new State({ name, next, end, resource})
    }
}