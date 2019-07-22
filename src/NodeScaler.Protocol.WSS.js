const path = require( 'path' )

const logger = require( path.join( __dirname, 'logger' ) )

const NodeScaler = require( path.join( __dirname, 'NodeScaler' ) )

class NodeScalerProtocolWSS extends NodeScaler.Protocol
{
    constructor( options )
    {
        super()


    }

    async start()
    {
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

    async createClient()
    {
        return new Promise( ( resolve, reject ) => process.nextTick( resolve ) )
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

module.exports = NodeScalerProtocolWSS
