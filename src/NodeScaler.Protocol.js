const path = require( 'path' )

const logger = require( path.join( __dirname, 'logger' ) )

const { EventEmitter } = require( 'events' )

class NodeScalerProtocol extends EventEmitter
{
    constructor( options )
    {
        super()


    }

    async start()
    {
        return new Promise( ( resolve, reject ) =>
            {
                resolve()
            }
        )
    }

    async stop()
    {
        return new Promise( ( resolve, reject ) =>
            {
                resolve()
            }
        )
    }

    // sends data to all clients
    async broadcast( data )
    {
        return new Promise( ( resolve, reject ) =>
            {
                resolve()
            }
        )
    }

    // sends data to a specific pool of client(s)
    async send( pool, data )
    {
        return new Promise( ( resolve, reject ) =>
            {
                resolve()
            }
        )
    }

    // handler for incoming data
    async receive( data )
    {
        return new Promise( ( resolve, reject ) =>
            {
                resolve()
            }
        )
    }

    async join( client, pool )
    {
        return new Promise( ( resolve, reject ) =>
            {
                resolve()
            }
        )
    }

    async leave( client, pool )
    {
        return new Promise( ( resolve, reject ) =>
            {
                resolve()
            }
        )
    }
}

module.exports = NodeScalerProtocol
