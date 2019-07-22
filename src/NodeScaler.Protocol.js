const path = require( 'path' )

const logger = require( path.join( __dirname, 'logger' ) )

const { EventEmitter } = require( 'events' )

const NodeScaler = require( path.join( __dirname, 'NodeScaler' ) )

class NodeScalerProtocol extends EventEmitter
{
    constructor( options )
    {
        super()

        this.owner = null
    }

    async start( nodeScaler )
    {
        this.owner = nodeScaler

        return new Promise( ( resolve, reject ) => process.nextTick( resolve ) )
    }

    async stop()
    {
        return new Promise( ( resolve, reject ) => process.nextTick( resolve ) )
    }

    // sends data to all clients
    async broadcast( data )
    {
        return new Promise( ( resolve, reject ) => process.nextTick( resolve ) )
    }

    // sends data to a specific pool of client(s)
    async send( pool, data )
    {
        return new Promise( ( resolve, reject ) => process.nextTick( resolve ) )
    }

    // handler for incoming data
    async receive( data )
    {
        return new Promise( ( resolve, reject ) => process.nextTick( resolve ) )
    }

    createClient( options )
    {
        return new NodeScaler.Client( options )
    }

    async join( client, pool )
    {
        return new Promise( ( resolve, reject ) => process.nextTick( resolve ) )
    }

    async leave( client, pool )
    {
        return new Promise( ( resolve, reject ) => process.nextTick( resolve ) )
    }
}

module.exports = NodeScalerProtocol
