const path = require( 'path' )

const redis = require( 'redis' )

const NodeScaler = require( path.join( __dirname, '../', '../', 'src', 'NodeScaler' ) )

class NodeScalerProtocolRedis extends NodeScaler.Protocol
{
    constructor( options )
    {
        options = Object.assign(
            {
                clientOptions: {},
                client: null,
                error: err => {}
            },

            options || {}
        )

        super( options )

        this.clientOptions = options.clientOptions
        this.client = options.client
        this.onError = options.error
    }

    // start connection to redis server
    async start()
    {
        await super.start()

        return new Promise( ( resolve, reject ) =>
            {
                if ( this.client )
                {
                    // client already exists
                    return resolve()
                }

                this.client = redis.createClient( this.clientOptions )

                // forward redis client error messages
                this.client.on( 'error', err => this.emit( 'error', err ) )

                // ready handler
                this.client.once( 'ready', resolve )
            }
        )
    }

    // stop connection to redis server
    async stop()
    {
        return new Promise( ( resolve, reject ) =>
            {
                if ( !this.client )
                {
                    return reject( new Error( 'No connection to Redis' ) )
                }

                this.client.end( async () =>
                    {
                        await super.stop()

                        resolve()
                    }
                )
            }
        )
    }

    // sends data to all clients
    async broadcast( data )
    {

    }

    // sends data to a specific pool of client(s)
    async send( pool, data )
    {

    }

    // handler for incoming data
    async receive( data )
    {

    }

    // join a pool
    join( client, pool )
    {

    }

    // leave a pool
    leave( client, pool )
    {

    }
}

module.exports = NodeScalerProtocolRedis
