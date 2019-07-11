const path = require( 'path' )

const { EventEmitter } = require( 'events' )

class NodeScaler extends EventEmitter
{
    constructor( options )
    {
        super()

        options = Object.assign(
            {
                backend: null,
                frontend: null
            },

            options || {}
        )

        this.backend = options.backend
        this.frontend = options.frontend
    }

    async start()
    {
        return new Promise( async ( resolve, reject ) =>
            {
                if ( !this.backend )
                {
                    return reject( new Error( 'No backend instance' ) )
                }

                if ( !( this.backend instanceof NodeScaler.Protocol ) )
                {
                    return reject( new Error( 'Invalid NodeScaler.Protocol instance' ) )
                }

                await this.backend.start()

                resolve()
            }
        )
    }

    stop()
    {

    }

    // sends data to all clients
    async broadcast( data )
    {

    }

    // sends data to a specific client pool
    async send( pool, data )
    {

    }

    join( client, pool )
    {

    }

    leave( client, pool )
    {

    }
}

NodeScaler.Protocol = require( path.join( __dirname, 'NodeScaler.Protocol' ) )

module.exports = NodeScaler

// NodeScaler.Protocol = path.join( __dirname, 'NodeScaler.Protocol' )
// NodeScaler.Backend = path.join( __dirname, 'NodeScaler.Backend' )
